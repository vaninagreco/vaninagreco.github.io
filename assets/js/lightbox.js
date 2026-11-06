/* Click an image in a case study to see it full screen. Click the image again to toggle fit / full size.
   Without JavaScript the image stays a plain link (wide figures) or a normal picture. */
(function () {
  var imgs = document.querySelectorAll('.figure img, .cover-wide img');
  if (!imgs.length || typeof HTMLDialogElement === 'undefined') return;

  var dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Image viewer');
  dlg.innerHTML =
    '<button type="button" class="lb-close" aria-label="Close image">×</button>' +
    '<div class="lb-stage"><img class="lb-img" alt=""></div>' +
    '<p class="lb-cap"></p>';
  document.body.appendChild(dlg);

  var stage = dlg.querySelector('.lb-stage');
  var big = dlg.querySelector('.lb-img');
  var cap = dlg.querySelector('.lb-cap');
  var opener = null;

  function setFit(fit) {
    dlg.classList.toggle('is-full', !fit);
    big.setAttribute('aria-label', fit ? 'Zoom to full size' : 'Fit to screen');
  }

  function open(img, trigger) {
    var fig = img.closest('figure');
    var c = fig && fig.querySelector('figcaption');
    opener = trigger;
    big.src = img.getAttribute('data-full') || img.currentSrc || img.src;
    big.alt = img.alt;
    cap.textContent = c ? c.textContent : '';
    stage.scrollTop = 0; stage.scrollLeft = 0;
    setFit(true);
    dlg.showModal();
  }

  imgs.forEach(function (img) {
    var link = img.closest('a.zoom');
    var trigger = link;
    if (!link) {
      trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'zoom';
      trigger.setAttribute('aria-label', 'View image full screen: ' + img.alt);
      var node = img.closest('picture') || img;
      node.parentNode.insertBefore(trigger, node);
      trigger.appendChild(node);
    } else {
      link.setAttribute('aria-label', 'View image full screen: ' + img.alt);
      link.removeAttribute('target');
    }
    trigger.addEventListener('click', function (e) { e.preventDefault(); open(img, trigger); });
  });

  big.addEventListener('click', function () { setFit(dlg.classList.contains('is-full')); });
  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target === stage) dlg.close(); });
  dlg.addEventListener('close', function () { big.removeAttribute('src'); if (opener) opener.focus(); });
})();
