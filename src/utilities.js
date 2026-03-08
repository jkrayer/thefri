// Utilities ---------- to move
((win) => {
  const debounce =
    (interval = 20) =>
    (fn) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), interval);
      };
    };

  win.THEFRI.registerPlugin("utilities", { debounce });
})(window);
