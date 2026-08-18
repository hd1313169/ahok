/* ============================================================
   Demo 導覽開合行為（僅供展示用）
   ============================================================ */

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.demo-nav');
    if (!nav) return;
    var toggle = nav.querySelector('.demo-nav__toggle');
    if (!toggle) return;

    function setOpen(open) {
      nav.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!nav.classList.contains('open'));
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  });
})();
