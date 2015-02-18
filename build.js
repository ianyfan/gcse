//var AsyncProfile = require('async-profile');
//AsyncProfile.profile(function() {

'use strict';

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

    var string = 'string', spaces = '    ',
        str1 = '<li><a href="', str2 = '">', str3 = '</a></li>\n',
        arr1 = '<li>\n', arr2 = '  <a tabindex="0">', arr3 = '</a>\n',
        arr4 = '  <ol', arr5 = '>\n', arr6 = '  </ol>\n', arr7 = '</li>\n';

    function createList(subTitles, href, indent) {
        if (subTitles instanceof String) {
            subTitles.marker = nav.length + indent.length + 6;
            subTitles.href = href;
            nav += indent + str1 + href + str2 + subTitles + str3;
        } else {
            var subString = indent + arr1 + indent + arr2 +
                                    subTitles[0] + arr3 + indent + arr4;
            subTitles.marker = nav.length + subString.length;
            nav += subString + arr5;

            var ind = indent + spaces;
            for (var i = 1; i < subTitles.length; i++) {
                subTitles[i].parent = subTitles;
                if (i > 1) {
                    subTitles[i].previous = subTitles[i-1];
                    subTitles[i-1].next = subTitles[i];
                } else {
                    subTitles[i].previous = null;
                }
                createList(subTitles[i], href + '/' + i, ind);
            }
            nav += indent + arr6 + indent + arr7;
        }
    }
    
    var nav = '', 
        hrefInit = '/gcse/' + outDir + '/',
        indentInit = '        ';
    for (var i = 1; i < titles.length; i++) {
        titles[i].previous = titles[i-1];
        if (i > 1) titles[i-1].next = titles[i];
        createList(titles[i], hrefInit + i, indentInit);
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

    function replaceFracs(text) {
        // format: {:{numerator}: (/ if frac line, else \) :{denominator}:}
        // : determine alignment like tables

        var last = text.length;
        while (last && (last = text.lastIndexOf('{', --last)) != -1) {
            text = text.slice(0, last) + text.slice(last).replace(
                                    replaceFracs.regex, replaceFracs.replacer);
        }
        return text;
    }
    replaceFracs.regex = /{(:?){(.*)}(:?)\s*(\/|\\)\s*(:?){(.*)}(:?)}/;
    replaceFracs.strings = ['<span class="fraction"><span class="numerator', 
        ' frac-line', '">', '</span><span class="denominator', '">',
        '</span></span>'];
    replaceFracs.align = ['', ' text-align-left', ' text-align-right',
        ' text-align-center'];
    replaceFracs.replacer = function(_, nLeft, numer, nRight, fracLine, dLeft,
            denom, dRight) {
        return replaceFracs.strings[0] +
            (fracLine === '/' ? replaceFracs.strings[1] : '') +
            replaceFracs.align[(nLeft === ':') + ((nRight === ':') << 1)] +
            replaceFracs.strings[2] + numer + replaceFracs.strings[3] +
            replaceFracs.align[(dLeft === ':') + ((dRight === ':') << 1)] +
            replaceFracs.strings[4] + denom + replaceFracs.strings[5];
    };
    converter.hooks.chain('preConversion', replaceFracs);

    var utf8 = 'utf-8',
        index = '/index.html',
        current = ' class="current"',
        href = ' href="'; 

    (function writeTree(subTitles, inPath, outPath) {
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
                        outPath + '/' + i);
                }
                return;
            }

            var canWrite = false,
                inFile = inPath + '/' + subTitles;

            fs.readFile(inFile, utf8,
                function processPage(err, data) {
                    if (err) {
                        console.log('ERROR: could not read file at ' + inFile +
                            '; trying again...');
                        fs.readFile(inPath);
                        return;
                    }
                    
                    (function writePage() {
                        if (!canWrite) return writePage();

                        var outPage = outPath + index,
                            html = write.strings[0] + subTitles +
                                write.strings[1] +
                                (prev ? href + prev.href + '"' : '') +
                                write.strings[2] + prev + write.strings[3] +
                                write.homeList + write.strings[4] +
                                (next ? href + next.href + '"': '') +
                                write.strings[5] + next + write.strings[6] +
                                nav + write.strings[7] + subTitles +
                                write.strings[8] + prev + write.strings[9] +
                                next + write.strings[10] +
                                converter.makeHtml(data) + write.strings[11];

                        fs.writeFile(outPage, html, function onpagewrite(err) {
                                if (err) {
                                    console.log('ERROR: could not write to ' +
                                                outPage + '; trying again...');
                                    fs.writeFile(outPage, data, onpagewrite);
                                    return;
                                }

                                console.log('Created page at ' + outPage);
                            });
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
                nav = nav.slice(0, marker.marker) + current +
                    nav.slice(marker.marker);
            }
            canWrite = true;
        });
    })(titles, inDir, outDir);


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
write.strings = ['<!DOCTYPE html>\n<html lang="en">\n  <head>\n    ' + 
        '<meta charset="utf-8">\n    <title>',
    '</title>\n\n    <script src="/gcse/notes.min.js" async></script>\n    ' +
        '<link rel="stylesheet" href="/gcse/' + outDir + '/notes.css">\n    ' +
        '<noscript>\n      <link rel="stylesheet" href="/gcse/notesnojs.css">' +
        '\n    </noscript>\n  </head>\n  <body>\n    <header>\n      ' +
        '<a class="header-nav prev"',
    '></a>\n      <h2 class="title-prev">',
    '</h2>\n      <a class="header-nav home" href="/gcse"></a>\n      <ul>\n',
    '      </ul><a class="header-nav next"',
    '></a>\n      <h2 class="title-next">',
    '</h2>\n    </header>\n    <button></button>\n    <nav>\n      ' +
        '<ol class="current">\n',
    '      </ol>\n    </nav>\n    <main>\n      <h1>',
    '</h1>\n      <h2 class="title-prev">',
    '</h2>\n      <h2 class="title-next">',
    '</h2>\n      <article>',
    '\n      </article>\n    </main>\n    <footer>' +
        '\n      <p>View the source on ' +
        '<a href="//github.com/ianyfan/gcse" target="_blank">Github</a></p>' +
        '\n      <p>Please send questions and suggestions to '+
        '<a href="mailto:ianfan0@gmail.com">ianfan0@gmail.com</a></p>' +
        '\n    </footer>\n  </body>\n</html>'
];

fs.readdir('content', function createHomeList(err, files) {
    if (err) return fs.readdir('subjects', createHomeList);

    var homeList = '',
        str1 = '        <li><h3><a href="/gcse/', str2 = '">',
        str3 = '</a></h3></li>\n';
    for (var i = 0; i < files.length; i++) {
        var subject = files[i];
        homeList += str1 + subject + str2 + subject[0].toUpperCase() +
            subject.slice(1) + str3;
    }

    write.homeList = homeList;
});

//});
