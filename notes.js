'use strict';

window.notes = {};

notes.init = function() {
    if (notes.init.called) return;
    else notes.init.called = true;

    function openAsync(href) {
        history.pushState('', '', href);
        window.onpopstate();
    };

    document.body.onkeyup = function(event) {
        if (document.body.scrollWidth < window.innerWidth || event.ctrlKey) {
            var direction = {Left: 'prev', ArrowLeft: 'prev', Right: 'next',
                ArrowRight: 'next'}[event.key || event.keyIdentifier];
            if (direction) {
                ga('send', 'event', 'header', 'key', direction); // G analytics
                openAsync(document.getElementById(direction).href);
            }
        }
    };

    var stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/gcse/notesjs.css';
    document.head.appendChild(stylesheet);

    document.getElementsByTagName('article')[0].style.minHeight =
        'calc(100vh - 70px)';

    var headerNav = document.getElementById('header-nav').style;
    headerNav.zIndex = 1;
    headerNav.top = (210 - window.scrollY) + 'px';

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

        document.getElementsByTagName('header')[0].onclick = function(event) {
            if (event.target.pathname.split('/')[2] !==
                    location.pathname.split('/')[2]) {
                ga('send', 'event', 'header', 'click', 'subject'); // analytics
                return
            }
            // if subjects don't match, open synchronously

            ga('send', 'event', 'header', 'click', 'page'); // Google analytics

            event.preventDefault(); // else open asynchronously

            openAsync(event.target.href);
        };

        sidebar.addEventListener('click', function(event) {
            event.preventDefault(); // open asynchronously

            var href = event.target.href;

            ga('send', 'event', 'sidebar', 'click', (href ? 'page' :
                'listing') + ' ' + event.target.parentNode.lastElementChild.className); // Google analytics, TODO: check correct

            // don't open if link is the current page or actually a listing
            if (href && event.target.className !== 'current') openAsync(href);
        });
    }

    notes.scrollTo.nav =
        document.getElementsByTagName('nav')[0].lastElementChild;
};

notes.scrollTo = function(el) {
    var nav = notes.scrollTo.nav;
    var difference = (el.offsetTop + el.offsetHeight/2) -
        (nav.scrollTop + nav.offsetHeight/2);
    var direction = difference > 0 ? 1 : -1;
    difference = direction * difference;

    var limit = (nav.offsetHeight - el.offsetHeight)/2;

    if (notes.scrollTo.intervalID === null && difference <= limit) return;

    clearInterval(notes.scrollTo.intervalID);
    notes.scrollTo.intervalID = null;

    if (notes.scrollTo.speed) {
        var stopDirection = direction === notes.scrollTo.direction ? -1 : 1;
        var endPos = difference + stopDirection * notes.scrollTo.speed *
            (notes.scrollTo.speed - 1)/2;
        var deceleration;
        if (endPos < limit || direction !== notes.scrollTo.direction) {
            if (Math.abs(endPos) < limit) {
                deceleration = 1;
            } else {
                var steps = Math.floor((notes.scrollTo.speed-3)/2);
                deceleration = Math.abs(difference + stopDirection * (steps+1) *
                    (notes.scrollTo.speed - 2 - steps)) <= limit ? 2 : 3;
            }
            notes.scrollTo.intervalID = setInterval(function() {
                if ((notes.scrollTo.speed -= deceleration) > 0) {
                    nav.scrollTop += notes.scrollTo.direction*
                        notes.scrollTo.speed;
                } else {
                    clearInterval(notes.scrollTo.intervalID);
                    notes.scrollTo.speed = 0;

                    if (deceleration === 3) {
                        difference = (notes.scrollTo.direction *= -1) *
                            ((el.offsetTop+el.offsetHeight/2) -
                            (nav.scrollTop+nav.offsetHeight/2));
                        notes.scrollTo.intervalID = setInterval(accelerate, 10);
                    }
                }
            }, 10);
            return;
        }
    }
    notes.scrollTo.direction = direction;
    notes.scrollTo.intervalID = setInterval(accelerate, 10);

    function accelerate() {
        nav.scrollTop += notes.scrollTo.direction * (notes.scrollTo.speed += 2);

        if ((difference -= notes.scrollTo.speed) -
                notes.scrollTo.speed*(notes.scrollTo.speed - 1)/2 < limit) {
            clearInterval(notes.scrollTo.intervalID);
            notes.scrollTo.intervalID = setInterval(decelerate, 10);
        }
    }

    function decelerate() {
        if (--notes.scrollTo.speed) {
            nav.scrollTop += notes.scrollTo.direction * notes.scrollTo.speed;
        } else {
            clearInterval(notes.scrollTo.intervalID);
            notes.scrollTo.intervalID = null;
        }
    }
};
notes.scrollTo.intervalID = null;
notes.scrollTo.speed = 0;

if (document.readystate === 'loading') {
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

window.onscroll = function() {
    var scroll = window.scrollY;
    document.getElementById('header-nav').style.top = (scroll < 180 ? 210 -
        scroll : 30) + 'px';
}

window.onpopstate = function() {
    ga('send', 'pageview'); // Google analytics

    window.scroll(0, 0);

    var current = document.getElementsByClassName('current')
    for (var i = current.length; --i;) current[i].className = 'expanded';

    var titleNo = location.pathname.split('/').slice(3, -1);
    var titles = document.getElementsByTagName('h1');
    var linkPath = [];
    var sideLink;
    var prev;
    var next;
    if (titleNo.length) {
        sideLink = notes.scrollTo.nav;
        for (var i = 0; i < titleNo.length; i++) {
            sideLink = sideLink.children[titleNo[i] - 1].lastElementChild;
            if (sideLink.tagName === 'A') {
                linkPath.push(sideLink.textContent);
            } else {
                linkPath.push(sideLink.previousElementSibling.textContent);

                if (!sideLink.className) notes.toggleList(sideLink);
            }
            sideLink.className = 'current';
        }

        prev = sideLink;
        do {
            prev = prev.parentNode;
            while (!prev.previousElementSibling && prev.tagName !== 'NAV') {
                prev = prev.parentNode.parentNode;
            }
            if (prev.tagName !== 'NAV') {
                prev = prev.previousElementSibling.lastElementChild;
                while (prev.tagName !== 'A') {
                    prev = prev.lastElementChild.lastElementChild;
                }
            }
        } while (prev.className === 'nolist');

        next = sideLink;
        do {
            next = next.parentNode;
            while (!next.nextElementSibling && next.tagName !== 'NAV') {
                next = next.parentNode.parentNode;
            }
            if (next.tagName !== 'NAV') {
                next = next.nextElementSibling.lastElementChild;
                while (next.tagName !== 'A') {
                    next = next.firstElementChild.lastElementChild;
                }
            }
        } while (next.className === 'nolist');

        notes.scrollTo(sideLink);
    } else {
        sideLink = document.querySelector('[href="' + location.pathname + '"]');
        prev = next = {href: ''};
    }

    document.title = titleNo.join('.') + ' ' + sideLink.textContent +
        ' :: GCSE notes';

    titles[1].textContent = titles[0].textContent = sideLink.textContent;
    titles[1].nextElementSibling.textContent = linkPath.join(' > ');
    document.getElementsByTagName('article')[0].innerHTML =
        titles[1].parentNode.outerHTML +
        sessionStorage.getItem(location.pathname);

    function replaceButton(direction) {
        var button = document.getElementById(direction),
            el = direction === 'prev' ? prev : next;
        if (button.href = el.href || '') { // assignment intentional
            button.nextElementSibling.textContent =
                el.pathname.split('/').slice(3, -1).join('.') + ' ' +
                el.textContent;
        }
    }
    replaceButton('prev');
    replaceButton('next');
};

// Google Analytics follows until end
(function(i,s,o,g,r,a,m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function(){
        (i[r].q = i[r].q || []).push(arguments);
    };
    i[r].l = 1*new Date();
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a,m);
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-61247210-1', 'auto');
ga('send', 'pageview');
