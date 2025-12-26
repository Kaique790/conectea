gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

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
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
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
        trigger: document.body,
        start: "top+=200 top",
        end: "bottom+=400 bottom",
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
            start: "top 75%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }
});
