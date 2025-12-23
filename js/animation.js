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
});
