// TODO: Sizing
// - when crossing below threshold remove css
// - when crossing above threshold add css
((win) => {
  const defaultSettings = Object.freeze({
    threshold: 847,
    timeLineClass: ".timeline",
    timeLineEntryClass: ".timeline-entry",
    entryOffset: parseInt(getComputedStyle(document.body).fontSize, 10) * 4,
  });

  let settings = {};

  // const destroyTimeline = () => {
  //   document.querySelectorAll(settings.timeLineClass).forEach((timeline) => {
  //     timeline
  //       .querySelectorAll(settings.timeLineEntryClass)
  //       .forEach((entry) => entry.removeAttribute("style"));
  //   });
  // };

  const createTimeline = () => {
    document.querySelectorAll(settings.timeLineClass).forEach((timeline) => {
      // if (timeline.offsetWidth > settings.threshold) {}
      const entries = timeline.querySelectorAll(settings.timeLineEntryClass);

      let maxOffset = 0;
      let nextPostion =
        entries[0].getBoundingClientRect().top + settings.entryOffset;

      for (let i = 1, ii = entries.length; i < ii; i++) {
        const { height, top } = entries[i].getBoundingClientRect();
        maxOffset = (top - nextPostion) * -1;

        entries[i].setAttribute(
          "style",
          `transform: translate3d(0, ${maxOffset}px, 0);`,
        );

        nextPostion = Math.max(
          entries[i - 1].getBoundingClientRect().bottom + settings.entryOffset,
          nextPostion + height / 2,
        );
      }

      timeline.setAttribute(
        "style",
        `height: ${timeline.getBoundingClientRect().height + maxOffset}px`,
      );
    });
  };

  const init = (customSettings = {}) => {
    settings = { ...defaultSettings, ...customSettings };

    if (timeline.offsetWidth > settings.threshold) {
      createTimeline();
    }

    // document.addEventListener("resize:end", () => {
    //   setTimeout(createTimeline, 50);
    // });

    // document.addEventListener("resize:start", () => {
    //   destroyTimeline();
    // });
  };

  win.THEFRI.registerPlugin("timeline", { init });
})(window);
