'use strict';
window.notes = {
}

window.onpopstate = function() {
    console.log(window.location)
    var state = JSON.parse(sessionStorage.getItem(window.location));
    document.title = state.title;

    document.getElementsByTagName('main')[0].innerHTML = state.main;

    var scrollPos = document.getElementById('header').offsetHeight + 2;
    if (window.scrollY > scrollPos) window.scroll(0, scrollPos);
};

document.addEventListener('DOMContentLoaded', function() {
    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'notesextra.css';
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
        notes.cachePage = function(dom) {
            console.log(window.location)
            sessionStorage.setItem(window.location, JSON.stringify({
                title: dom.title,
                main: dom.getElementsByTagName('main')[0].innerHTML
            }));
        };

        history.replaceState('', '');
        notes.cachePage(document);

        sidebar.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            var link = event.target,
                url = link.href;
            if (!url || link.className === 'current') return;

            history.pushState('', '', url);
            
            function loadFromCache() {
                window.onpopstate();

                var current = document.getElementsByClassName('current');
                for (var i = current.length; i;) {
                    current[--i].className = 'expanded';
                }

                link.className = 'current';
                while ((link = link.parentNode).tagName !== 'NAV') {
                    if (link.tagName === 'OL') link.className = 'current';
                }  
            }

            if (sessionStorage.getItem(url)) {
                loadFromCache();
                return;
            }

            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var newDoc = document.implementation.createHTMLDocument();
                    newDoc.documentElement.innerHTML = request.responseText;
                    notes.cachePage(newDoc);
                    loadFromCache();
                } else {

                }
            };
            request.onerror = function() {};
            request.send();
        }, true);
    }
});
