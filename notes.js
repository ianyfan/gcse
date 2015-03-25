'use strict';

window.notes = {};

notes.init = function() {
    if (notes.init.called) return;
    else notes.init.called = true;

    document.body.onkeyup = function(event) {
        if (document.body.scrollWidth < window.innerWidth || event.ctrlKey) {
            var direction = {Left: 'prev', ArrowLeft: 'prev', Right: 'next',
                ArrowRight: 'next'}[event.key || event.keyIdentifier];
            if (direction) document.getElementById(direction).click();
        }
    };

    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/gcse/notesjs.css';
    document.head.appendChild(stylesheet);

    var sidebar = document.getElementsByTagName('nav')[0].firstElementChild;
    sidebar.onkeyup = function(event) {
        var list = document.activeElement.nextElementSibling;
        if ((event.key || event.keyIdentifier) === 'Enter' && list &&
                list.tagName === 'OL' && list.className !== 'current') {
            notes.toggleList(list);
        }
    };
    sidebar.onclick = function(event) {
        var list = event.target.nextElementSibling;
        if (list && list.tagName === 'OL' && list.className !== 'current') {
            event.stopImmediatePropagation();
            notes.toggleList(list);
        }
    };

    if (history.pushState) {
        history.replaceState('', '');

        if (!(location.pathname in sessionStorage)) {
            var script = document.createElement('script');
            script.src = '/gcse/' + location.pathname.split('/')[2] +
                '/cachesubject.js';
            document.head.appendChild(script);
        }

        sidebar.addEventListener('click',
            document.getElementsByTagName('header')[0].onclick = function(event) {
                if (event.target.pathname.split('/')[2] !==
                        location.pathname.split('/')[2]) return;
                // if subjects don't match, open synchronously
                event.preventDefault(); // else open asynchronously

                var href = event.target.href;
                // unless link is the current page or actually a listing
                if (!href || event.target.className === 'current') return;

                history.pushState('', '', href);
                window.onpopstate();
            }
        );
    }
};

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

if (document.readystate === 'loading') {
    document.addEventListener('DOMContentLoaded', notes.init);
} else {
    notes.init();
}

window.onpopstate = function() {
    window.scroll(0, 0);

    for (var current = document.getElementsByClassName('current'),
            i = current.length; --i;) current[i].className = 'expanded';

    var nav = document.getElementsByTagName('nav')[0].firstElementChild,
        sideLink = nav.querySelector('[href="'+location.pathname+'"]'),
        titleNo = [],
        linkPath = [],
        prev,
        next;
    if (sideLink) {
        sideLink.className = 'current';
        var parentSection = sideLink,
            section;
        do {
            section = parentSection;
            if (!section.className) notes.toggleList(section);
            section.className = 'current';

            linkPath.unshift(section.tagName === 'A' ? section.textContent :
                section.previousElementSibling.textContent);

            parentSection = section.parentNode.parentNode;
            titleNo.unshift(Array.prototype.indexOf.call(parentSection.children,
                section.parentNode) + 1);
        } while (parentSection.parentNode.tagName !== 'NAV');

        if (sideLink.offsetTop < nav.scrollTop || // link is off the top
                sideLink.offsetTop + sideLink.offsetHeight > // or off the bottom
                nav.scrollTop + nav.offsetHeight) {
            var difference = (sideLink.offsetTop + sideLink.offsetHeight/2) - 
                    (nav.scrollTop + nav.offsetHeight/2),
                direction = difference > 0 ? 1 : -1;
            difference = direction*difference;

            var velocity = 0,
                intervalID = setInterval(function() {
                nav.scrollTop += direction * (velocity += 2);
                if ((difference -= velocity) < (velocity + 1)*(velocity + 2)/2) {
                    clearInterval(intervalID);

                    var error = difference - velocity * (velocity + 1)/2;
                    setTimeout(function() {
                        nav.scrollTop += direction * error;

                        intervalID = setInterval(function() {
                            nav.scrollTop += direction * velocity--;
                            if (velocity === 0) clearTimeout(intervalID);
                        }, 10);
                    }, 10*(error/velocity));
                }
            }, 10);
        }

        prev = sideLink.parentNode;
        while (!prev.previousElementSibling && prev.tagName !== 'NAV') {
            prev = prev.parentNode.parentNode;
        }
        if (prev.tagName !== 'NAV') {
            prev = prev.previousElementSibling.lastElementChild;
            while (prev.tagName !== 'A') {
                prev = prev.lastElementChild.lastElementChild;
            }
        } else {
            prev = null;
        }

        next = sideLink.parentNode;
        while (!next.nextElementSibling && next.tagName !== 'NAV') {
            next = next.parentNode.parentNode;
        }
        if (next.tagName !== 'NAV') {
            next = next.nextElementSibling.lastElementChild;
            while (next.tagName !== 'A') {
                next = next.firstElementChild.lastElementChild;
            }
        } else {
            next = null;
        }
    } else {
        sideLink = document.querySelector('[href="'+location.pathname+'"]');
    }

    document.title = titleNo.join('.') + ' ' + sideLink.textContent;

    var titles = document.getElementsByTagName('h1');
    for (var i in titles) titles[i].textContent = sideLink.textContent;
    titles[1].nextElementSibling.textContent = linkPath.join(' > ');
    document.getElementsByTagName('article')[0].innerHTML =
        titles[1].parentNode.outerHTML + sessionStorage.getItem(location.pathname);

    function replaceButton(direction) {
        var button = document.getElementById(direction),
            el = direction === 'prev' ? prev : next;
        if (el) {
            button.href = el.href;
            button.nextElementSibling.textContent = el.textContent;
        } else {
            button.removeAttribute('href');
        }
    }
    replaceButton('prev');
    replaceButton('next');
};
