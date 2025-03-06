function FindProxyForURL(url, host) {
    // Domains for which no proxy is needed
    var tiktokDomains = [
        "musically.app.link", "musically-alternate.app.link", "app-measurement.com", "dig.bdurl.net", 
        "dm.bytedance.net", "byteoversea.com", "abtest-sg.byteoversea.com", "abtest-va-tiktok.byteoversea.com", 
        "aliva-sentry.byteoversea.com", "developer-sg.byteoversea.com", "dm-maliva-quic.byteoversea.com", 
        "dm-maliva16.byteoversea.com", "dm16.byteoversea.com", "frontier.byteoversea.com", "gecko-sg.byteoversea.com", 
        "gecko-va.byteoversea.com", "jsb-sg.byteoversea.com", "jsb-va.byteoversea.com", "log.byteoversea.com", 
        "log15.byteoversea.com", "log16.byteoversea.com", "maliva-mcs.byteoversea.com", "mon.byteoversea.com", 
        "mon-va.byteoversea.com", "rtlog.byteoversea.com", "sdfp-sg.byteoversea.com", "sdfp-va.byteoversea.com", 
        "sgali-mcs.byteoversea.com", "smr-aliva.byteoversea.com", "smr-sg.byteoversea.com", "toblog.byteoversea.com", 
        "v16-ad.byteoversea.com", "vaali-mcs.byteoversea.com", "vas-alisg19.byteoversea.com", "vas-alisg22-quic.byteoversea.com", 
        "vas-maliva.byteoversea.com", "vas-maliva16.byteoversea.com", "vas-maliva19.byteoversea.com", 
        "vas-maliva21.byteoversea.com", "verification-va.byteoversea.com", "verify-sg.byteoversea.com", "xlog.byteoversea.com", 
        "xlog-va.byteoversea.com", "ad-lb-alisg.byteoversea.net", "ad-lb-maliva.byteoversea.net", "equinix-iad-api.l.byteoversea.net", 
        "equinix-iad-cache01.l.byteoversea.net", "equinix-sjc-v1.l.byteoversea.net", "equinix-sjc-v2.l.byteoversea.net", 
        "mvaali1.l.byteoversea.net", "mvaali2.l.byteoversea.net", "sgali3.l.byteoversea.net", 
        "topbuzz-applog-alisg.l.byteoversea.net", "vaali1.l.byteoversea.net", "zong-khi-v1.l.byteoversea.net", 
        "zong-lhe-v1.l.byteoversea.net", "maliva-normal-lb.byteoversea.net", "security-lb-maliva.byteoversea.net", 
        "sgali1.ws.byteoversea.net", "log.byteoversea.com.edgekey.net", "log16.byteoversea.com.edgekey.net", 
        "i16-tb.isnssdk.com.edgekey.net", "log-va.tiktokv.com.edgekey.net", "applog.musical.ly.edgekey.net", 
        "jsb-va.musical.ly.edgekey.net", "log2-useast2a.musical.ly.edgekey.net", "rtlog.musical.ly.edgekey.net", 
        "developer-sg.byteoversea.com.edgesuite.net", "gecko-sg.byteoversea.com.edgesuite.net", "mon.byteoversea.com.edgesuite.net", 
        "mon-va.byteoversea.com.edgesuite.net", "sdfp-va.byteoversea.com.edgesuite.net", "verification-va.byteoversea.com.edgesuite.net", 
        "xlog.byteoversea.com.edgesuite.net", "xlog-va.byteoversea.com.edgesuite.net", "gecko-va.tiktokv.com.edgesuite.net", 
        "log.tiktokv.com.edgesuite.net", "mon.tiktokv.com.edgesuite.net", "mon-va.tiktokv.com.edgesuite.net", 
        "xlog.tiktokv.com.edgesuite.net", "gecko-va.musical.ly.edgesuite.net", "log2.musical.ly.edgesuite.net", 
        "mon.musical.ly.edgesuite.net", "xlog-va.musical.ly.edgesuite.net", "a15-tb.isnssdk.com", "a16-tb.isnssdk.com", 
        "cdn.isnssdk.com", "client_monitor.isnssdk.com", "clientmonitor.isnssdk.com", "dm.isnssdk.com", "f-p-va.isnssdk.com", 
        "hotapi-va.isnssdk.com", "i.isnssdk.com", "i-tb.isnssdk.com", "i16-tb.isnssdk.com", "ichannel.isnssdk.com", 
        "ichannel-tb.isnssdk.com", "isub.isnssdk.com", "isub-tb.isnssdk.com", "log.isnssdk.com", "log-tb.isnssdk.com", 
        "mon.isnssdk.com", "monitor.isnssdk.com", "notifyback-va.isnssdk.com", "open.isnssdk.com", "patrol-sg.isnssdk.com", 
        "rtlog.isnssdk.com", "vas.isnssdk.com", "app.musemuse.cn", "share.musemuse.cn", "applog.musical.ly", 
        "applog-useast1a.musical.ly", "applog-useast2a.musical.ly", "dm16.musical.ly", "frontier.musical.ly", 
        "gecko-va.musical.ly", "gecko-va-useast1a.musical.ly", "gecko-va-useast2a.musical.ly", "jsb-va.musical.ly", 
        "log.musical.ly", "log2.musical.ly", "log2-useast1a.musical.ly", "log2-useast2a.musical.ly", "mon.musical.ly", 
        "rtlog.musical.ly", "sdfp-va.musical.ly", "xlog-va.musical.ly", "snssdk1180.onelink.me", "snssdk1233.onelink.me", 
        "dm.pstatp.com", "dm.sgsnssdk.com", "i-tb.sgsnssdk.com", "isub-tb.sgsnssdk.com", "log.sgsnssdk.com", 
        "log-tb.sgsnssdk.com", "mon.sgsnssdk.com", "vas.sgsnssdk.com", "gecko-va.snssdk.com", "i.snssdk.com", 
        "ib.snssdk.com", "is.snssdk.com", "log.snssdk.com", "mcs.snssdk.com", "mon.snssdk.com", "patrol.snssdk.com", 
        "patrol-sg.snssdk.com", "rc.snssdk.com", "verify.snssdk.com", "ads.tiktok.com", "analytics.tiktok.com", 
        "test-ads.tiktok.com", "applog.tiktokv.com", "dm16.tiktokv.com", "dm16-alisg.tiktokv.com", "dm16-useast1a.tiktokv.com", 
        "dm16-useast2a.tiktokv.com", "dm16-va.tiktokv.com", "frontier.tiktokv.com", "frontier-va.tiktokv.com", 
        "gecko-sg.tiktokv.com", "gecko-va.tiktokv.com", "gecko16-normal-c-useast1a.tiktokv.com", 
        "gecko16-normal-c-useast2a.tiktokv.com", "ib.tiktokv.com", "jsb-va.tiktokv.com", "log.tiktokv.com", 
        "log-va.tiktokv.com", "log16-normal-c-useast1a.tiktokv.com", "log16-normal-c-useast2a.tiktokv.com", 
        "mcs-va.tiktokv.com", "mcs-va-useast2a.tiktokv.com", "mon.tiktokv.com", "mon-va.tiktokv.com", "rtlog.tiktokv.com", 
        "sdfp-va.tiktokv.com", "verification-va.tiktokv.com", "xlog.tiktokv.com", "xlog-va.tiktokv.com", 
        "business.topbuzz.com", "business-sg.topbuzz.com", "dm.toutiao.com", "wshifen.com", "www.wshifen.com", 
        "tiktok.com", "www.tiktok.com"
    ];

    // No proxy for specific TikTok domains
    for (var i = 0; i < tiktokDomains.length; i++) {
        if (host == tiktokDomains[i]) {
            return "SOCKS5 192.168.1.165:1080";
        }
    }

    // All other requests go through direct connection
    return "DIRECT";
}
