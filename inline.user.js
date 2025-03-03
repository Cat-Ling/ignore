// ==UserScript==
// @name         Force Inline Video Playback (Auto-Hide Controls)
// @namespace    https://your.namespace.here
// @version      1.2
// @description  Forces videos to play inline while keeping controls, but auto-hiding them after playback starts.
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function forceInlinePlayback(video) {
        if (!video.hasAttribute('playsinline')) {
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            console.log('[UserScript] Forced inline playback on:', video);
        }

        // Auto-hide controls after play starts
        video.addEventListener('play', () => {
            setTimeout(() => {
                video.removeAttribute('controls'); // Hide controls
                video.setAttribute('controls', ''); // Re-add to keep them usable
            }, 2000); // Adjust delay as needed
        });
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
