'use strict';
window.notes = {};
notes.init = function() {
    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/gcse/notesjs.css';
    document.head.appendChild(stylesheet);

    document.body.onkeyup = function(event) {
        if (document.body.scrollWidth > window.innerWidth && !event.ctrlKey) {
            return;
        }
        
        var key = event.key || event.keyIdentifier;
        if (key in {'Left': 1, 'ArrowLeft': 1, 'h': 1}) {
            document.getElementById('prev').click();
        } else if (key in {'Right': 1, 'ArrowRight': 1, 'l': 1}) {
            document.getElementById('next').click();
        }
    };

    var sidebar = document.getElementsByTagName('nav')[0];
    sidebar.onkeyup = function(event) {
        var list = document.activeElement.nextElementSibling;
        if ((event.key || event.keyIdentifier) == 'Enter' && list &&
                list.tagName == 'OL' && list.className != 'current') {
            notes.toggleList(list);
        }
    };
    sidebar.onclick = function(event) {
        var list = event.target.nextElementSibling;
        if (list && list.tagName == 'OL' && list.className != 'current') {
            event.stopImmediatePropagation();
            notes.toggleList(list);
        }
    };

    if (history.pushState) {
        history.replaceState('', '');
        sessionStorage.setItem(location.pathname, JSON.stringify({
            main: document.getElementsByTagName('main')[0].innerHTML,
            titleNo: document.title.split(' ', 1)[0],
            prev: {href: document.getElementById('prev').pathname,
                  title: document.getElementById('title-prev').textContent      
            },
            next: {href: document.getElementById('next').pathname,
                  title: document.getElementById('title-next').textContent      
            }
        }));

        var AJAXCheck = location.pathname.split('/',3).join('/'),
            usingCORS = location.protocol == 'https:';  // Use github API
                                                        // instead of direct
        sidebar.addEventListener('click',
            document.getElementsByTagName('header')[0].onclick = function(event) {
                var pathname = event.target.pathname,
                    href = event.target.href;

                // if link isn't part of this subject, just go there
                if (pathname.lastIndexOf(AJAXCheck, 0) != 0) return;
                event.preventDefault(); // else open asynchronously

                if (!href || event.target.className == 'current') return;
                // unless the link is the current page or actually a listing

                history.pushState('', '', href);

                if (sessionStorage.getItem(pathname)) {
                    window.onpopstate();
                } else {
                    var request = new XMLHttpRequest();
                    request.open('GET', (usingCORS ?
                            '//api.github.com/repos/ianyfan/gcse/contents' +
                            pathname.slice(pathname.indexOf('/', 1)) : href) + 
                        'replacement.json' + (usingCORS ? '?ref=gh-pages' : ''));
                    request.onload = function() {
                        if (request.status >= 200 && request.status < 400) {
                            sessionStorage.setItem(pathname, usingCORS ?
                                decodeURIComponent(escape(atob(
                                    JSON.parse(request.response).content
                                ))) : request.response);
                            window.onpopstate();
                        } // else {}
                    };
                    // request.onerror = function() {};
                    request.send();
                }
            }
        );
    }

    var button = document.getElementsByTagName('button')[0];
    button.id = 'arrow';
    button.onclick = function() {
        this.id = this.id ? '' : 'arrow';
    };

    var homeButton = document.getElementById('home'),
        homeList = homeButton.nextElementSibling;
    homeButton.onmouseenter = homeList.onmouseenter = function() {
        homeList.style.height = homeList.scrollHeight + 'px';
    }

    homeButton.onmouseleave = homeList.onmouseleave = function() {
        homeList.style.height = '';
    }
};

if (document.readystate == 'loading') {
    document.addEventListener('DOMContentLoaded', notes.init);
} else {
    notes.init();
}

notes.toggleList = function(list) {
   if (list.className) { // either expanded or no class
        list.style.height = list.scrollHeight + 'px';
        list.className = '';
        list.scrollHeight; // force reflow
        list.style.height = '';
    } else {
        list.style.height = '0';
        list.className = 'expanded';
        list.style.height = list.scrollHeight + 'px';

        window.setTimeout(function() {
            list.style.height = '';
        }, 250);
    }
}

window.onpopstate = function() {
    window.scroll(0, 0);

    var state = JSON.parse(sessionStorage.getItem(location.pathname)),
        main = document.getElementsByTagName('main')[0];

    main.innerHTML = state.main;
 
    document.title = state.titleNo + ' ' +
        main.getElementsByTagName('h1')[0].textContent;

    function replace(which) {
        var el = document.getElementById('title-' + which);
        if (state[which]) {
            el.textContent = state[which].title;
            el.previousElementSibling.href = state[which].href;
        }
        else {
            el.textContent = '';
            el.previousElementSibling.removeAttribute('href');
        }
    }
    replace('prev');
    replace('next');

    for (var current = document.getElementsByClassName('current'),
            i = current.length; --i;) current[i].className = 'expanded';

    var link = document.querySelector('nav [href="' + location.pathname + '"]');
    if (!link) return;
    link.className = 'current';
    for (;(link = link.parentNode.parentNode).className != 'current';) {
        if (link.className != 'expanded') notes.toggleList(link);
        link.className = 'current';
    }
};
