// Page-wide dot-matrix wave. Fixed behind all content, purely decorative.
(function () {
    var canvas = document.getElementById("page-dots");
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var reduce = window.matchMedia &&
                 window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var BUCKETS = 8;          // alpha steps, so we fill in batches not per dot
    var FRAME_MS = 33;        // ~30fps is plenty for a slow wave
    var w = 0, h = 0, dpr = 1, spacing = 26, last = 0;
    var bx = [], by = [], bs = [];   // per-bucket dot coords and size

    for (var i = 0; i < BUCKETS; i++) { bx[i] = []; by[i] = []; }

    function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = window.innerWidth;
        h = window.innerHeight;
        spacing = w < 700 ? 30 : 26;
        canvas.width  = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // representative size per bucket
        for (var i = 0; i < BUCKETS; i++) {
            bs[i] = 1.1 + (i / (BUCKETS - 1)) * 1.5;
        }
    }

    function draw(t) {
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < BUCKETS; i++) { bx[i].length = 0; by[i].length = 0; }

        for (var x = spacing / 2; x < w; x += spacing) {
            for (var y = spacing / 2; y < h; y += spacing) {
                var wave = Math.sin((x + y) * 0.011 - t * 0.0009);
                var k = (wave + 1) / 2;                       // 0..1
                var b = Math.min(BUCKETS - 1, (k * BUCKETS) | 0);
                bx[b].push(x); by[b].push(y);
            }
        }

        for (var b2 = 0; b2 < BUCKETS; b2++) {
            var xs = bx[b2];
            if (!xs.length) continue;
            var alpha = 0.05 + (b2 / (BUCKETS - 1)) * 0.13;   // stays faint under text
            var s = bs[b2];
            ctx.fillStyle = "rgba(90, 88, 84, " + alpha.toFixed(3) + ")";
            var ys = by[b2];
            for (var j = 0; j < xs.length; j++) {
                ctx.fillRect(xs[j] - s / 2, ys[j] - s / 2, s, s);
            }
        }
    }

    function frame(ts) {
        if (ts - last >= FRAME_MS) { draw(ts); last = ts; }
        requestAnimationFrame(frame);
    }

    resize();
    var animate = !reduce && window.innerWidth >= 640;
    if (animate) { requestAnimationFrame(frame); } else { draw(0); }

    var pending;
    window.addEventListener("resize", function () {
        clearTimeout(pending);
        pending = setTimeout(function () {
            resize();
            if (!animate) draw(0);
        }, 150);
    });
})();
