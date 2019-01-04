const body = document.querySelector('body');
const player = document.querySelector('.player');
const video = document.querySelector('video');
const controlPanel = document.querySelector('.controls');
const progressBar = document.querySelector('.progress-bar');
const progressDone = document.querySelector('.progress-done');
const playButton = document.querySelector('.play-pause');
const sliders = document.querySelectorAll('input[type=range]');
const skipButtons = document.querySelectorAll('.skip');
const fullscreenButton = document.querySelector('.fullscreen');

const togglePlay = () => {
  video.paused ? video.play() : video.pause();
  video.paused ? playButton.innerHTML = '&#9658;' : playButton.innerHTML = '&#9616;&nbsp;&#9612';
}
playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

const updateProgressPlaying = () => {
  progressDone.style.setProperty('--done', `${(video.currentTime/video.duration)*100}%`);
};
video.addEventListener('timeupdate', updateProgressPlaying);

const jump = (event) => {
  const progressPoint = event.offsetX / progressBar.offsetWidth;
  video.currentTime = video.duration * progressPoint;
}
progressBar.addEventListener('click', jump);
let mouseDown = false;
progressBar.addEventListener('mousedown', () => mouseDown = true);
progressBar.addEventListener('mouseup', () => mouseDown = false);
progressBar.addEventListener('mousemove', (event) => mouseDown && jump(event));

const skip = (event) => {
  video.currentTime += parseInt(event.currentTarget.getAttribute('data-skip'));
  progressDone.style.setProperty('--done', `${(video.currentTime/video.duration)*100}%`);
}
skipButtons.forEach(button => button.addEventListener('click', skip));

const updateSliderValues = slider => {
  video[slider.name] = slider.value;
}
sliders.forEach(slider => {
  updateSliderValues(slider);
  slider.addEventListener('change', () => updateSliderValues(slider));
});

const toggleFullscreen = () => {
  player.classList.toggle('fullscreen-on');
}
fullscreenButton.addEventListener('click', toggleFullscreen)
