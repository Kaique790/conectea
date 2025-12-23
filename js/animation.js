gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

document.addEventListener("DOMContentLoaded", () => {
  // Animate line-1
  {
    const path = document.getElementById("line-1");

    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 5,
      ease: "power2.out",
    });
  }

  // Animate line-2
  {
    const path = document.getElementById("line-2");
    const img = document.querySelector(".faixa-autismo");

    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    const tl = gsap.timeline({ delay: 1.5 }); // espera 4s antes de começar tudo

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
      type: "chars",
    });

    animation = gsap.from(split.chars, {
      y: -60,
      opacity: 0,
      duration: 0.3,
      ease: "power4.out",
      stagger: 0.04,
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
        ease: "back.out(1.7)", // 👈 boom elástico
        scrollTrigger: {
          trigger: topic,
          start: "top 75%", // ~50% visível
          toggleActions: "play reverse play reverse",
        },
      }
    );
  });
});
