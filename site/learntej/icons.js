
(function () {
  function unescapeIcons() {
    document.querySelectorAll('span, div').forEach(function (el) {
      if (el.children.length) return;
      var t = el.textContent;
      if (t && t.indexOf('<svg viewBox="0 0 24 24"') === 0) {
        el.innerHTML = t;
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', unescapeIcons);
  } else {
    unescapeIcons();
  }
  new MutationObserver(unescapeIcons).observe(
    document.documentElement, { childList: true, subtree: true }
  );
})();
