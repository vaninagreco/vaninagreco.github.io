/*
 * Custom analytics events for Umami Cloud (cookieless, no banner needed).
 *
 * Add data-analytics-event="event-name" to any link or button to track clicks.
 * Any other data-analytics-* attribute is sent as event data, for example
 * data-analytics-case-study="esg" is sent as { "case-study": "esg" }.
 *
 * We use our own attributes instead of data-umami-event so Umami never
 * intercepts the click. Links, downloads and mailto keep working exactly as
 * before, and if Umami is blocked or not loaded the click does nothing extra.
 */
(function () {
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('[data-analytics-event]') : null;
    if (!el || !window.umami || typeof window.umami.track !== 'function') return;

    var data = {};
    Object.keys(el.dataset).forEach(function (key) {
      if (key.indexOf('analytics') !== 0 || key === 'analyticsEvent') return;
      var name = key.slice('analytics'.length)
        .replace(/[A-Z]/g, function (c) { return '-' + c.toLowerCase(); })
        .replace(/^-/, '');
      data[name] = el.dataset[key];
    });

    try {
      window.umami.track(el.dataset.analyticsEvent, data);
    } catch (err) { /* never break the page for analytics */ }
  }, true);
})();
