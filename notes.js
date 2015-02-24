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
        if (key == 'Left' || key == 'ArrowLeft') {
            document.getElementById('prev').click();
        } else if (key == 'Right' || key == 'ArrowRight') {
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
            prev: document.getElementById('prev').pathname,
            next: document.getElementById('next').pathname
        }));

        var usingCORS = location.protocol == 'https:';  // Use github API
                                                        // instead of direct
        var openPage = function(event) {
            event.preventDefault(); // don't open link; open it asynchronously

            var pathname = event.target.pathname,
                href = event.target.href;
            if (!href || event.target.className == 'current') return;

            history.pushState('', '', href);

            if (sessionStorage.getItem(pathname)) {
                window.onpopstate();
            } else {
                var request = new XMLHttpRequest();
                request.open('GET', usingCORS ?
                    'http://api.github.com/repos/ianyfan/gcse/contents' +
                    pathname.slice(pathname.indexOf('/', 1)) : href + '.json');
                request.onload = function() {
                    if (request.status >= 200 && request.status < 400) {
                        sessionStorage.setItem(pathname, usingCORS ?
                            atob(JSON.parse(request.response).content) :
                            request.response);
                        window.onpopstate();
                    } // else {}
                };
                // request.onerror = function() {};
                request.send();
            }
        };

        sidebar.addEventListener('click', openPage);
        document.getElementsByTagName('header')[0].onclick = openPage;
    }

    var button = document.getElementsByTagName('button')[0];
    button.id = 'arrow';
    button.onclick = function() {
        this.id = this.id ? '' : 'arrow';
    };
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
        var els = document.getElementsByClassName('title-' + which);
        els[0].textContent = els[1].textContent;
        if (state[which]) els[0].previousElementSibling.href = state[which];
        else els[0].previousElementSibling.removeAttribute('href');
    }
    replace('prev');
    replace('next');

    for (var current = document.getElementsByClassName('current'),
            i = current.length; --i;) current[i].className = 'expanded';

    var link = document.querySelector('[href="' + location.pathname + '"]');
    link.className = 'current';
    for (;(link = link.parentNode.parentNode).className != 'current';) {
        if (link.className != 'expanded') notes.toggleList(link);
        link.className = 'current';
    }
};
