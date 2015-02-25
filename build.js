//var AsyncProfile = require('async-profile');
//AsyncProfile.profile(function() {

'use strict';

String.prototype.repeat = function(count) {
    if (count < 1) return '';
    var result = '', pattern = this.valueOf();
    while (count > 1) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result + pattern;
}; // //stackoverflow.com/a/5450113

var fs = require('fs'),
    inDir = 'content/' + process.argv[2],
    outDir = process.argv[2],
    titles = [],
    pending = 1;
fs.readdir(inDir, function createTree(err, files) {
    if (err) {
        console.log('ERROR: Could not read files in ' + inDir + 
            '; trying again...');
        fs.readdir(inDir, createTree);
        return;
    }

    for (var i = 1; i <= files.length; i++) {
        createBranch(inDir + '/' + i, titles, i);
    }

    function createBranch(dir, subTitles, index) {
        pending++;
        fs.readdir(dir, function processBranch(err, files) {
            if (err) {
                console.log('ERROR: Could not read files in ' + dir + 
                    '; trying again...');
                fs.readdir(dir, processBranch);
                return;
            }

            files.sort();
            if (files[1] && files[1][files[1].length - 1] === '~') files.pop();

            if (files.length == 1) {
                subTitles[index] = new String(files[0]); // so can add properties
            } else {
                subTitles[index] = new Array(files[files.length-1]);
                for (var i = 1; i < files.length; i++) {
                    createBranch(dir + '/' + i, subTitles[index], i);
                }
            }

            if (!--pending) createNav();
        });i
    }

    pending--;
});

function createNav() {
    console.log('Read files in ' + inDir);
    if (!write && !write.buffers) return createNav();

    function createList(subTitles, href, indent) {
        if (subTitles instanceof String) {
            subTitles.marker = nav.length + indent.length + 6;
            subTitles.href = href;
            nav += indent + '<li><a href="' + href + '">' + subTitles +
                '</a></li>\n';
        } else {
            var subString = indent + '<li>\n' + indent + '  <a tabindex="">' +
                subTitles[0] + '</a>\n' + indent + '  <ol';
            subTitles.marker = nav.length + subString.length;
            nav += subString + '>\n';

            for (var i = 1; i < subTitles.length; i++) {
                subTitles[i].parent = subTitles;
                if (i > 1) {
                    subTitles[i].previous = subTitles[i-1];
                    subTitles[i-1].next = subTitles[i];
                } else {
                    subTitles[i].previous = null;
                }
                createList(subTitles[i], href + i + '/', indent + '    ');
            }
            nav += indent + '  </ol>\n' + indent + '</li>\n';
        }
    }
    
    var nav = '', 
        hrefInit = '/gcse/' + outDir + '/',
        indentInit = '        ';
    for (var i = 1; i < titles.length; i++) {
        titles[i].previous = titles[i-1];
        if (i > 1) titles[i-1].next = titles[i];
        createList(titles[i], hrefInit + i + '/', indentInit);
    }

    write.nav = nav;

    console.log('Nav created');

    write();
}

function write() {
    if (!write.homeList) return write();

    var converter = new (require('pagedown').Converter)();
    require('pagedown-extra').Extra.init(converter,
        {extension: ['tables', 'smart_strong']});

    converter.hooks.chain('preConversion', function(text) { // sups & subs
        /* regex: /
            (?:         // Either: (but don't return)
                ^       // start of text
                |       // or
                [^\\]   // last character isn't a \ escape
            )
            (!?)        // preceding ! denotes subscript instead of superscript
            (\^+)       // return how many levels deep it goes
            (?:         // don't return full match
                {(.+?)} // match at least one character in braces
                |       // or
                (.+?)\b // match to word boundary
            )           // (non-greedy)
         */

        var last = text.length;
        while (last && (last = text.lastIndexOf('^', --last)) != -1) {
            while (last && text[--last] in {'^': 1, '!': 1}) {}
            text = text.slice(0, last) + text.slice(last).replace(
                /(^|[^\\])(!?)(\^+)(?:{(.+?)}|(.+?)\b)/,
                function(_, prev, isSub, levels, matchBrackets, matchWord) {
                    return prev + 
                        (isSub ? '<sub>' : '<sup>').repeat(levels.length) +
                        (matchBrackets || matchWord) +
                        (isSub ? '</sub>' : '</sup>').repeat(levels.length);
                }
            );
        }
        return text;
    });

    converter.hooks.chain('preConversion', function(text) { // fractions
        // format: {:{numerator}: (/ if frac line, else |) :{denominator}:}
        // Colons determine alignment like tables

        var last = text.length;
        while (last && (last = text.lastIndexOf('{', --last)) != -1) {
            text = text.slice(0, last) + text.slice(last).replace(
                /{(:?){(.*?)}(:?)\s*(\/|\|)\s*(:?){(.*?)}(:?)}/, function(_,
                        numerL, numer, numerR, line, denomL, denom, denomR) {
                    align = ['', ' text-align-left', ' text-align-right',
                        ' text-align-center'];
                    return '<span class="fraction"><sup class="numerator' +
                        align[(numerL === ':') + ((numerR === ':') << 1)] +
                        '">' + numer + '</sup><sub class="denominator' +
                        (line === '/' ? ' frac-line' : '') +
                        align[(denomL === ':') + ((denomR === ':') << 1)] +
                        '">' + denom + '</sub></span>';
                }
            );
        }
        return text;
    });

    converter.hooks.chain('preConversion', function(text) { // equations
        return text.replace(/\[\[(.*?)]]/g, function(_, match) {
            return '<i class="equation">' + match + '</i>';
        });
    });

    converter.hooks.chain('postConversion', function(text) { // table cell spans
        text = text.replace(/<td(.*?)>{merged}<\/td>/g, ''); // remove empty cells
        return text.replace(/>{(.*?)}/g, function(_, match) {
            return ' ' + match + '>';
        });
    });

    (function writeTree(subTitles, inPath, outPath, titleNo) {
        fs.mkdir(outPath, function writeBranch(err) {
            if (err) {
                console.log('ERROR: could not create directory at ' + outPath +
                    '; trying again...');
                fs.mkdir(outPath, writeBranch);
                return;
            }

            if (subTitles instanceof Array) {
                for (var i = 1; i < subTitles.length; i++) {
                    writeTree(subTitles[i], inPath + '/' + i,
                        outPath + '/' + i, (titleNo ? titleNo + '.' : '') + i);
                }
                return;
            }

            var canWrite = false,
                inFile = inPath + '/' + subTitles;

            fs.readFile(inFile, 'utf8',
                function processPage(err, data) {
                    if (err) {
                        console.log('ERROR: could not read file at ' + inFile +
                            '; trying again...');
                        fs.readFile(inPath);
                        return;
                    }
                    
                    (function writePage() {
                        if (!canWrite) return writePage();

                        var main = 
'      <h1>' + subTitles + '</h1>\n' +
'      <h2 class="title-prev">' + prev +'</h2>\n' +
'      <h2 class="title-next">' + next + '</h2>\n' +
'      <article>' +
         converter.makeHtml(data) + '\n' +
'      </article>\n',
                            outJson = outPath + '/replacement.json',
                            json = {main: main, titleNo: titleNo};
                        if (prev) json.prev = prev.href;
                        if (next) json.next = next.href;
                        json = JSON.stringify(json);

                        fs.writeFile(outJson, json, function onjsonwrite(err) {
                                if (err) {
                                    console.log('ERROR: could not write to ' +
                                        outJson + '; trying again...');
                                    fs.writeFile(outJson, json, onjsonwrite);
                                    return;
                                }

                                console.log('Created json at ' + outJson);
                            }
                        );

                        var outPage = outPath + '/index.html',
                            html =
'<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'  <head>\n' +
'    <meta charset="utf-8">\n' +
'    <title>' + titleNo + ' ' + subTitles + '</title>\n' +
'    <script src="/gcse/notes.min.js" async></script>\n' +
'    <link rel="stylesheet" href="/gcse/' + outDir + '/notes.css">\n' +
'    <noscript>\n' +
'      <link rel="stylesheet" href="/gcse/notesnojs.css">\n' +
'    </noscript>\n' +
'  </head>\n' +
'  <body>\n' +
'    <header>\n' +
'      <a id="prev"'+(prev?' href="'+prev.href+'"':'')+'></a>\n' +
'      <h2 class="title-prev">' + prev + '</h2>\n' +
'      <a id="home" href="/gcse"></a>\n' +
'      <ul>\n' +
         write.homeList +
'      </ul>\n' +
'      <a id="next"'+(next?' href="'+next.href+'"':'')+'></a>\n' +
'      <h2 class="title-next">' + next + '</h2>\n' +
'    </header>\n' +
'    <button></button>\n' +
'    <nav>\n' +
'      <ol class="current">\n' +
         nav +
'      </ol>\n' +
'    </nav>\n' +
'    <main>\n' +
       main +
'    </main>\n' +
'    <footer>\n' +
'      <p>View the source on ' +
        '<a href="//github.com/ianyfan/gcse" target="_blank">Github</a>' +
      '</p>\n' +
'      <p>Please send questions and suggestions to '+
        '<a href="mailto:ianfan0+notes@gmail.com">ianfan0@gmail.com</a>' +
      '</p>\n' +
'    </footer>\n' +
'  </body>\n' +
'</html>';

                        fs.writeFile(outPage, html, function onpagewrite(err) {
                                if (err) {
                                    console.log('ERROR: could not write to ' +
                                        outPage + '; trying again...');
                                    fs.writeFile(outPage, html, onpagewrite);
                                    return;
                                }

                                console.log('Created page at ' + outPage);
                            }
                        );
                    })();
            });
            
            var prev = subTitles;
            while (!prev.previous && (prev = prev.parent)) {}
            if (prev) {
                prev = prev.previous;
                while (prev instanceof Array) {
                    prev = prev[prev.length - 1];
                }
            } else {
                prev = '';
            }

            var next = subTitles;
            while (!next.next && (next = next.parent)) {}
            if (next) {
                next = next.next;
                while (next instanceof Array) next = next[1];
            } else {
                next = '';
            }
            

            for (var nav = write.nav, marker = subTitles; marker;
                    marker = marker.parent) {
                nav = nav.slice(0, marker.marker) + ' class="current"' +
                    nav.slice(marker.marker);
            }
            canWrite = true;
        });
    })(titles, inDir, outDir, '');


    require('node-sass').render({file: 'themes/' + outDir + '.scss',
        success: function(data) {
            var outPage = outDir + '/notes.css';
            fs.writeFile(outPage, data.css, function oncsswrite(err) {
                if (err) {
                    console.log('Unable to write CSS file; trying again...');
                    fs.writePage(outPage, data.css, oncsswrite);
                    return;
                }

                console.log('CSS written to ' + outPage);
            });
        }, error: function() {
            console.log('ERROR: could not render CSS');
        }
     });
}

fs.readdir('content', function createHomeList(err, files) {
    if (err) return fs.readdir('subjects', createHomeList);

    var homeList = '';
    for (var i = 0; i < files.length; i++) {
        var subject = files[i];
        homeList += '        <li><h3><a href="/gcse/' + subject + '">' +
            subject[0].toUpperCase() + subject.slice(1) + '</a></h3></li>\n';
    }

    write.homeList = homeList;
});

//});
