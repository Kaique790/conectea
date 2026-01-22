const mobileNavbar = document.getElementById("mobile-navbar");
const mobileOverlay = document.getElementById("mobile-overlay");
const header = document.getElementById("header");

let lastScrollY = window.scrollY;

function toggleNavbar() {
  mobileNavbar.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
}

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollY && currentScroll > 80) {
    header.classList.add("hide");
    mobileOverlay.classList.remove("active");
    mobileNavbar.classList.remove("active");
  } else {
    header.classList.remove("hide");
  }

  lastScrollY = currentScroll;
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const triggerPoint = window.innerHeight; // 100vh

  if (scrollY > triggerPoint) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

const sliders = document.querySelectorAll(".scroll-list");

sliders.forEach((slider) => {
  let startX;
  let scrollLeft;
  let isDown = false;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;

    startX = e.pageX - slider.scrollLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const jump = (x - startX) * 2;

    slider.scrollLeft = scrollLeft - jump;
  });
});

function loading() {
  document.getElementsByClassName("box-load")[0].style.display = "none";
  document.getElementById("smooth-wrapper").style.display = "block";
}
