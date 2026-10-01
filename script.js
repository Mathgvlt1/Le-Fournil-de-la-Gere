// =========================================================
// Le Fournil de la Gère — interactions
// =========================================================

// ---------- Navigation : fond au scroll + menu mobile ----------
const nav = document.getElementById("nav");
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

burger.addEventListener("click", () => {
  const open = nav.classList.toggle("menu-open");
  burger.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("menu-open");
    burger.setAttribute("aria-expanded", false);
    document.body.style.overflow = "";
  })
);

// ---------- Apparition au scroll ----------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.children].filter((el) => el.classList.contains("reveal"));
      const delay = Math.max(0, siblings.indexOf(entry.target)) * 90;
      setTimeout(() => entry.target.classList.add("is-visible"), Math.min(delay, 450));
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Compteurs animés ----------
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const start = performance.now();
      const duration = 1600;
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

// ---------- Filtres des produits ----------
const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".card");
tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");
    const filter = tab.dataset.filter;
    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.cat === filter;
      card.classList.toggle("is-hidden", !show);
      if (show) {
        card.classList.remove("is-visible");
        requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add("is-visible")));
      }
    });
  })
);

// ---------- Horaires : ouvert / fermé en temps réel ----------
const HOURS = {
  0: [7 * 60, 13 * 60],          // dimanche
  1: null,                       // lundi : fermé
  2: [6.5 * 60, 19.5 * 60],
  3: [6.5 * 60, 19.5 * 60],
  4: [6.5 * 60, 19.5 * 60],
  5: [6.5 * 60, 19.5 * 60],
  6: [6.5 * 60, 19.5 * 60],
};
const fmt = (m) => `${Math.floor(m / 60)}h${String(m % 60).padStart(2, "0")}`;

function updateStatus() {
  const now = new Date();
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = HOURS[day];
  const status = document.getElementById("status");
  const text = document.getElementById("statusText");

  document.querySelectorAll("#hours tr").forEach((tr) => tr.classList.toggle("is-today", +tr.dataset.day === day));

  if (today && mins >= today[0] && mins < today[1]) {
    status.className = "status reveal is-visible is-open";
    text.textContent = `Ouvert maintenant · jusqu'à ${fmt(today[1])}`;
    return;
  }
  // Prochaine ouverture
  let label = "";
  if (today && mins < today[0]) label = `aujourd'hui à ${fmt(today[0])}`;
  else {
    const names = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      if (HOURS[d]) { label = `${i === 1 ? "demain" : names[d]} à ${fmt(HOURS[d][0])}`; break; }
    }
  }
  status.className = "status reveal is-visible is-closed";
  text.textContent = `Fermé · ouvre ${label}`;
}
updateStatus();
setInterval(updateStatus, 60_000);

// ---------- Slider d'avis ----------
const track = document.getElementById("sliderTrack");
const dotsWrap = document.getElementById("sliderDots");
const slides = track.children.length;
let current = 0;
let timer;

for (let i = 0; i < slides; i++) {
  const b = document.createElement("button");
  b.setAttribute("aria-label", `Avis ${i + 1}`);
  b.addEventListener("click", () => { goTo(i); restart(); });
  dotsWrap.appendChild(b);
}
function goTo(i) {
  current = (i + slides) % slides;
  track.style.transform = `translateX(-${current * 100}%)`;
  [...dotsWrap.children].forEach((d, idx) => d.classList.toggle("is-active", idx === current));
}
function restart() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 5500); }
goTo(0);
restart();

// ---------- Lightbox galerie ----------
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
document.querySelectorAll(".g img").forEach((img) =>
  img.addEventListener("click", () => {
    lbImg.src = img.src.replace(/w=\d+/, "w=1800");
    lbImg.alt = img.alt;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  })
);
const closeLb = () => { lightbox.classList.remove("is-open"); lightbox.setAttribute("aria-hidden", "true"); };
lightbox.addEventListener("click", (e) => { if (e.target !== lbImg) closeLb(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });

// ---------- Parallaxe léger du bandeau ----------
const bannerBg = document.querySelector(".banner__bg");
if (bannerBg && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("scroll", () => {
    const rect = bannerBg.parentElement.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const progress = (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight;
    bannerBg.style.transform = `translateY(${progress * -60}px)`;
  }, { passive: true });
}

// ---------- Formulaire (démo, sans envoi réel) ----------
const form = document.getElementById("form");
const msg = document.getElementById("formMsg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ok = true;
  form.querySelectorAll("[required]").forEach((f) => {
    const valid = f.value.trim() && (f.type !== "email" || /^\S+@\S+\.\S+$/.test(f.value));
    f.classList.toggle("is-invalid", !valid);
    if (!valid) ok = false;
  });
  if (!ok) {
    msg.className = "form__msg err";
    msg.textContent = "Merci de remplir les champs obligatoires.";
    return;
  }
  const btn = form.querySelector("button");
  btn.textContent = "Envoi…";
  btn.disabled = true;
  setTimeout(() => {
    form.reset();
    btn.textContent = "Envoyer";
    btn.disabled = false;
    msg.className = "form__msg ok";
    msg.textContent = "Merci ! Nous vous répondons dans la journée. 🥐";
  }, 900);
});

document.getElementById("year").textContent = new Date().getFullYear();
