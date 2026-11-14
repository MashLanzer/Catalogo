// Mash Lanzer — Store: scroll progress, marquee duplication, catalog filters.
(function () {
  // Duplicate marquee content so the -50% loop is seamless.
  var track = document.getElementById('marqueeTrack');
  if (track) track.innerHTML += track.innerHTML;

  // Scroll progress bar.
  var bar = document.getElementById('progress');
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Category filters: show matching cards, hide sections left empty.
  var chips = document.querySelectorAll('#filters .chip');
  var cards = document.querySelectorAll('.card[data-cat]');
  var sections = document.querySelectorAll('section[data-section]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('on'); });
      chip.classList.add('on');
      var f = chip.getAttribute('data-filter');
      cards.forEach(function (card) {
        card.classList.toggle('hide', f !== 'all' && card.getAttribute('data-cat') !== f);
      });
      sections.forEach(function (sec) {
        var any = sec.querySelector('.card:not(.hide)');
        sec.style.display = any ? '' : 'none';
      });
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    });
  });
})();
