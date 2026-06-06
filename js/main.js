/* Hunter Cahill — interactions (vanilla, no dependencies) */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav: condense on scroll
  var nav = document.querySelector(".nav");
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll-triggered reveals — fail-safe.
  var targets = Array.prototype.slice.call(
    document.querySelectorAll(
      ".section__label, .lede, .about__body, .music__head, .music__grid, .streaming, .press__item, .contact__line, .contact .btn"
    )
  );
  targets.forEach(function (el) { el.classList.add("reveal-up"); });

  var revealAll = function () {
    targets.forEach(function (el) { el.classList.add("is-shown"); });
  };

  if ("IntersectionObserver" in window && targets.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-shown");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach(function (el) { io.observe(el); });
    // Safety net: never leave content hidden, whatever happens.
    setTimeout(revealAll, 2200);
  } else {
    revealAll();
  }
})();
