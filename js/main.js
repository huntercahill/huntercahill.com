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

  // Lyrics modal
  var lyricsData = [
    {
      num: "01",
      title: "Goddamn",
      lyrics: "Goddamn, why you like this?\nWhen I just need a friend\nSo caught up in what you wanna do\nThat you don't even ask how I've been\n\nGoddamn, do you see me?\nFeels like you look right through\nIt feels like all that I'm worth\nIs what I can do for you\n\nThere's more to life than your bottom line\nOr the lines that you draw in the sand\nYou made your bed and it's all in your head\nAnd there's always some big plan\n\nWho am I?\nThe worst of my kind\nAnd I'm so goddamn selfish\n\nGoddamn, you feel a weight\nAnd we all feel it, too\nWalls are closing in and the air is drawing thin\nMan, it ain't only happening to you\n\nGoddamn, who are we?\nAnd what do we really need?\nWe could life each other up and we could fill each other's cups\nIf not for all this fear and greed\n\nThere's more to life than your bottom line\nOr the lines that you draw in the sand\nYou made your bed and it's all in your head\nAnd there's always some big plan\n\nWho am I?\nThe worst of my kind?\nAm I so goddamn selfish?"
    },
    {
      num: "02",
      title: "Never Again",
      lyrics: "I've changed\nBut I didn't change\nThe way I wanted\nI say so many things\nBut I never say\nWhat I'm supposed to\n\nThere's a plan I'm just not keeping pace\nAnd I'm not quitting now 'cause I'm afraid to lose face\n\nYou're not letting me down, my friend\nYou're letting me drown, and I called you kin\nBut never again\nNever again\n\nYou've been 'round\nLong enough to know\nI don't put shit down\nI don't let things go\nI've been gaining weight\nI've been losing steam\nAnd I'm sinking fast\nI don't know what I need\n\nIf I could dance it'd be with so much grace\nInstead of dirt in my mouth and I've got egg on my face\n\nYou're not letting me down, my friend\nYou're letting me drown, and I called you kin\nBut never again\nNever again"
    },
    {
      num: "03",
      title: "Some Things You Don’t Know About Me",
      lyrics: "Slowly\nShe walks towards me\nAnd it makes my blood run cold\nShe don’t know me\nLike you know me\nAnd it’s irresistible\n\nI said bring it on\nTried to fight but I was high all night\nDidn’t sleep ‘til the break of dawn\n\nThere’s some things you don’t know about me\nYou know everything you need\nI do it for your sake\nI do it to feel safe\nTell you you’re the one\nBut I’m lying then, I’m lying then\nI do it for your sake\nI do it to feel safe\nTell you you’re the one\nBut I’m lying then, I’m lying then\n\nIn the summertime\nMoved to the city\nBoth of us in love\nEverything was easy\nBut seasons change\n\nWhat am I?\nWhat’d I give for it?\nEverything I love I end up destroying\nI’ve always been this way\n\nIt was dirty and it was cheap\nIt was perfectly suited for me\nYou see I need\n\nSome things you don’t know about me\nYou know everything you need\nI do it for your sake\nI do it to feel safe\nTell you you’re the one\nBut I’m lying then, I’m lying then\nI do it for your sake\nI do it to feel safe\nTell you you’re the one\nBut I’m lying then, I’m lying then"
    },
    {
      num: "04",
      title: "Laughable",
      lyrics: "Feeling laughable\nThis is getting old\nI've been a fool all along\nNow you want to know what is wrong\n\nCan't recognize my face\nContours have moved their place\nWhat kind of man am I\nThat bleeds and doesn't die\n\nWhen I go I know I'll go alone\nMake a place I'm coming home\nWhen I go I know I'll go alone\nThe day that I stop feeling\nIs the day that I have been waiting on\n\nThe taunting photograph\nFrozen in laugh\nThis is the curse of mine\nTo stare until I'm blind\n\nThe needles in my skin\nAre coming back again\nThis is the very last time\nAnd the last laugh will be mine\n\nWhen I go I know I'll go alone\nMake a place I'm coming home\nWhen I go I know I'll go alone\nThe day that I stop feeling\nIs the day that I have been waiting on"
    },
    {
      num: "05",
      title: "Trapped In The Walls",
      lyrics: "Oh my god, I've walked a million miles in my mind\nFeel so much older than my years identify\nLove, don't walk with me\nSome things you shouldn't see\n\nWhen I lay down\nIn the fertile ground\nI'll probably feel like a fool for all\nThe time I spent trapped in the walls\nI'll probably feel like a fool for this\nMy whole life spent trying to prove I exist\n\nI feel like an empty shell\nMy body spent my mind unwell\nI've seen more than my share\nI've stared and seen there's nothing there\n\nHow can I know myself?\nWhen I'm always trying to be somebody else\n\nWhen I lay down\nIn the fertile ground\nI'll probably feel like a fool for all\nThe time I spent trapped in the walls\nI'll probably feel like a fool for this\nMy whole life spent trying to prove I exist"
    },
    {
      num: "06",
      title: "Falling Down",
      lyrics: "It's easy falling down\nWhen down is the only way you're ever shown\nIt's easy being scared of everyone\nWhen you look at everyone and don't feel any love\n\nDrugs only can\nHide the evidence\nThat I'm not trying\nCan't sleep again\nTake some more medicine and pretend I'm dying\n\nYou dream in color I dream in gray\nAnd though the thoughts won't go away\nI tried to drown 'em out\nNothing to figure out\n\nStarted at age thirteen\nGetting high on gasoline\nIn my parents shed\nJust me and all the things they never said\n\nDrugs only can\nHide the evidence\nI'm not trying\nI start to feel again\nTake some more medicine\nAnd pretend I'm crying\n\nI feel the farthest farthest in\nCan't find the point where it begins\nIt goes on for miles\n\nI hope I don't pass it on\nTo the ones I love\nAnd please not my son\n\nDrugs only can\nHide the evidence\nI'm not trying\nYou on your jungle gym\nMe on my medicine\nBoth pretend we're flying"
    }
  ];

  var lyricsModal = document.getElementById("lyrics-modal");
  if (lyricsModal) {
    var lyricsNum     = document.getElementById("lyrics-modal-num");
    var lyricsTitle   = document.getElementById("lyrics-modal-title");
    var lyricsBody    = document.getElementById("lyrics-modal-body");
    var lyricsClose   = lyricsModal.querySelector(".lyrics-modal__close");
    var lyricsBackdrop = lyricsModal.querySelector(".lyrics-modal__backdrop");
    var lastFocused   = null;

    function openLyrics(index) {
      var d = lyricsData[index];
      if (!d) return;
      lyricsNum.textContent = d.num;
      lyricsTitle.textContent = d.title;
      lyricsBody.innerHTML = d.lyrics
        ? d.lyrics.split("\n\n").map(function (stanza) {
            return "<p>" + stanza.replace(/\n/g, "<br>") + "</p>";
          }).join("")
        : "<p>Lyrics coming soon.</p>";
      lyricsModal.classList.add("is-open");
      document.body.style.overflow = "hidden";
      lyricsClose.focus();
    }

    function closeLyrics() {
      lyricsModal.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    document.querySelectorAll(".track__lyrics-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        lastFocused = btn;
        openLyrics(parseInt(btn.closest("li").dataset.trackIndex, 10));
      });
    });

    lyricsClose.addEventListener("click", closeLyrics);
    lyricsBackdrop.addEventListener("click", closeLyrics);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lyricsModal.classList.contains("is-open")) closeLyrics();
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
