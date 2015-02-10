'use strict';
window.notes = {
    changePage: function(url, finish) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var newDoc = document.implementation.createHTMLDocument();
                newDoc.documentElement.innerHTML = request.responseText;

                var newMain = newDoc.getElementsByTagName('main')[0];
                document.body.replaceChild(newMain,
                                     document.getElementsByTagName('main')[0]);

                history.pushState({main: newMain.innerHTML,
                                   title: newDoc.title}, '', url);

                notes.onpagechange(newDoc.title);

                finish();
            } else {

            }
        };
        
        request.onerror = function() {};

        request.send();
    },
    onpagechange: function(title) {
        document.title = title;

        var scrollPos = document.getElementById('header').offsetHeight + 2;
        if (window.scrollY > scrollPos) window.scroll(0, scrollPos);
    }
}

window.onpopstate = function(event) {
    var state = event.state;

    var main = document.getElementsByTagName('main')[0];
    main.innerHTML = state.main;

    notes.onpagechange(state.title);
};

document.addEventListener('DOMContentLoaded', function() {
    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'notesextra.css';
    document.head.appendChild(stylesheet);

    document.getElementById('header').style.backgroundColor = '#ccc';

    var sidebar =  document.getElementsByTagName('nav')[0];

    sidebar.addEventListener('mouseenter', function(event) {
        event.stopPropagation();

        if (event.target.tagName === 'LI') {
            var el = event.target.lastElementChild;
            
            if (el.tagName !== 'OL' || el.className === 'current') return;
            
            el.style.height = '0';
            el.scrollHeight; // force reflow
            el.style.height = el.scrollHeight + 'px';

            window.setTimeout(function(){el.style.height = ''}, 250);
        }
    }, true);

    sidebar.addEventListener('mouseleave', function(event) {
        event.stopPropagation();

        if (event.target.tagName === 'LI') {
            var el = event.target.lastElementChild;

            if (el.tagName !== 'OL' || el.className === 'current') return;
            
            el.style.height = el.scrollHeight + 'px';
            el.scrollHeight; // force reflow
            el.style.height = '';
        }
    }, true);

    if (history.pushState) {
       sidebar.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            var link = event.target;
            if (link.className === 'current') return;
             
            notes.changePage(link.href, function() {
                var current = document.getElementsByClassName('current');
                for (var i = current.length; i;) current[--i].className = '';

                link.className = 'current';
                while ((link = link.parentNode).tagName !== 'NAV') {
                    if (link.tagName === 'OL') link.className = 'current';
                }   
            });
        }, true);

            history.replaceState({title: document.title,
                     main: document.getElementsByTagName('main')[0].innerHTML},
                                                          '', window.location);
    }
});
