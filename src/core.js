// CORE ----------
((win) => {
  const plugins = Object.create(null);

  const registerPlugin = (name, plugin) => {
    if (plugins[name]) {
      console.warn(`Plugin with name "${name}" is already registered.`);
      return;
    }
    plugins[name] = plugin;
  };

  win.addEventListener("DOMContentLoaded", () => {
    Object.values(plugins).forEach(({ init }) => {
      if (typeof init === "function") {
        init();
      }
    });
  });

  win.THEFRI = win.THEFRI || { registerPlugin };
})(window);

// Navigation ----------
((win) => {
  const init = () => {
    const burgers = document.querySelectorAll(".hamburger-menu");

    burgers.forEach((el) => {
      el.addEventListener("click", (event) => {
        const menu = document.querySelector(
          `[data-is="${event.target.dataset.opens}"]`,
        );

        if (menu !== null) {
          if (event.target.dataset.open) {
            event.target.removeAttribute("data-open");
            menu.classList.remove("open");
          } else {
            event.target.setAttribute("data-open", true);
            menu.classList.add("open");
          }
        }
      });
    });
  };

  win.THEFRI.registerPlugin("navigation", { init });
})(window);
