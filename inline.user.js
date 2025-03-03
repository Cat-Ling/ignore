// ==UserScript==
// @name         Inline videos on webkit
// @namespace    https://*
// @version      1.1
// @description  Forces videos to play inline by adding playsinline and webkit-playsinline attributes, while keeping controls intact.
// @author       AI
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function forceInlinePlayback(video) {
        if (video && !video.hasAttribute('playsinline')) {
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
        }
    }

    function processVideos() {
        document.querySelectorAll('video').forEach(forceInlinePlayback);
    }

    processVideos();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'VIDEO') {
                    forceInlinePlayback(node);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
