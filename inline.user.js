// ==UserScript==
// @name         Force Inline Video Playback
// @namespace    https://your.namespace.here
// @version      1.0
// @description  Forces videos to play inline by adding playsinline and webkit-playsinline attributes.
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function forceInlinePlayback(video) {
        if (video && !video.hasAttribute('playsinline')) {
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.removeAttribute('controls'); // Optional: Remove fullscreen button
            console.log('[UserScript] Forced inline playback on:', video);
        }
    }

    function processVideos() {
        document.querySelectorAll('video').forEach(forceInlinePlayback);
    }

    // Run on page load
    processVideos();

    // Observe for dynamically added videos
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
