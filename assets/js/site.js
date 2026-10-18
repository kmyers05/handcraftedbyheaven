/* Handcrafted by Heaven :: shared site behavior
   Content lives in content.js. This file only renders it. */
(function () {
  "use strict";

  const SITE = window.SITE || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- helpers ---------- */
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const isTodo = (s) => typeof s === "string" && /^\s*TODO/i.test(s);
  const isBlank = (s) => !s || !String(s).trim() || isTodo(s);

  // Render text, or a visible placeholder chip when it starts with TODO
  function txt(s) {
    if (isTodo(s)) {
      const clean = String(s).replace(/^\s*TODO\s*:?\s*/i, "");
      return `<span class="todo" title="Placeholder: edit in assets/js/content.js"><span class="todo__tag">placeholder</span>${esc(clean)}</span>`;
    }
    return esc(s);
  }

  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  function parseDate(d) {
    if (!d || !/^\d{4}-\d{2}-\d{2}$/.test(d)) return null;
    const [y, m, day] = d.split("-").map(Number);
    return new Date(y, m - 1, day);
  }

  function fmtTime(t) {
    if (!t || !/^\d{1,2}:\d{2}$/.test(t)) return "";
    let [h, m] = t.split(":").map(Number);
    const ap = h >= 12 ? "pm" : "am";
    h = h % 12 || 12;
    return m ? `${h}:${String(m).padStart(2, "0")}${ap}` : `${h}${ap}`;
  }

  /* ---------- icons (inline, ink line style) ---------- */
  const ICON = {
    email:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="3"/><path d="M4 7.5l8 6 8-6"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" class="fill"/></svg>',
    facebook:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><path d="M13.2 20.5v-7h2.4l.4-2.7h-2.8V9.2c0-.8.3-1.3 1.4-1.3H16V5.6c-.3 0-1.1-.1-2-.1-2 0-3.3 1.2-3.3 3.4v1.9H8.4v2.7h2.3v7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0113 0c0 4.8-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
    cal: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
  };
  window.HBH_ICON = ICON;

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg) {
    let t = $(".toast");
    if (!t) {
      t = document.createElement("div");
      t.className = "toast";
      t.setAttribute("role", "status");
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-on"), 2200);
  }

  /* ---------- contact links ---------- */
  function wireLinks() {
    const L = SITE.links || {};
    $$("[data-link]").forEach((a) => {
      const kind = a.dataset.link;
      const val = L[kind];
      if (a.dataset.icon !== "none" && ICON[kind] && !a.querySelector("svg")) {
        a.insertAdjacentHTML("afterbegin", ICON[kind]);
      }
      if (isBlank(val)) {
        a.classList.add("is-placeholder");
        a.setAttribute("href", "#");
        a.setAttribute("aria-disabled", "true");
        a.title = "Link coming soon";
        a.addEventListener("click", (e) => {
          e.preventDefault();
          toast(`${kind[0].toUpperCase() + kind.slice(1)} link coming soon!`);
        });
        return;
      }
      if (kind === "email") {
        a.href = `mailto:${val}`;
      } else {
        a.href = val;
        a.target = "_blank";
        a.rel = "noopener";
      }
    });
    $$("[data-text='email']").forEach((el) => {
      el.innerHTML = isBlank(L.email) ? txt("TODO: email address") : esc(L.email);
    });
  }

  /* ---------- header / nav ---------- */
  function wireNav() {
    const header = $(".site-header");
    const toggle = $(".nav-toggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const open = document.body.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
      $$(".site-nav a").forEach((a) =>
        a.addEventListener("click", () => {
          document.body.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
        })
      );
    }
    const page = document.body.dataset.page;
    $$(".site-nav a[data-nav]").forEach((a) => {
      if (a.dataset.nav === page) a.setAttribute("aria-current", "page");
    });
    const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  /* ---------- reveal on scroll ---------- */
  let io;
  function reveal(root = document) {
    const els = $$("[data-reveal]:not(.is-in)", root);
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    io =
      io ||
      new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("is-in");
              io.unobserve(en.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
    els.forEach((el) => io.observe(el));
  }

  /* ---------- lightbox ---------- */
  const LB = { items: [], i: 0, el: null, lastFocus: null };

  function buildLightbox() {
    if (LB.el) return;
    const el = document.createElement("div");
    el.className = "lightbox";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Photo viewer");
    el.innerHTML = `
      <button class="lightbox__close icon-btn" aria-label="Close">${ICON.close}</button>
      <button class="lightbox__nav lightbox__prev icon-btn" aria-label="Previous photo">${ICON.prev}</button>
      <figure class="lightbox__figure">
        <div class="lightbox__frame"><img alt=""></div>
        <figcaption class="lightbox__caption">
          <span class="lightbox__name"></span>
          <span class="lightbox__desc"></span>
          <span class="lightbox__count"></span>
        </figcaption>
      </figure>
      <button class="lightbox__nav lightbox__next icon-btn" aria-label="Next photo">${ICON.next}</button>`;
    document.body.appendChild(el);
    LB.el = el;
    el.addEventListener("click", (e) => {
      if (e.target === el) closeLightbox();
    });
    $(".lightbox__close", el).addEventListener("click", closeLightbox);
    $(".lightbox__prev", el).addEventListener("click", () => step(-1));
    $(".lightbox__next", el).addEventListener("click", () => step(1));
    document.addEventListener("keydown", (e) => {
      if (!el.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "Tab") {
        const f = $$("button", el);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    // swipe
    let x0 = null;
    el.addEventListener("pointerdown", (e) => (x0 = e.clientX));
    el.addEventListener("pointerup", (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }

  function showLightbox() {
    const it = LB.items[LB.i];
    const img = $(".lightbox__frame img", LB.el);
    img.classList.remove("is-loaded");
    img.onload = () => img.classList.add("is-loaded");
    img.src = it.photo;
    img.alt = it.name || it.caption || "";
    $(".lightbox__name", LB.el).innerHTML = txt(it.name || it.caption || "");
    $(".lightbox__desc", LB.el).innerHTML = it.description ? txt(it.description) : "";
    $(".lightbox__count", LB.el).textContent = `${LB.i + 1} / ${LB.items.length}`;
    const multi = LB.items.length > 1;
    $$(".lightbox__nav", LB.el).forEach((b) => (b.hidden = !multi));
  }

  function openLightbox(items, i) {
    buildLightbox();
    LB.items = items;
    LB.i = i;
    LB.lastFocus = document.activeElement;
    showLightbox();
    LB.el.classList.add("is-open");
    document.documentElement.classList.add("no-scroll");
    $(".lightbox__close", LB.el).focus();
  }
  function closeLightbox() {
    LB.el.classList.remove("is-open");
    document.documentElement.classList.remove("no-scroll");
    if (LB.lastFocus) LB.lastFocus.focus();
  }
  function step(d) {
    LB.i = (LB.i + d + LB.items.length) % LB.items.length;
    showLightbox();
  }

  /* ---------- collection (home) ---------- */
  function renderCollection() {
    const grid = $("[data-render='collection']");
    if (!grid) return;
    const products = SITE.products || [];
    const cats = SITE.categories || [];
    const filters = $("[data-render='filters']");
    let current = "All";

    if (filters) {
      const count = (c) => products.filter((p) => c === "All" || p.category === c).length;
      filters.innerHTML = ["All", ...cats]
        .filter((c) => count(c) > 0)
        .map(
          (c) =>
            `<button class="chip" type="button" data-cat="${esc(c)}" aria-pressed="${c === "All"}">${esc(c)}<span class="chip__n">${count(c)}</span></button>`
        )
        .join("");
      filters.addEventListener("click", (e) => {
        const b = e.target.closest(".chip");
        if (!b) return;
        current = b.dataset.cat;
        $$(".chip", filters).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        draw();
      });
    }

    function draw() {
      const list = products.filter((p) => current === "All" || p.category === current);
      grid.innerHTML = list
        .map(
          (p, i) => `
        <li class="tag" data-reveal style="--i:${i % 8}">
          <button class="tag__btn" type="button" data-i="${i}" aria-label="View larger photo of ${esc(p.name)}">
            <span class="tag__loop" aria-hidden="true"></span>
            <span class="tag__hole" aria-hidden="true"></span>
            <span class="tag__photo"><img src="${esc(p.thumb || p.photo)}" alt="${esc(p.name)}" loading="lazy" width="640" height="640"></span>
            <span class="tag__cat">${esc(p.category)}</span>
            <span class="tag__name">${txt(p.name)}</span>
            <span class="tag__desc">${txt(p.description || "")}</span>
          </button>
        </li>`
        )
        .join("");
      $$(".tag__btn", grid).forEach((b) =>
        b.addEventListener("click", () => openLightbox(list, Number(b.dataset.i)))
      );
      reveal(grid);
    }
    draw();
  }

  /* ---------- gallery ---------- */
  function renderGallery() {
    const wall = $("[data-render='gallery']");
    if (!wall) return;
    const items = [
      ...(SITE.products || []).map((p) => ({ ...p, caption: p.name })),
      ...(SITE.galleryExtras || []).map((g) => ({ ...g, name: g.caption }))
    ];
    wall.innerHTML =
      items
        .map(
          (it, i) => `
      <li class="tile${it.featured ? " tile--big" : ""}" data-reveal style="--i:${i % 6}">
        <button type="button" data-i="${i}" aria-label="Open ${esc(it.name || "photo")}">
          <img src="${esc(it.featured ? it.photo : it.thumb || it.photo)}" alt="${esc(it.name || "")}" loading="lazy">
          <span class="tile__cap">${esc(it.name || "")}</span>
        </button>
      </li>`
        )
        .join("") +
      `<li class="tile tile--soon" data-reveal>
        <div class="tile__soon">
          <img src="images/brand/doodle-ring.png" alt="" aria-hidden="true">
          <p>${txt("TODO: Event and behind-the-scenes photos coming soon")}</p>
        </div>
      </li>`;
    $$(".tile button", wall).forEach((b) =>
      b.addEventListener("click", () => openLightbox(items, Number(b.dataset.i)))
    );
    reveal(wall);
  }

  /* ---------- events ---------- */
  function splitEvents() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const evs = (SITE.events || []).map((e) => ({ ...e, _d: parseDate(e.date) }));
    const upcoming = evs
      .filter((e) => !e._d || e._d >= today)
      .sort((a, b) => (a._d && b._d ? a._d - b._d : a._d ? -1 : b._d ? 1 : 0));
    const past = evs.filter((e) => e._d && e._d < today).sort((a, b) => b._d - a._d);
    return { upcoming, past };
  }

  function dateBadge(e) {
    if (!e._d) {
      return `<div class="date-badge date-badge--tba"><span class="date-badge__m">date</span><span class="date-badge__d">TBA</span></div>`;
    }
    return `<div class="date-badge"><span class="date-badge__m">${MONTHS[e._d.getMonth()]}</span><span class="date-badge__d">${e._d.getDate()}</span><span class="date-badge__w">${DAYS[e._d.getDay()]}</span></div>`;
  }

  function timeLine(e) {
    const s = fmtTime(e.startTime), en = fmtTime(e.endTime);
    if (s && en) return `${s} to ${en}`;
    return s || "";
  }

  function ics(e) {
    const pad = (n) => String(n).padStart(2, "0");
    const d = e._d;
    const ymd = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    const t = (x) => x.replace(":", "") + "00";
    const clean = (s) => (isTodo(s) ? "" : String(s || "")).replace(/[,;\\]/g, (m) => "\\" + m).replace(/\n/g, "\\n");
    const lines = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Handcrafted by Heaven//Events//EN", "BEGIN:VEVENT",
      `UID:${ymd}-${Math.random().toString(36).slice(2)}@handcraftedbyheaven.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`
    ];
    if (e.startTime) {
      lines.push(`DTSTART:${ymd}T${t(e.startTime)}`);
      lines.push(`DTEND:${ymd}T${t(e.endTime || e.startTime)}`);
    } else {
      const n = new Date(d); n.setDate(n.getDate() + 1);
      lines.push(`DTSTART;VALUE=DATE:${ymd}`, `DTEND;VALUE=DATE:${n.getFullYear()}${pad(n.getMonth() + 1)}${pad(n.getDate())}`);
    }
    lines.push(`SUMMARY:${clean(e.title)} (Handcrafted by Heaven)`);
    lines.push(`LOCATION:${clean([e.venue, e.address].filter((x) => !isBlank(x)).join(", "))}`);
    lines.push(`DESCRIPTION:${clean(e.description)}`);
    lines.push("END:VEVENT", "END:VCALENDAR");
    return "data:text/calendar;charset=utf-8," + encodeURIComponent(lines.join("\r\n"));
  }

  function eventCard(e, i, isPast) {
    const time = timeLine(e);
    const mapHref = !isBlank(e.mapUrl)
      ? e.mapUrl
      : !isBlank(e.address)
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([e.venue, e.address].filter((x) => !isBlank(x)).join(", "))}`
      : "";
    const actions = [
      mapHref ? `<a class="btn btn--small" href="${esc(mapHref)}" target="_blank" rel="noopener">${ICON.pin}Directions</a>` : "",
      e._d && !isPast ? `<a class="btn btn--small btn--ghost" href="${ics(e)}" download="handcrafted-by-heaven-event.ics">${ICON.cal}Add to calendar</a>` : "",
      !isBlank(e.link) ? `<a class="btn btn--small btn--ghost" href="${esc(e.link)}" target="_blank" rel="noopener">${ICON.link}Event page</a>` : ""
    ].join("");
    return `
      <li class="event${isPast ? " event--past" : ""}" data-reveal style="--i:${i}">
        ${dateBadge(e)}
        <div class="event__body">
          <h3 class="event__title">${txt(e.title)}</h3>
          <ul class="event__meta">
            <li>${ICON.pin}<span><strong>${txt(e.venue)}</strong>${e.address ? `<br>${txt(e.address)}` : ""}</span></li>
            <li>${ICON.clock}<span>${time ? esc(time) : e._d ? "Time TBA" : "Date and time TBA"}</span></li>
          </ul>
          ${e.description ? `<p class="event__desc">${txt(e.description)}</p>` : ""}
          ${actions ? `<div class="event__actions">${actions}</div>` : ""}
        </div>
      </li>`;
  }

  function renderEvents() {
    const up = $("[data-render='events']");
    const pastEl = $("[data-render='past-events']");
    const next = $("[data-render='next-event']");
    if (!up && !next && !pastEl) return;
    const { upcoming, past } = splitEvents();

    if (up) {
      up.innerHTML = upcoming.length
        ? upcoming.map((e, i) => eventCard(e, i, false)).join("")
        : `<li class="event event--empty" data-reveal><p>No events on the calendar right now. Follow along on Instagram to hear about the next one!</p></li>`;
      reveal(up);
    }
    if (pastEl) {
      const wrap = pastEl.closest("[data-past-wrap]");
      if (past.length) {
        pastEl.innerHTML = past.map((e, i) => eventCard(e, i, true)).join("");
        reveal(pastEl);
      } else if (wrap) {
        wrap.hidden = true;
      }
    }
    if (next) {
      const e = upcoming[0];
      if (!e) {
        next.innerHTML = `<div class="next-event__body"><p class="kicker">next pop-up</p><h3 class="next-event__title">Nothing scheduled just yet</h3><p class="next-event__where">Check back soon or follow along on Instagram.</p></div>`;
        return;
      }
      const time = timeLine(e);
      next.innerHTML = `
        ${dateBadge(e)}
        <div class="next-event__body">
          <p class="kicker">catch me next at</p>
          <h3 class="next-event__title">${txt(e.title)}</h3>
          <p class="next-event__where">${ICON.pin}<span>${txt(e.venue)}${time ? ` &middot; ${esc(time)}` : ""}</span></p>
        </div>
        <a class="btn" href="events.html">All events ${ICON.arrow}</a>`;
    }
  }

  /* ---------- about ---------- */
  function renderAbout() {
    const A = SITE.about || {};
    $$("[data-about='name']").forEach((el) => (el.innerHTML = txt(A.name || "")));
    $$("[data-about='tagline']").forEach((el) => (el.innerHTML = txt(A.tagline || "")));
    $$("[data-about='photo']").forEach((img) => {
      if (A.photo) img.src = A.photo;
    });
    const bio = $("[data-render='bio']");
    if (bio) bio.innerHTML = (A.bio || []).map((p) => `<p>${txt(p)}</p>`).join("");
    const teaser = $("[data-render='bio-teaser']");
    if (teaser) teaser.innerHTML = txt((A.bio || [])[0] || "");
    const facts = $("[data-render='facts']");
    if (facts) {
      facts.innerHTML = (A.facts || [])
        .map(
          (f, i) => `<li class="fact" data-reveal style="--i:${i}"><span class="fact__label">${esc(f.label)}</span><span class="fact__value">${txt(f.value)}</span></li>`
        )
        .join("");
      reveal(facts);
    }
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    wireNav();
    renderCollection();
    renderGallery();
    renderEvents();
    renderAbout();
    wireLinks();
    reveal();
    requestAnimationFrame(() => document.body.classList.add("is-loaded"));
  });
})();
