// ==UserScript==
// @name         Force Inline Video Playback (WebKit Optimized)
// @namespace    https://your.namespace.here
// @version      1.3
// @description  Forces inline video playback and hides controls quickly using WebKit-specific features.
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

        // Auto-hide controls using WebKit styling
        video.addEventListener('play', () => {
            setTimeout(() => {
                video.removeAttribute('controls'); // Temporarily remove to reset visibility
                video.setAttribute('controls', ''); // Re-add to keep controls functional
            }, 500); // Shorter delay for WebKit behavior
        });

        // Hide controls using WebKit-specific CSS
        const style = document.createElement('style');
        style.textContent = `
            video::-webkit-media-controls-panel {
                display: none !important;
            }
            video:active::-webkit-media-controls-panel {
                display: flex !important;
            }
        `;
        document.head.appendChild(style);
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
