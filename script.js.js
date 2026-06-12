/* ==========================================================
   Coffee Cove Hawaiʻi — script.js
   Static site JS. No frameworks. No external dependencies.
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ----------------------------------------------------------
     1. PLACEHOLDER MESSAGES
     ---------------------------------------------------------- */
  var MSG_REVIEW     = "Review links will be connected before launch.";
  var MSG_MERCH      = "Online checkout is coming soon. Please ask in shop for current merch availability.";
  var MSG_CONTACT    = "Thanks for reaching out. This form is not connected yet, so please call or message us on Instagram for now.";
  var MSG_CAREERS    = "Thanks for your interest. This form is not connected yet, so please call or message us on Instagram for now.";

  /* ----------------------------------------------------------
     2. CURRENT YEAR
     ---------------------------------------------------------- */
  document.querySelectorAll("[data-current-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ----------------------------------------------------------
     3. MOBILE NAVIGATION
     ---------------------------------------------------------- */
  var body       = document.body;
  var navToggle  = document.querySelector("[data-nav-toggle]");
  var primaryNav = document.querySelector("[data-primary-nav]");

  function setNavOpen(open) {
    if (!navToggle || !primaryNav) return;
    navToggle.classList.toggle("is-open", open);
    primaryNav.classList.toggle("is-open", open);
    body.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );
  }

  function closeNav() { setNavOpen(false); }

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      setNavOpen(!navToggle.classList.contains("is-open"));
    });

    // Close nav when any nav link is clicked
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    // Close nav on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    // Close nav on resize to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 980) closeNav();
    });
  }

  /* ----------------------------------------------------------
     4. ACTIVE NAV STATE
     Maps body[data-page] → the correct nav href
     ---------------------------------------------------------- */
  var pageFileMap = {
    home:     "index.html",
    menu:     "menu.html",
    reviews:  "reviews.html",
    merch:    "merch.html",
    visit:    "visit.html",
    careers:  "careers.html",
    contact:  "contact.html"
  };

  var currentFile = pageFileMap[body.dataset.page];
  if (currentFile) {
    document.querySelectorAll("[data-nav-link]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === currentFile) {
        link.classList.add("is-active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("is-active");
        link.removeAttribute("aria-current");
      }
    });
  }

  /* ----------------------------------------------------------
     5. SMOOTH SAME-PAGE ANCHOR SCROLLING
     Only handles href="#id" links that resolve to an element
     on the current page. Does NOT interfere with:
       - External links (http/https)
       - Page-to-page navigation (.html)
       - tel: links
       - mailto: links
       - Instagram / Google Maps / Apple Maps links
     ---------------------------------------------------------- */
  function isSamePageAnchor(link) {
    var href = link.getAttribute("href");
    if (!href) return false;
    if (!href.startsWith("#") || href === "#") return false;
    return !!document.querySelector(href);
  }

  function isReviewPlaceholder(link) {
    var href = link.getAttribute("href");
    if (href !== "#") return false;
    var text = (link.textContent || "").trim().toLowerCase();
    return (
      text.includes("google review") ||
      text.includes("google reviews") ||
      text.includes("yelp review")   ||
      text.includes("yelp reviews")  ||
      text.includes("leave a review")||
      text.includes("view reviews")
    );
  }

  function showInlineMessage(link, message) {
    var parent = link.parentElement;
    if (!parent) { alert(message); return; }
    var existing = parent.querySelector("[data-inline-message]");
    if (existing) { existing.textContent = message; return; }
    var msg = document.createElement("p");
    msg.dataset.inlineMessage = "true";
    msg.className = "form-status";
    msg.setAttribute("role", "status");
    msg.setAttribute("aria-live", "polite");
    msg.textContent = message;
    parent.appendChild(msg);
  }

  document.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (!href) return;

      if (href === "#") {
        if (isReviewPlaceholder(link)) {
          e.preventDefault();
          showInlineMessage(link, MSG_REVIEW);
        } else {
          e.preventDefault();
        }
        return;
      }

      if (isSamePageAnchor(link)) {
        e.preventDefault();
        var target = document.querySelector(href);
        var prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        target.scrollIntoView({
          behavior: prefersReduced ? "auto" : "smooth",
          block: "start"
        });
        closeNav();
        return;
      }
    });
  });

  /* ----------------------------------------------------------
     6. CONTACT FORM PLACEHOLDER
     ---------------------------------------------------------- */
  document.querySelectorAll("[data-contact-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = MSG_CONTACT;
      } else {
        alert(MSG_CONTACT);
      }
      form.reset();
    });
  });

  /* ----------------------------------------------------------
     7. CAREERS FORM PLACEHOLDER
     ---------------------------------------------------------- */
  document.querySelectorAll("[data-careers-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = MSG_CAREERS;
      } else {
        alert(MSG_CAREERS);
      }
      form.reset();
    });
  });

  /* ----------------------------------------------------------
     8. MERCH BUTTON PLACEHOLDER
     ---------------------------------------------------------- */
  document.querySelectorAll("[data-merch-button]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      alert(MSG_MERCH);
    });
  });

  /* ----------------------------------------------------------
     9. WEATHER & SUNRISE MODULE
     Source: Open-Meteo (no API key required)
     Coordinates: Hauula, Oʻahu — lat 21.61 / lng -157.91
     Always Fahrenheit. No Celsius. Graceful fallbacks.
     ---------------------------------------------------------- */
  var WEATHER_URL =
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=21.61" +
    "&longitude=-157.91" +
    "&current=temperature_2m,weather_code" +
    "&daily=sunrise" +
    "&temperature_unit=fahrenheit" +
    "&timezone=Pacific%2FHonolulu";

  var FALLBACK_WEATHER  = "Weather update coming soon";
  var FALLBACK_SUNRISE  = "Sunrise update coming soon";

  function weatherLabel(code) {
    code = Number(code);
    if ([0, 1].includes(code))                         return "sunny";
    if ([2].includes(code))                            return "partly cloudy";
    if ([3, 45, 48].includes(code))                    return "cloudy";
    if ([51, 53, 55, 56, 57, 61, 80].includes(code))  return "light rain";
    if ([63, 65, 66, 67, 81, 82].includes(code))       return "rain";
    if ([71,73,75,77,85,86,95,96,99].includes(code))   return "passing showers";
    return "";
  }

  function formatSunrise(raw) {
    if (!raw || typeof raw !== "string") return null;
    var timePart = raw.includes("T") ? raw.split("T")[1] : raw;
    var parts    = timePart.slice(0, 5).split(":");
    if (parts.length < 2) return null;
    var h   = parseInt(parts[0], 10);
    var min = parts[1];
    if (isNaN(h) || !min) return null;
    var period = h >= 12 ? "PM" : "AM";
    var h12    = h % 12 || 12;
    return h12 + ":" + min + " " + period;
  }

  function setWeather(text) {
    document.querySelectorAll("[data-weather-temp],[data-weather-summary]")
      .forEach(function (el) { el.textContent = text; });
  }

  function setSunrise(text) {
    document.querySelectorAll("[data-sunrise-time]")
      .forEach(function (el) { el.textContent = text; });
  }

  var hasWeatherEls =
    document.querySelector("[data-weather-temp]")  ||
    document.querySelector("[data-weather-summary]") ||
    document.querySelector("[data-sunrise-time]");

  if (hasWeatherEls) {
    var controller = new AbortController();
    var timeout    = setTimeout(function () { controller.abort(); }, 8000);

    fetch(WEATHER_URL, { signal: controller.signal })
      .then(function (res) {
        clearTimeout(timeout);
        if (!res.ok) throw new Error("Weather response not ok");
        return res.json();
      })
      .then(function (data) {
        var current = data && data.current ? data.current : null;
        var temp    = current && typeof current.temperature_2m === "number"
          ? Math.round(current.temperature_2m)
          : null;
        var label   = current ? weatherLabel(current.weather_code) : "";

        if (temp !== null) {
          var weatherText = label
            ? temp + "\u00B0F and " + label + " near Hauula"
            : temp + "\u00B0F near Hauula";
          setWeather(weatherText);
        } else {
          setWeather(FALLBACK_WEATHER);
        }

        var daily   = data && data.daily ? data.daily : null;
        var rawSun  = daily && Array.isArray(daily.sunrise) ? daily.sunrise[0] : null;
        var sunText = formatSunrise(rawSun);
        setSunrise(sunText || FALLBACK_SUNRISE);
      })
      .catch(function () {
        clearTimeout(timeout);
        setWeather(FALLBACK_WEATHER);
        setSunrise(FALLBACK_SUNRISE);
      });
  }

}); // end DOMContentLoaded
