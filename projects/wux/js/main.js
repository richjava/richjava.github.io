var index;
var interval = 30000; //doodles change every 30 seconds
var intervalId;
var doodles = [];

var doodle = document.querySelector('#doodle');

var webComponentsSupported = ('registerElement' in document
  && 'import' in document.createElement('link')
  && 'content' in document.createElement('template'));
if (!webComponentsSupported) {
  doodle.style.visibility = "hidden";
}

function changeScreen() {
  doodle.innerHTML = doodles[index];
  if (index >= doodles.length - 1) {
    index = 0;
    return;
  }
  index++;
}

function start(interval) {
  intervalId = setInterval(function () {
    changeScreen();
  }, interval);
}

function getInterval() {
  return interval;
}

//kickoff
$.getJSON('json/doodles.json', function (data) {
  doodles = data.doodles;
  index = Math.floor(Math.random() * doodles.length - 1) + 1;
  start(interval);
  changeScreen();
});
