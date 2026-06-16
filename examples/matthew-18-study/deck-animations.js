(function () {
  if (!window.gsap) {
    return;
  }

  const mm = gsap.matchMedia();
  const animatedSlides = new WeakMap();

  gsap.defaults({
    duration: 0.52,
    ease: "power2.out",
    overwrite: "auto"
  });

  function animateSlide(slide, reduceMotion) {
    if (!slide || reduceMotion) {
      return;
    }

    const previous = animatedSlides.get(slide);
    if (previous) {
      previous.kill();
    }

    const tl = gsap.timeline({ defaults: { duration: 0.52, ease: "power2.out" } });
    const title = slide.querySelector(".h1, .h2");
    const scripture = slide.querySelector(".scripture-box");
    const points = slide.querySelectorAll(".answer-point, .concept-box");
    const cue = slide.querySelector(".discussion-cue");

    if (title) {
      tl.fromTo(title, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0 }, 0);
    }

    if (scripture) {
      tl.fromTo(scripture, { autoAlpha: 0, y: 18, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1 }, title ? "<0.18" : 0);
    }

    if (points.length) {
      tl.fromTo(points, { autoAlpha: 0, y: 20, scale: 0.985 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.08 }, scripture ? ">-0.08" : "<0.16");
    }

    if (cue) {
      tl.fromTo(cue, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0 }, ">-0.05");
    }

    animatedSlides.set(slide, tl);
  }

  function currentSlide() {
    return document.querySelector(".slide.is-active") || document.querySelector(".slide");
  }

  mm.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    (context) => {
      const reduceMotion = context.conditions.reduceMotion;

      if (reduceMotion) {
        gsap.set(".slide *", { clearProps: "all" });
        return;
      }

      const deck = document.querySelector(".deck");
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.attributeName === "class" && mutation.target.classList.contains("is-active")) {
            animateSlide(mutation.target, false);
          }
        }
      });

      if (deck) {
        deck.querySelectorAll(".slide").forEach((slide) => observer.observe(slide, { attributes: true, attributeFilter: ["class"] }));
      }

      requestAnimationFrame(() => animateSlide(currentSlide(), false));

      return () => observer.disconnect();
    }
  );
})();

