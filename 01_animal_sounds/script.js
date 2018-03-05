const div = document.querySelectorAll(".key");
for (var i = 0; i < div.length; i++) {
  div[i].addEventListener("transitionend", function() {
    this.classList.remove("playing");
  });
};

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) {return};
  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
}

window.addEventListener("keydown", playSound);
