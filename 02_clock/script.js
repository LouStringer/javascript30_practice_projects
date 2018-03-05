// select hands:
const hourHand = document.querySelector(".hour");
const minHand = document.querySelector(".minute");
const secHand = document.querySelector(".second");

// Get current time:
var date = new Date();
var hour = date.getHours();
var min = date.getMinutes();
var sec = date.getSeconds();

// set initial hand positions:
let hourDeg = ((hour * 30) + 90) + "deg";
let minDeg = ((min * 6) + 90) + "deg";
let secDeg = ((sec * 6) + 90) + "deg";
hourHand.style.transform = `rotate(${hourDeg})`;
minHand.style.transform = `rotate(${minDeg})`;
secHand.style.transform = `rotate(${secDeg})`;

// functions to move hands:
function moveHourHand () {
  hour++;
  if (hour > 12) {
    hour = hour - 12;
  }
  hourDeg = ((hour * 30) + 90) + "deg";
  hourHand.style.transform = `rotate(${hourDeg})`;
}

function moveMinHand () {
  min++;
  if (min > 60) {
    min = min - 60;
  }
  minDeg = ((min * 6) + 90) + "deg";
  minHand.style.transform = `rotate(${minDeg})`;
}

function moveSecHand () {
  sec++;
  if (sec > 60) {
    sec = sec - 60;
  }
  secDeg = ((sec * 6) + 90) + "deg";
  secHand.style.transform = `rotate(${secDeg})`;
}

// set timers to move hands
setInterval(moveHourHand, 3600000);
setInterval(moveMinHand, 60000);
setInterval(moveSecHand, 1000);
