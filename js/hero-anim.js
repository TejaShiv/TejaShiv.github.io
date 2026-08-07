// Minimal dot-matrix wave for the hero's empty right side.
// Absolutely positioned and pointer-events:none, so it never affects layout.
(function () {
    var canvas = document.getElementById("hero-dots");
    if (!canvas || !canvas.getContext) return;

    var ctx = canvas.getContext("2d");
    var reduce = window.matchMedia &&
                 window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var SPACING = 22;   // px between dots
    var BASE_R  = 1.15; // resting dot radius
    var w = 0, h = 0, dpr = 1;

    function resize() {
        dpr = window.devicePixelRatio || 1;
        w = canvas.clientWidth;
        h = canvas.clientHeight;
        canvas.width  = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t) {
        ctx.clearRect(0, 0, w, h);
        for (var x = SPACING / 2; x < w; x += SPACING) {
            for (var y = SPACING / 2; y < h; y += SPACING) {
                // diagonal travelling wave
                var phase = (x + y) * 0.012 - t * 0.0011;
                var wave  = Math.sin(phase);            // -1 .. 1
                var k     = (wave + 1) / 2;             //  0 .. 1
                var r     = BASE_R * (0.55 + k * 1.05);
                var a     = 0.10 + k * 0.26;

                ctx.beginPath();
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(77, 77, 77, " + a.toFixed(3) + ")";
                ctx.fill();
            }
        }
    }

    function frame(ts) {
        draw(ts);
        requestAnimationFrame(frame);
    }

    resize();
    if (reduce) {
        draw(0); // single static frame, no motion
    } else {
        requestAnimationFrame(frame);
    }

    var pending;
    window.addEventListener("resize", function () {
        clearTimeout(pending);
        pending = setTimeout(function () {
            resize();
            if (reduce) draw(0);
        }, 150);
    });
})();
