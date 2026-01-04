gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

document.addEventListener("DOMContentLoaded", () => {
  // Animate line-1
  {
    const path = document.getElementById("line-1");
    const img = document.querySelector(".faixa-autismo");

    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const tl = gsap.timeline({ delay: 0.25 });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.out",
    });

    tl.fromTo(
      img,
      { opacity: 0, scale: 0.1 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      }
    );
  }

  // Animate signature
  {
    const path = document.getElementById("signature-path");
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 0.45,
    });

    // anima escrita
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 10,
      ease: "power1.inOut",
    });
  }

  // Animate hero-title
  {
    let split, animation;

    split = new SplitText(".chars-text", {
      type: "words",
    });

    animation && animation.revert();

    animation = gsap.from(split.words, {
      y: -100,
      opacity: 0,
      rotation: "random(-80, 80)",
      duration: 0.7,
      ease: "back",
      stagger: 0.15,
    });
  }

  // Animate line in about section
  {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
      smoothTouch: false,
    });

    gsap.ticker.lagSmoothing(0);

    const path = document.getElementById("scroll-line");
    const pathLength = path.getTotalLength();

    // estado inicial da linha
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    // animação ligada ao scroll
    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#about",
        start: "top-=100px center",
        end: "bottom center",
        scrub: true,
      },
    });
  }

  // boom animation
  {
    gsap.utils.toArray(".boom").forEach((topic) => {
      gsap.fromTo(
        topic,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: topic,
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }

  // boom animation with delay
  {
    gsap.utils.toArray(".boom-delay").forEach((topic) => {
      gsap.fromTo(
        topic,
        {
          opacity: 0,
          scale: 0.4,
        },
        {
          delay: 1,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: topic,
            start: "top 100%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }

  // Animate porgress anel
  {
    const circle = document.querySelectorAll(".fill");

    circle.forEach((circle) => {
      const radius = 50;
      const circumference = 2 * Math.PI * radius;

      const percent = Number(circle.dataset.perc);

      gsap.set(circle, {
        strokeDasharray: circumference,
        strokeDashoffset: circumference,
      });

      gsap.to(circle, {
        strokeDashoffset: circumference * (1 - percent / 100),
        duration: 3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: circle,
          start: "top 100%",
          toggleActions: "play reverse play reverse",
          once: false,
        },
      });
    });
  }
});
