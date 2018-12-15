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
let hourDeg = ((hour * 30) + (min * 0.5) + 90) + "deg";
let minDeg = ((min * 6) + 90) + "deg";
let secDeg = ((sec * 6) + 90) + "deg";
hourHand.style.transform = `rotate(${hourDeg})`;
minHand.style.transform = `rotate(${minDeg})`;
secHand.style.transform = `rotate(${secDeg})`;

// function to move hands:
function moveHands () {
  if (sec > 60) {
      sec -= 60;
      min++;
      minDeg = ((min * 6) + 90) + "deg";
      minHand.style.transform = `rotate(${minDeg})`;
      hourDeg = ((hour * 30) + (min * 0.5) + 90) + "deg";
      hourHand.style.transform = `rotate(${hourDeg})`;
      if (min > 60) {
        min -= 60;
        hour++;
      };
  };
  sec++;
  secDeg = ((sec * 6) + 90) + "deg";
  secHand.style.transform = `rotate(${secDeg})`;
}

setInterval(moveHands, 1000);
