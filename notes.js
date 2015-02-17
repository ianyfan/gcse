'use strict';
window.notes = {};

notes.ondomcontentload = function() {
    notes.ondomcontentload = null; // delete function (not needed any more)

    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/gcse/notesjs.css';
    document.head.appendChild(stylesheet);

    var sidebar = document.getElementsByTagName('nav')[0];
    sidebar.addEventListener('click', function(event) { // also add to ENTER?
        event.preventDefault();
        event.stopPropagation();

        var list = event.target.nextElementSibling;
        if (list && list.tagName === 'OL' && list.className !== 'current') {
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
    }, true);

    if (history.pushState) {
        var cachePage = function(dom) {
            sessionStorage.setItem(window.location.pathname, JSON.stringify({
                main: dom.getElementsByTagName('main')[0].innerHTML,
                prev: dom.getElementsByClassName('prev')[0].href,
                next: dom.getElementsByClassName('next')[0].href
            }));
        };

        history.replaceState('', '');
        cachePage(document);

        var openPage = function(event) {
            event.preventDefault();
            event.stopPropagation();

            var link = event.target,
                url = link.href;
            if (!url || link.className === 'current') return;

            history.pushState('', '', url);

            if (sessionStorage.getItem(link.pathname)) {
                window.onpopstate();
                return;
            }

            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var newDoc = document.implementation.createHTMLDocument();
                    newDoc.documentElement.innerHTML = request.responseText;
                    cachePage(newDoc);
                    window.onpopstate();
                } else {}
            };
            request.onerror = function() {};
            request.send();
        };

        sidebar.addEventListener('click', openPage, true);
        document.getElementsByTagName('header')[0].addEventListener('click',
                                                                     openPage);
    }

    var button = document.getElementsByTagName('button')[0];
    button.className = 'arrow';
    button.onclick = function() {
        this.className = this.className === 'arrow' ? 'hamburger' : 'arrow';
    };
};

document.addEventListener('DOMContentLoaded', notes.ondomcontentload);

window.onpopstate = function() {
    var current = document.getElementsByClassName('current');
    for (var i = current.length; --i;) {
        current[i].className = 'expanded';
    }

    var path = window.location.pathname,
        state = JSON.parse(sessionStorage.getItem(path)),
        main = document.getElementsByTagName('main')[0];
    main.innerHTML = state.main;
    
    document.title = main.getElementsByTagName('h1')[0].textContent;

    function replace(which) {
        var els = document.getElementsByClassName('title-' + which);
        els[0].textContent = els[1].textContent;
        if (state[which]) els[0].previousElementSibling.href = state[which];
        else els[0].previousElementSibling.removeAttribute('href');
    }
    replace('prev');
    replace('next');

    var link = document.querySelector('[href="' + path + '"]');
    link.className = 'current';
    for (; link.className !== 'current'; link = link.parentNode) {
        if (link.tagName === 'OL') link.className = 'current';
    }

    // + 2 to account for box shadow radius
    var currPos = document.getElementsByTagName('header')[0].offsetHeight + 2;
    if (window.scrollY > currPos) window.scroll(0, currPos);
};

window.setTimeout(function() {
    if (document.readyState in {complete: 1, interactive: 1, loaded: 1} &&
            notes.ondomcontentload) notes.ondomcontentload();
}, 0); // put this at the end of execution queue in case DOMContentLoaded
       // handler is queued
