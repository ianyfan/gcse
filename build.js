'use strict';

var DEBUG = process.argv.indexOf('-d') != -1;

var fs = require('fs');

function removeDirSync(dir) {
    var files = fs.readdirSync(dir);
    for (var i = 0; i < files.length; i++) {
        var file = dir + '/' + files[i];
        if (fs.statSync(file).isFile()) fs.unlinkSync(file);
        else removeDirSync(file);
    }
    fs.rmdirSync(dir);
}

function registerError(name, message) {
    function customError(arg) {
        removeDirSync('.gcse');
        this.name = name;
        this.message = message + arg;
    }
    customError.prototype = Object.create(Error.prototype);
    customError.prototype.contructor = customError;

    global[name] = customError;
};
registerError('ReadDirError', 'Failed to read files in ');
registerError('ReadFileError', 'Failed to read file at ');
registerError('MakeDirError', 'Failed to make dir at ');
registerError('MakeFileError', 'Failed to make file at ');
registerError('WriteFileError', 'Failed to write to file at ');

var markdownConverter = (function() {
    var converter = new (require('pagedown').Converter)();
    require('pagedown-extra').Extra.init(converter,
        {extension: ['tables', 'smart_strong']});

    converter.hooks.chain('preConversion', function(text) { // fractions
        // format: {:{numerator}: (/ if frac line, else |) :{denominator}:}
        // Colons determine alignment like tables

        var alignClasses = ['', ' text-align-left', ' text-align-right',
            ' text-align-center'];

        var last = text.length;
        while (last && (last = text.lastIndexOf('{', --last)) != -1) {
            text = text.slice(0, last) + text.slice(last).replace(
                /{(({.*?}\s*\|?\s*)*)}/, function(_, layers) {
                    var align = ['', ' text-align-left', ' text-align-right',
                        ' text-align-center'];
                    return '<span class="layered-text">' + layers.replace(
                        /{(:?)\s+(.*?)\s+(:?)}\s*(\|?)\s*/g,
                        function(_, alignLeft, layerText, alignRight, line) {
                            return '<span class="layer' + alignClasses[
                                    (alignLeft === ':') + 2*(alignRight === ':')
                                ] + (line ? ' layer-line' : '') + '">' +
                                layerText + '</span>';
                        }
                    ) + '</span>';
                }
            );
        }
        return text;
    });

    converter.hooks.chain('preConversion', function(text) { // equations
        return text.replace(/\[\[(.*?)]]/g, '<i class="equation">$1</i>');
    });

    converter.hooks.chain('preConversion', function(text) { // sups & subs
        // Pretty much duplicated from strikethrough
        // which in turn duplicated from bold & italics
        text = text.replace(/([^\[\\]|^)\^\^(?=\S)([^\r]*?\S[\*_]*)\^\^/g,
                            '$1<sup>$2</sup>');
        return text.replace(/([^\[\\]|^)\^(?=\S)([^\r]*?\S[\*_]*)\^/g,
                            '$1<sub>$2</sub>');
    });

    converter.hooks.chain('preConversion', function(text) { // negated text
        return text.replace(/([^\[\\]|^)¬(?=\S)([^\r]*?\S[\*_]*)¬/g,
                            '$1<span class="negated">$2</sub>');
    });

    converter.hooks.chain('postConversion', function(text) { // table cell spans
        // remove empty cells
        text = text.replace(/<t(d|h)(.*?)>{merged}<\/t\1>/g, '');

        return text.replace(/>{(.*?)}/g, ' $1>');
    });

    return converter;
})();

/* read contents folder
 * create subjects nav
 * create every subject
 */
fs.readdir('content', function(err, files) {
    if (err) throw new ReadDirError('content');
    else if (DEBUG) console.log('Read list of subjects');

    global.subjects = {};
    global.subjectsToDo = 0;
    global.homeNav = ''
    for (var i = 0; i < files.length; i++) {
        if (files[i][0] != '_') {
            var subject = files[i];
            homeNav += '        <li><a href="/gcse/' + subject + '/">' +
                subject[0].toUpperCase() + subject.slice(1) + '</a></li>\n';
            createSubject(subject);
        }
    }

    fs.mkdir('.gcse', function(err) {
        if (err) {
            if (err.code != 'EEXIST') throw new MakeDirError('.gcse');

            fs.readdir('.gcse', function(err, files) {
                if (err) throw new ReadDirError('.gcse');

                for (var i = 0; i < files.length; i++) {
                    var file = '.gcse' + '/' + files[i];

                    if (fs.statSync(file).isFile()) fs.unlinkSync(file);
                    else removeDirSync(file);
                }
            });
        }
    });
});

function createSubject(subject) {
    var sections = [],
        subjectObj = {sections: sections, pages: 0, path: '.gcse/' + subject},
        subjectDir = 'content/' + subject;
    subjects[subject] = subjectObj;

    var readPending = 0;
    fs.readdir(subjectDir, function(err, files) {
        if (err) throw new ReadDirError(subjectDir);
        else if (DEBUG) console.log('Read dir: ' + subjectDir);

        (function readListing(dir, files, dest) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                if (file.indexOf('.md', file.length - 3) != -1) {
                    subjectObj.pages++;
                    var title = processFileName(file.slice(0, -3));
                    dest[title[0]] = new Page(title[1], dir + '/' + file);
                } else {
                    testDir(dir + '/' + file);
                }
            }

            function testDir(dir) {
                readPending++;
                fs.readdir(dir, function(err, files) {
                    if (err) {
                        if (err.code !== 'ENOTDIR') throw new ReadDirError(dir);
                    } else {
                        if (DEBUG) console.log('Read dir: ' + dir);

                        var title = processFileName(
                                        dir.slice(dir.lastIndexOf('/') + 1));
                        dest[title[0]] = new Listing(title[1], subject);

                        readListing(dir, files, dest[title[0]].sections);
                    }

                    if (--readPending === 0) makeNav();
                });
            };
        })(subjectDir, files, sections);
    });

    function makeNav() {
        var nav = '';
        for (var prev, i = 1; i < sections.length; i++) {
            if (!sections[i]) {
                nav += '        <li><a class="nolist"></a></li>\n';
            } else {
                sections[i].prev = prev;
                if (prev) prev.next = sections[i];
                prev = sections[i];

                nav += sections[i].makeNav([i], nav.length);
            }
        }
        subjectObj.nav = nav;

        if (DEBUG) console.log(subject + ': made nav');

        write();
    }

    function write() {
        var landingPage = subjectObj.sections[0];
        landingPage.titleNo = '';
        landingPage.href = '/gcse/' + subject + '/';

        subjectObj.json = {};
        Listing.prototype.write.call(subjectObj);
    }
}

function Page(title, path) {
    this.title = title;
    this.path = path;
    this.subject = this.path.split('/', 2)[1];
}
Page.prototype.makeNav = function(indexes, pos) {
    this.titleNo = indexes.join('.');
    this.href = '/gcse/' + this.subject + '/' + indexes.join('/') + '/';
    this.navMarker = pos + 12 + 4*indexes.length;

    var nav = '      ';
    for (var i = 0; i < indexes.length; i++) nav += '    ';

    return nav + '<li><a href="' + this.href + '">' + this.title + '</a></li>\n';
};
Page.prototype.write = function() {
    fs.readFile(this.path, 'utf8', (function(err, data) {
        if (err) throw new ReadFileError(file);
        else if (DEBUG) console.log('Read file: ' + this.path);

        var markdownHTML = markdownConverter.makeHtml(data).split('\n'),
            prettyHTML = '',
            indent = '        ',
            unindentLiQueue = [];

        for (var lineNo = 0; lineNo < markdownHTML.length; lineNo++) {
            var line = markdownHTML[lineNo].split('<');
            for (var i = 1; i < line.length; i++) {
                var afterCloseTag = line[i].indexOf('>') + 1;
                var tag = '<' + line[i].slice(0, afterCloseTag);
                switch (tag.slice(1, -1).split(' ', 1)[0]) {
                    case 'li':
                        for (var nextTag = i; nextTag < line.length &&
                                line[nextTag].lastIndexOf('/li', 0) === -1;
                                nextTag++) {}
                        if (afterCloseTag < line[i].length &&
                                line[i][afterCloseTag] !== '<' &&
                                line[nextTag - 1].slice(-1) !== '>') {
                            prettyHTML += indent + tag;
                            unindentLiQueue[0]++;
                            break;
                        }
                        unindentLiQueue.unshift(0);
                    case 'table':
                    case 'thead':
                    case 'tr':
                    case 'ol':
                        prettyHTML += (prettyHTML.slice(-1) === '\n' ? '' :
                            '\n') + indent + tag + '\n';
                        indent += '  ';
                        break;
                    case '/table':
                    case '/thead':
                    case '/tr':
                    case '/ol':
                        prettyHTML += indent = indent.slice(2);
                    case '/th':
                    case '/td':
                        prettyHTML += tag + '\n';
                        break;
                    case '/li':
                        if (unindentLiQueue[0]-- === 0) {
                            unindentLiQueue.shift();
                            prettyHTML += (prettyHTML.slice(-1) === '\n' ? '' :
                                '\n') + (indent = indent.slice(2));
                        }
                        prettyHTML += tag + '\n';
                        break;
                    default: prettyHTML += (prettyHTML.slice(-1) === '\n' ?
                        indent : '') + tag;
                }
                prettyHTML += line[i].slice(afterCloseTag);
            }
        }

        if (!this.next) {
            var node = this.parent;
            while (node && !node.next) node = node.parent;
            if (node) {
                node = node.next;
                while (node.sections) node = node.sections[1];
                this.next = node;
                node.prev = this;
            }
        }

        var subjectObj = subjects[this.subject],
            outDir = '.' + this.href.slice(1),
            outPath = outDir + 'index.html';

        fs.mkdir(outDir, (function(err) {
            if (err && err.code !== 'EEXIST') throw new MakeDirError(outDir);
            else if (DEBUG) console.log('Made dir: ' + outDir);

            var nav = subjectObj.nav,
                path = [];
            if (this.titleNo) {
                for (var node = this; node; node = node.parent) {
                    nav = nav.slice(0, node.navMarker) + ' class="current"' +
                        nav.slice(node.navMarker);
                    path.unshift(node.title);
                }
            }

            fs.writeFile(outPath,
'<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'  <head>\n' +
'    <meta charset="utf-8">\n' +
'    <title>' + this.titleNo + ' ' + this.title + ' :: GCSE notes</title>\n' +
'    <script src="/gcse/notes.js" async></script>\n' +
'    <link rel="stylesheet" href="/gcse/' + this.subject + '.css">\n' +
'    <noscript>\n' +
'      <link rel="stylesheet" href="/gcse/notesnojs.css">\n' +
'    </noscript>\n' +
'  </head>\n' +
'  <body>\n' +
'    <button></button>\n' +
'    <header>\n' +
'      <h1>' + this.title + '</h1>\n' +
'      <a id="home" class="fab"></a>\n' +
'      <ul>\n' +
         homeNav +
'      </ul>\n' +
'      <div id="header-nav">\n' +
'        <a id="prev" class="fab" href' +
           (this.prev ? '="' + this.prev.href + '"' : '') + '></a>\n' +
'        <h2 id="title-prev">' +
           (this.prev ? this.prev.titleNo + ' ' + this.prev.title : '') +
        '</h2>\n' +
'        <a id="next" class="fab" href' +
           (this.next ? '="' + this.next.href + '"' : '') + '></a>\n' +
'        <h2 id="title-next">' +
           (this.next ? this.next.titleNo + ' ' + this.next.title : '') +
        '</h2>\n' +
'      </div>\n' +
'    </header>\n' +
'    <nav>\n' +
'      <ol class="current">\n' +
         nav +
'      </ol>\n' +
'    </nav>\n' +
'    <article>\n' +
'      <div id="title-wrapper">\n' +
'        <h1>' + this.title + '</h1>\n' +
'        <aside>' + path.join(' > ') + '</aside>\n' +
'      </div>\n' +
       prettyHTML +
'    </article>\n' +
'    <footer>\n' +
'      <p>View the source on ' +
        '<a href="//github.com/ianyfan/gcse" target="_blank">Github</a>' +
      '</p>\n' +
'      <p>Please send questions and suggestions to '+
        '<a href="mailto:ianfan0+notes@gmail.com">ianfan0@gmail.com</a>' +
      '</p>\n' +
'    </footer>\n' +
'  </body>\n' +
'</html>'
          , function(err) {
                if (err) throw new WriteFileError(outPath);
                else if (DEBUG) console.log('Wrote file: ' + outPath);
            });

            subjectObj.json[this.href] = prettyHTML;

            if (--subjectObj.pages === 0) {
                outPath = '.gcse/' + this.subject + '/cachesubject.js';
                fs.writeFile(outPath, '(function(){json=' +
                        JSON.stringify(subjectObj.json) + ';for(href in json)' +
                        'sessionStorage.setItem(href,json[href])})();',
                    function(err) {
                        if (err) throw new WriteFileError(outPath);
                        else if (DEBUG) console.log('Wrote file: ' + outPath);

                        var finished;
                        for (var prop in subjects) finished = subjects[prop];
                        if (finished) finish();
                    }
                );
            }
        }).bind(this));
    }).bind(this));
};

function Listing(title, subject) {
    this.title = title;
    this.subject = subject;
    this.sections = [];
}
Listing.prototype.makeNav = function(indexes, pos) {
    this.path = '.gcse/' + this.subject + '/' + indexes.join('/');
    var indent = '      ';
    for (var i = 0; i < indexes.length; i++) indent += '    ';

    var nav = indent + '<li>\n' + indent + '  <a tabindex="">' + this.title +
              '</a>\n' + indent + '  <ol';

    this.navMarker = pos + nav.length;
    nav += '>\n';

    for (var prev, i = 1; i < this.sections.length; i++) {
        if (!this.sections[i]) {
            nav += indent + '    <li><a class="nolist"></a></li>\n';
        } else {
            this.sections[i].parent = this;
            this.sections[i].prev = prev;
            if (prev) prev.next = this.sections[i];
            prev = this.sections[i];

            nav += this.sections[i].makeNav(indexes.concat(i), pos + nav.length);
        }
    }

    return nav + indent + '  </ol>\n' + indent + '</li>\n';
}
Listing.prototype.write = function() {
    fs.mkdir(this.path, (function(err) {
        if (err) throw new MakeDirError(this.path);
        else if (DEBUG) console.log('Made dir: ' + this.path);

        for (var i in this.sections) this.sections[i].write();
    }).bind(this));
}

function processFileName(filename) {
    var splitname = filename.split('_'),
        title = splitname.slice(1).join(' ');

    return [splitname[0], title.replace(/~[A-Z]*/g, function(match) {
        var replacement = processFileName.replacements[match];
        return replacement === undefined ? match : replacement;
    })];
};
processFileName.replacements = {'~COMMA': ',',
    '~COLON': ':',
    '~FSLASH': '/',
    '~BSLASH': '\\'
};

function finish() {
    if (finish.called) return;
    else finish.called = true;

    for (var subject in subjects) {
        (function(path) {
            fs.rename('.' + path, path, function(err) {
                if (err) {
                    if (err.code !== 'EPERM') throw new MakeDirError(path);

                    removeDirSync(path);

                    fs.rename('.' + path, path, function(err) {
                        if (err) throw new MakeDirError(path);

                        checkAllMoved();
                    });
                }

                function checkAllMoved() {
                    fs.readdir('.gcse', function(err, files) {
                        if (files && files.length === 0) {
                            fs.rmdir('.gcse', function(){});
                        }
                    });
                }

                checkAllMoved();
            });
        })('gcse/' + subject);
    }
}
