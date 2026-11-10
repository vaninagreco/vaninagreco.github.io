// Moves the nav highlight (aria-current) to the section being read.
(function () {
  var links = [].slice.call(document.querySelectorAll('.nav-link[href^="#"]'));
  var items = links.map(function (a) {
    return { a: a, el: document.querySelector(a.getAttribute('href')) };
  }).filter(function (i) { return i.el; });
  if (!items.length) return;
  var ticking = false;
  function update() {
    ticking = false;
    var y = window.scrollY + window.innerHeight * 0.35;
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    var current = items[0];
    items.forEach(function (i) {
      if (i.el.getBoundingClientRect().top + window.scrollY <= y) current = i;
    });
    if (atBottom) current = items[items.length - 1];
    items.forEach(function (i) {
      if (i === current) i.a.setAttribute('aria-current', 'location');
      else i.a.removeAttribute('aria-current');
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  links.forEach(function (a) { a.addEventListener('click', function () { setTimeout(update, 50); }); });
  update();
})();
