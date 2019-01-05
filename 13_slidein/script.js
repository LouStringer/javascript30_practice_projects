const nav = document.querySelector('nav');
const navHeight = nav.offsetHeight;
const image = document.querySelector('img');
let lastScrollY = 0;
const delta = 15;

function sildeNav() {
  if (Math.abs(lastScrollY - window.scrollY) > delta) {
    // scroll down
    if (scrollY > lastScrollY && window.scrollY > navHeight) {
      nav.classList.add("nav-up");
    }
    // scroll up
    else if (window.scrollY < lastScrollY) {
      nav.classList.remove("nav-up");
    }
   lastScrollY = window.scrollY
  }
}

function slideImage() {
  let fromPageTop = window.scrollY + window.innerHeight;
  const imageCentrePoint = image.offsetTop + (image.offsetHeight/2);
  if (fromPageTop > imageCentrePoint && window.scrollY < imageCentrePoint) {
    image.classList.add('slide-in');
  } else {
    image.classList.remove('slide-in');
  }
}

// Add event listener & debounce so not constantly checking for scroll
let didScroll = false;
window.addEventListener("scroll", () => didScroll = true)

setInterval(function() {
  if (didScroll) {
    sildeNav();
    slideImage();
    didScroll = false;
   }
}, 100)
