document.addEventListener("DOMContentLoaded", () => {
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
});
