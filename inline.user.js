// ==UserScript==
// @name         Force Inline Video Playback (Fixed)
// @namespace    https://your.namespace.here
// @version      1.1
// @description  Forces videos to play inline by adding playsinline and webkit-playsinline attributes, while keeping controls intact.
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
