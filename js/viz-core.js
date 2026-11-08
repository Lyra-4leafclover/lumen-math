/* Lumen visualization toolkit: canvas plots, controls, dragging. */
(function () {
  "use strict";
  const REG = {};
  let active = [];
  const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const PAL = () => ({
    ink: css("--ink"), ink2: css("--ink2"), muted: css("--muted"), line: css("--line"), line2: css("--line2"), bg: css("--card"), bg2: css("--bg2"),
    accent: css("--accent"), good: css("--good"), bad: css("--bad"), warn: css("--warn"),
    blue: css("--c-blue"), pink: css("--c-pink"), orange: css("--c-orange"), green: css("--c-green"), purple: css("--c-purple"), teal: css("--c-teal"), yellow: css("--c-yellow"),
  });
  const fmt = (v, d = 2) => { if (!isFinite(v)) return v > 0 ? "∞" : v < 0 ? "−∞" : "—"; const s = (+v).toFixed(d); return (s.includes(".") ? s.replace(/\.?0+$/, "") : s).replace(/^-0$/, "0").replace("-", "−"); };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  function rng(seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 1e9) / 1e9; }; }
  const gauss = (r = Math.random) => { let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

  class Plot {
    constructor(host, o) {
      this.o = Object.assign({ x: [-5, 5], y: [-5, 5], equal: true, h: 340, pad: 0, gridStep: 1 }, o);
      this.cv = document.createElement("canvas");
      host.appendChild(this.cv);
      this.ctx = this.cv.getContext("2d");
      this.handles = []; this.drag = null; this.hover = null;
      this.setView(this.o.x, this.o.y);
      const pt = (e) => { const r = this.cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
      this.cv.addEventListener("pointerdown", (e) => {
        const [px, py] = pt(e); let best = null, bd = 22;
        for (const h of this.handles) { if (h.hidden && h.hidden()) continue; const [hx, hy] = this.px(h.get()[0], h.get()[1]); const d = Math.hypot(hx - px, hy - py); if (d < bd) { bd = d; best = h; } }
        if (best) { this.drag = best; this.cv.setPointerCapture(e.pointerId); e.preventDefault(); }
        else if (this.onClick) { const w = this.world(px, py); this.onClick(w[0], w[1], e); }
      });
      this.cv.addEventListener("pointermove", (e) => {
        const [px, py] = pt(e), w = this.world(px, py);
        if (this.drag) { let [x, y] = w; if (this.drag.snap) { x = Math.round(x / this.drag.snap) * this.drag.snap; y = Math.round(y / this.drag.snap) * this.drag.snap; } x = clamp(x, this.x0, this.x1); y = clamp(y, this.y0, this.y1); this.drag.set(x, y); this.redraw && this.redraw(); }
        else { const over = this.handles.some((h) => { if (h.hidden && h.hidden()) return false; const [hx, hy] = this.px(h.get()[0], h.get()[1]); return Math.hypot(hx - px, hy - py) < 22; }); this.cv.style.cursor = over ? "grab" : this.onClick ? "crosshair" : "default"; if (this.onHover) { this.onHover(w[0], w[1]); } }
      });
      const up = () => { if (this.drag && this.drag.end) this.drag.end(); this.drag = null; };
      this.cv.addEventListener("pointerup", up); this.cv.addEventListener("pointercancel", up);
      this.cv.addEventListener("pointerleave", () => { if (this.onLeave) this.onLeave(); });
      this.ro = new ResizeObserver(() => { this.resize(); this.redraw && this.redraw(); });
      this.ro.observe(host);
      this.resize();
    }
    setView(x, y) { this.o.x = x; this.o.y = y; this.x0 = x[0]; this.x1 = x[1]; this.y0 = y[0]; this.y1 = y[1]; if (this.W) this.fit(); }
    resize() {
      const w = this.cv.parentElement.clientWidth || 600;
      let h = typeof this.o.h === "function" ? this.o.h(w) : this.o.h;
      if (this.o.aspect) h = Math.round(w / this.o.aspect);
      h = Math.min(h, Math.max(240, window.innerHeight * (w < 520 ? 0.6 : 0.7)));
      const dpr = window.devicePixelRatio || 1;
      this.W = w; this.H = h; this.cv.width = w * dpr; this.cv.height = h * dpr; this.cv.style.height = h + "px";
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.fit();
    }
    fit() {
      let [x0, x1] = this.o.x, [y0, y1] = this.o.y;
      if (this.o.equal) {
        const sx = this.W / (x1 - x0), sy = this.H / (y1 - y0), s = Math.min(sx, sy);
        const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, hw = this.W / s / 2, hh = this.H / s / 2;
        x0 = cx - hw; x1 = cx + hw; y0 = cy - hh; y1 = cy + hh;
      }
      this.x0 = x0; this.x1 = x1; this.y0 = y0; this.y1 = y1;
      this.sx = this.W / (x1 - x0); this.sy = this.H / (y1 - y0);
    }
    px(x, y) { return [(x - this.x0) * this.sx, this.H - (y - this.y0) * this.sy]; }
    world(px, py) { return [this.x0 + px / this.sx, this.y0 + (this.H - py) / this.sy]; }
    clear() { const c = this.ctx; c.clearRect(0, 0, this.W, this.H); this.P = PAL(); return this; }
    grid(step, o = {}) {
      const c = this.ctx, P = this.P; step = step || this.o.gridStep;
      const sx = o.stepY || step;
      c.lineWidth = 1; c.strokeStyle = P.line;
      c.beginPath();
      for (let x = Math.ceil(this.x0 / step) * step; x <= this.x1; x += step) { const [p] = this.px(x, 0); c.moveTo(Math.round(p) + 0.5, 0); c.lineTo(Math.round(p) + 0.5, this.H); }
      for (let y = Math.ceil(this.y0 / sx) * sx; y <= this.y1; y += sx) { const [, q] = this.px(0, y); c.moveTo(0, Math.round(q) + 0.5); c.lineTo(this.W, Math.round(q) + 0.5); }
      c.stroke();
      return this;
    }
    axes(o = {}) {
      const c = this.ctx, P = this.P;
      const [ox, oy] = this.px(0, 0);
      c.strokeStyle = P.muted; c.lineWidth = 1.5; c.beginPath();
      if (oy >= 0 && oy <= this.H) { c.moveTo(0, oy); c.lineTo(this.W, oy); }
      if (ox >= 0 && ox <= this.W) { c.moveTo(ox, 0); c.lineTo(ox, this.H); }
      c.stroke();
      if (o.labels !== false) {
        const step = o.step || this.o.gridStep, stepY = o.stepY || step, every = o.every || 1;
        c.fillStyle = P.muted; c.font = "11px Inter, sans-serif";
        const yy = clamp(oy + 14, 12, this.H - 4), xx = clamp(ox - 6, 22, this.W);
        c.textAlign = "center";
        let i = 0;
        for (let x = Math.ceil(this.x0 / step) * step; x <= this.x1; x += step, i++) { if (Math.abs(x) < 1e-9 || i % every) continue; const [p] = this.px(x, 0); c.fillText(o.fx ? o.fx(x) : fmt(x), p, yy); }
        c.textAlign = "right"; i = 0;
        for (let y = Math.ceil(this.y0 / stepY) * stepY; y <= this.y1; y += stepY, i++) { if (Math.abs(y) < 1e-9 || i % every) continue; const [, q] = this.px(0, y); c.fillText(o.fy ? o.fy(y) : fmt(y), xx, q + 4); }
      }
      if (o.xl) this.text(o.xl, this.x1, 0, { dx: -6, dy: -8, align: "right", color: P.muted });
      if (o.yl) this.text(o.yl, 0, this.y1, { dx: 8, dy: 14, align: "left", color: P.muted });
      return this;
    }
    style(o) { const c = this.ctx; c.strokeStyle = o.color || this.P.ink; c.fillStyle = o.fill || o.color || this.P.ink; c.lineWidth = o.width || 2; c.setLineDash(o.dash || []); c.globalAlpha = o.alpha == null ? 1 : o.alpha; c.lineCap = "round"; c.lineJoin = "round"; }
    reset() { const c = this.ctx; c.setLineDash([]); c.globalAlpha = 1; }
    line(x1, y1, x2, y2, o = {}) { const c = this.ctx; this.style(o); const a = this.px(x1, y1), b = this.px(x2, y2); c.beginPath(); c.moveTo(...a); c.lineTo(...b); c.stroke(); this.reset(); return this; }
    arrow(x1, y1, x2, y2, o = {}) {
      const c = this.ctx; this.style(o); const a = this.px(x1, y1), b = this.px(x2, y2);
      const ang = Math.atan2(b[1] - a[1], b[0] - a[0]), L = Math.hypot(b[0] - a[0], b[1] - a[1]), hs = Math.min(o.head || 12, L * 0.45);
      const e = [b[0] - Math.cos(ang) * hs * 0.6, b[1] - Math.sin(ang) * hs * 0.6];
      c.beginPath(); c.moveTo(...a); c.lineTo(...e); c.stroke();
      c.setLineDash([]); c.beginPath(); c.moveTo(...b); c.lineTo(b[0] - hs * Math.cos(ang - 0.42), b[1] - hs * Math.sin(ang - 0.42)); c.lineTo(b[0] - hs * Math.cos(ang + 0.42), b[1] - hs * Math.sin(ang + 0.42)); c.closePath(); c.fill();
      this.reset(); return this;
    }
    dot(x, y, r = 5, o = {}) { const c = this.ctx; this.style(o); const p = this.px(x, y); c.beginPath(); c.arc(p[0], p[1], r, 0, 7); if (o.stroke) { c.lineWidth = o.sw || 2; c.strokeStyle = o.stroke; c.fill(); c.stroke(); } else c.fill(); this.reset(); return this; }
    ring(x, y, r = 5, o = {}) { const c = this.ctx; this.style(o); const p = this.px(x, y); c.beginPath(); c.arc(p[0], p[1], r, 0, 7); c.stroke(); this.reset(); return this; }
    circle(x, y, R, o = {}) { const c = this.ctx; this.style(o); const p = this.px(x, y); c.beginPath(); c.ellipse(p[0], p[1], Math.abs(R * this.sx), Math.abs(R * this.sy), 0, 0, 7); if (o.fill) { c.globalAlpha = o.fa == null ? 1 : o.fa; c.fill(); c.globalAlpha = o.alpha == null ? 1 : o.alpha; } if (o.color !== "none") c.stroke(); this.reset(); return this; }
    poly(pts, o = {}) {
      if (!pts.length) return this; const c = this.ctx; this.style(o); c.beginPath();
      pts.forEach((p, i) => { const q = this.px(p[0], p[1]); i ? c.lineTo(...q) : c.moveTo(...q); });
      if (o.close) c.closePath();
      if (o.fill) { c.globalAlpha = o.fa == null ? 0.2 : o.fa; c.fillStyle = o.fill; c.fill(); c.globalAlpha = 1; }
      if (o.color !== "none") c.stroke(); this.reset(); return this;
    }
    rect(x, y, w, h, o = {}) { return this.poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], Object.assign({ close: true }, o)); }
    fn(f, o = {}) {
      const c = this.ctx; this.style(o); const a = o.from == null ? this.x0 : o.from, b = o.to == null ? this.x1 : o.to; const n = o.n || Math.max(200, Math.round(this.W)); let pen = false;
      c.beginPath();
      for (let i = 0; i <= n; i++) {
        const x = a + ((b - a) * i) / n, y = f(x);
        if (!isFinite(y) || Math.abs(y - (this.y0 + this.y1) / 2) > (this.y1 - this.y0) * 20) { pen = false; continue; }
        const q = this.px(x, y); pen ? c.lineTo(...q) : c.moveTo(...q); pen = true;
      }
      c.stroke(); this.reset(); return this;
    }
    area(f, a, b, o = {}) { const pts = [[a, o.base || 0]]; const n = 120; for (let i = 0; i <= n; i++) { const x = a + ((b - a) * i) / n; pts.push([x, f(x)]); } pts.push([b, o.base || 0]); return this.poly(pts, Object.assign({ close: true, fill: o.fill || this.P.accent, fa: o.fa == null ? 0.18 : o.fa, color: "none" }, o)); }
    param(f, t0, t1, o = {}) { const n = o.n || 300, pts = []; for (let i = 0; i <= n; i++) pts.push(f(t0 + ((t1 - t0) * i) / n)); return this.poly(pts, o); }
    text(s, x, y, o = {}) {
      const c = this.ctx; const p = this.px(x, y); c.font = `${o.weight || 600} ${o.size || 13}px ${o.mono ? "JetBrains Mono, monospace" : "Inter, sans-serif"}`; c.textAlign = o.align || "center"; c.textBaseline = o.base || "alphabetic";
      if (o.halo !== false) { c.lineWidth = 4; c.strokeStyle = this.P.bg; c.globalAlpha = 0.85; c.strokeText(s, p[0] + (o.dx || 0), p[1] + (o.dy || 0)); c.globalAlpha = 1; }
      c.fillStyle = o.color || this.P.ink; c.fillText(s, p[0] + (o.dx || 0), p[1] + (o.dy || 0)); c.textBaseline = "alphabetic"; return this;
    }
    handle(get, set, o = {}) { const h = Object.assign({ get, set }, o); this.handles.push(h); return h; }
    drawHandle(x, y, color, o = {}) { this.dot(x, y, o.r || 8, { color, fill: color, stroke: this.P.bg, sw: 3 }); return this; }
    destroy() { this.ro.disconnect(); }
  }

  function api(root, def) {
    const head = document.createElement("div"); head.className = "viz-head";
    head.innerHTML = `<span>Interactive</span><span class="vt"></span><span class="hint"></span>`;
    head.querySelector(".vt").textContent = def.title || "";
    head.querySelector(".hint").textContent = def.hint || "";
    root.appendChild(head);
    const stage = document.createElement("div"); stage.className = "viz-stage"; root.appendChild(stage);
    let ctl = null, read = null;
    const A = {
      root, stage, plots: [], raf: null, cleanups: [],
      title(t) { head.querySelector(".vt").textContent = t; },
      hint(t) { head.querySelector(".hint").textContent = t; },
      plot(o) { const p = new Plot(stage, o); p.redraw = () => A.draw && A.draw(); A.plots.push(p); return p; },
      ctl() { if (!ctl) { ctl = document.createElement("div"); ctl.className = "viz-ctl"; root.insertBefore(ctl, read); } return ctl; },
      slider(label, min, max, step, value, cb, f) {
        const w = document.createElement("div"); w.className = "ctl";
        w.innerHTML = `<label></label><input type="range"><output></output>`;
        const [lb, inp, out] = w.children; lb.innerHTML = label.includes("\\") || label.includes("^") || label.includes("_") ? window.LumenMath(label) : label;
        Object.assign(inp, { min, max, step, value });
        const show = () => (out.textContent = f ? f(+inp.value) : fmt(+inp.value, 3));
        inp.oninput = () => { show(); cb && cb(+inp.value); A.draw && A.draw(); };
        show(); A.ctl().appendChild(w);
        return { get v() { return +inp.value; }, set(v) { inp.value = v; show(); }, el: inp };
      },
      select(label, opts, value, cb) {
        const w = document.createElement("div"); w.className = "ctl";
        w.innerHTML = `<label></label><select></select>`; w.children[0].textContent = label;
        const s = w.children[1];
        opts.forEach((o) => { const op = document.createElement("option"); const [v, t] = Array.isArray(o) ? o : [o, o]; op.value = v; op.textContent = t; s.appendChild(op); });
        s.value = value; s.onchange = () => { cb && cb(s.value); A.draw && A.draw(); };
        A.ctl().appendChild(w); return { get v() { return s.value; }, el: s };
      },
      buttons(list) {
        const w = document.createElement("div"); w.className = "viz-btns";
        list.forEach((b) => { const el = document.createElement("button"); el.className = "vbtn"; el.textContent = b.label; el.onclick = () => { b.on(el); A.draw && A.draw(); }; b.el = el; w.appendChild(el); });
        A.ctl().appendChild(w); return list;
      },
      seg(list, value, cb) {
        const w = document.createElement("div"); w.className = "viz-btns";
        const els = list.map((o) => { const [v, t] = Array.isArray(o) ? o : [o, o]; const el = document.createElement("button"); el.className = "vbtn" + (v === value ? " on" : ""); el.textContent = t; el.onclick = () => { els.forEach((e) => e.classList.remove("on")); el.classList.add("on"); cb(v); A.draw && A.draw(); }; w.appendChild(el); return el; });
        A.ctl().appendChild(w); return w;
      },
      readout() { if (!read) { read = document.createElement("div"); read.className = "viz-read"; root.appendChild(read); } return read; },
      set(html) { const r = A.readout(); r.innerHTML = html; },
      tex(s) { return window.LumenMath(s); },
      loop(fn) { let last = performance.now(); const tick = (t) => { const dt = Math.min(0.05, (t - last) / 1000); last = t; if (fn(dt) !== false) A.raf = requestAnimationFrame(tick); else A.raf = null; }; cancelAnimationFrame(A.raf); A.raf = requestAnimationFrame(tick); },
      stop() { cancelAnimationFrame(A.raf); A.raf = null; },
      onCleanup(f) { A.cleanups.push(f); },
      destroy() { A.stop(); A.plots.forEach((p) => p.destroy()); A.cleanups.forEach((f) => f()); },
    };
    return A;
  }

  const onTheme = () => active.forEach((a) => a.draw && a.draw());
  window.addEventListener("lumen-theme", () => setTimeout(onTheme, 30));

  window.Viz = {
    register(name, def) { REG[name] = def; },
    has: (n) => !!REG[n],
    list: () => Object.keys(REG),
    mount(name, el, args) {
      const def = REG[name]; if (!def) throw new Error("Unknown viz " + name);
      const A = api(el, def); active.push(A);
      def.setup(A, args || {});
      A.draw && A.draw();
      return A;
    },
    cleanup() { active.forEach((a) => a.destroy()); active = []; },
    util: { fmt, clamp, lerp, rng, gauss, PAL, Plot },
  };
})();
