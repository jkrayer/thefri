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
  const closeOnClick = (e) => {
    if (
      e.target.tagName === "A" &&
      e.target.getAttribute("href").startsWith("#")
    ) {
      const menu = e.target.closest("[data-is]"); // remove open here

      document
        .querySelector(`[data-opens="${menu.dataset.is}"]`)
        .removeAttribute("data-open");

      menu.classList.remove("open");
      menu.removeEventListener("click", closeOnClick);
    }
  };

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
            menu.removeEventListener("click", closeOnClick);
          } else {
            event.target.setAttribute("data-open", true);
            menu.classList.add("open");
            menu.addEventListener("click", closeOnClick);
          }
        }
      });
    });
  };

  win.THEFRI.registerPlugin("navigation", { init });
})(window);
