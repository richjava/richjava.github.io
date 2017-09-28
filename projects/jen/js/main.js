var screens = [
    { descriptor: 'Great listener', bgColor: '#DD2C00' },
    { descriptor: 'Wise', bgColor: '#FFAB00' },
    { descriptor: 'Easy to talk to', bgColor: '#AEEA00' },
    { descriptor: 'Warm', bgColor: '#FF6D00' },
    { descriptor: 'Authentic', bgColor: '#00B8D4' },
    { descriptor: 'Kind', bgColor: '#2962FF' },
    { descriptor: 'Supportive', bgColor: '#00BFA5' },
    { descriptor: 'Calm', bgColor: '#6200EA' },
    { descriptor: 'Caring', bgColor: '#00C853' },
    { descriptor: 'Natural leader', bgColor: '#FFD600' },
    { descriptor: 'Gentle strength', bgColor: '#64DD17' },
    { descriptor: 'Clever', bgColor: '#C51162' },
    { descriptor: 'Intelligent', bgColor: '#0091EA' },
    { descriptor: 'Chilled out coaching style', bgColor: '#AA00FF' }
];
var descriptorEl = document.querySelector('.descriptor');
var interval = 3000;
var intervalId;
var index = 0;
descriptorEl.addEventListener('click', function () {
    console.log('interval = ' + interval)
    if (interval === 3000) {
        document.body.style.transition = 'none';
        interval = 200;
    } else {
        document.body.style.transition = 'background-color 500ms linear';
        interval = 3000;
    }
    clearInterval(intervalId);
    start(interval);
});

function changeScreen() {
    descriptorEl.innerHTML = screens[index].descriptor;
    document.body.style.backgroundColor = screens[index].bgColor;
    if (index === screens.length - 1) {
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

start(interval);
changeScreen();

//register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}