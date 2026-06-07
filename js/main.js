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

  // Tracklist — click to play via SoundCloud Widget API
  var scIframe = document.getElementById("sc-player");
  if (scIframe && window.SC) {
    var widget = SC.Widget(scIframe);
    var trackItems = Array.prototype.slice.call(document.querySelectorAll(".tracklist li"));
    widget.bind(SC.Widget.Events.READY, function () {
      trackItems.forEach(function (li, index) {
        li.addEventListener("click", function () {
          trackItems.forEach(function (el) { el.classList.remove("is-playing"); });
          li.classList.add("is-playing");
          widget.skip(index);
          widget.play();
        });
      });
      widget.bind(SC.Widget.Events.PLAY, function (e) {
        trackItems.forEach(function (el) { el.classList.remove("is-playing"); });
        if (trackItems[e.soundId] === undefined) {
          widget.getCurrentSoundIndex(function (i) {
            if (trackItems[i]) trackItems[i].classList.add("is-playing");
          });
        }
      });
    });
  }

  // Contact form — AJAX submit, show success in place
  var form = document.querySelector(".contact__form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]");
      btn.textContent = "Sending…";
      btn.disabled = true;
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (res.ok) {
          form.innerHTML = "<p class=\"contact__thanks\">Thanks — I’ll be in touch.</p>";
        } else {
          btn.textContent = "Send";
          btn.disabled = false;
          alert("Something went wrong. Please try again.");
        }
      }).catch(function () {
        btn.textContent = "Send";
        btn.disabled = false;
        alert("Something went wrong. Please try again.");
      });
    });
  }

  // Scroll-triggered reveals — fail-safe.
  var targets = Array.prototype.slice.call(
    document.querySelectorAll(
      ".section__label, .lede, .about__body, .music__head, .music__grid, .streaming, .press__item, .contact__line, .contact__form"
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
