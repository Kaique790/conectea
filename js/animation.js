gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

function loading() {
  setTimeout(() => {
    document.getElementsByClassName("box-load")[0].style.display = "none";
    document.getElementById("smooth-wrapper").style.display = "block";

    initGSAP();
  }, 0);
}

function initGSAP() {
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
      },
    );
  }

  // Animate titles
  {
    gsap.utils.toArray(".chars-text").forEach((text) => {
      let split = new SplitText(text, {
        type: "words",
      });

      gsap.from(split.words, {
        y: -100,
        opacity: 0,
        rotation: "random(-80, 80)",
        duration: 0.7,
        ease: "back.out(1.7)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
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
        },
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
          },
        },
      );
    });
  }

  // Animate progress anel
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

  // Animate parallax text in about section
  {
    const spans = gsap.utils.toArray(".bg-text span");

    gsap.to(spans, {
      x: (i) => (i % 2 === 0 ? -200 : 200),
      ease: "power2.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
        end: "bottom bottom",
        scrub: true,
      },
    });

    const section = document.getElementById("about");
    const text = document.querySelector(".absolute-wrapper");

    const maxY = section.offsetHeight - window.innerHeight;

    gsap.to(text, {
      y: maxY,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }

  // Animate feature cards
  {
    const featureCards = document.querySelectorAll(".app-feature-card");

    featureCards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          x: 1000,
          opacity: 0,

          rotate: -95,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,

          duration: 1.5,
          ease: "elastic.out(1,0.5)",

          scrollTrigger: {
            start: "top center",
            trigger: card,
          },
        },
      );
    });
  }

  // Animate depoiments cards
  {
    const depoimentCard = document.querySelectorAll(".depoiment-card");

    depoimentCard.forEach((card) => {
      gsap.fromTo(
        card,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,

          duration: 1.5,
          ease: "elastic.out(1,0.5)",

          scrollTrigger: {
            toggleActions: "play reverse play reverse",
            trigger: card,
          },
        },
      );
    });
  }

  // Animate parallax text in cta section
  {
    const ctaTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#cta",
        start: "top-=100", // começa assim que entra na tela
        end: "+=500",
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    // Texto de fundo (fromTo = garante que aparece)
    ctaTimeline.fromTo(
      ".bg-text span",
      {
        x: 0,
        opacity: 1,
      },
      {
        x: (i) => (i % 2 === 0 ? 100 : -100),
        opacity: 0,
        ease: "none",
      },
      0.6,
    );

    // Movimento vertical do texto de fundo
    ctaTimeline.fromTo(
      ".absolute-wrapper",
      {
        y: 0,
      },
      {
        y: "80%",
        ease: "none",
      },
      0,
    );

    // Conteúdo principal
    ctaTimeline.fromTo(
      "#cta-content",
      {
        scale: 0,
        opacity: 0,
      },
      {
        y: "80%",
        scale: 1,
        opacity: 1,
        ease: "power2.out",
      },
      1,
    );
  }
}
