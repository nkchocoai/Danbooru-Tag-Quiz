// ==UserScript==
// @name         Safebooru to Danbooru Redirect (with Dynamic Updates)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Redirect Safebooru links to Danbooru links, including dynamically added ones
// @author       nkchocoai
// @match        https://nkchocoai.github.io/Danbooru-Tag-Quiz/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Function to update links
    function updateLinks() {
        const links = document.querySelectorAll('a[href*="safebooru.donmai.us/wiki_pages/"]');
        links.forEach(link => {
            const url = new URL(link.href);
            if (url.hostname === 'safebooru.donmai.us') {
                url.hostname = 'danbooru.donmai.us';
                link.href = url.toString();
            }
        });
    }

    // Initial run to update existing links
    updateLinks();

    // Observe for dynamically added links
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                updateLinks();
            }
        });
    });

    // Start observing the document
    const targetNode = document.getElementById("history");
    observer.observe(targetNode, { childList: true, subtree: true });
})();
