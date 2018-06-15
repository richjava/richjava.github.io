var doodle = document.querySelector('#doodle');
var webComponentsSupported = ('registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template'));
if (!webComponentsSupported) {
    doodle.style.visibility = "hidden";
}
var interval = 60000;
var intervalId;
var doodles = [
    ``,
    `<css-doodle>
    :doodle {
        @grid: 8 / 100vmax;
      }
      
      transition: 2s @rand(.6s);
      border-radius: @pick(100% 0, 0 100%);
      
      will-change: transform;
      transform: scale(@rand(.25, 1.25));
      
      background: hsla(
        calc(240 - 6 * @row() * @col()),
        70%, 68%,
        @rand(.8)
      );
    </css-doodle>`,
    `<css-doodle>
    :doodle {
        @grid: 7 / 100vmax;
      }
      
      @place-cell: center;
      @size: calc(@index() * 1.55%);
      
      transition: .2s ease;
      transform: rotate(calc(@index() * 5deg));
      
      border-radius: 30%;
      border: 1px solid hsla(
        calc(10 + 4 * @index()), 70%, 68%,
        @rand(.8)
      );
    </css-doodle>`,
    `<css-doodle>
    :doodle {
        @grid: 11 / 100vmax;
       
      }
      --n: calc(
          @abs(@abs(@row() - 6)
        + @abs(@col() - 6) - 11) / 11
      );
      margin: -10%;
      z-index: 1;
      transition:
    .5s cubic-bezier(.175, .885, .32, 1.275)
    @rand(500ms);
      transform: rotate(45deg);
      border: 1px solid;
      border-color: hsla(
        calc(var(--n) * 280 + 120), 99%, 44%,
        var(--n)
      );
      </css-doodle>
      `,
      `<css-doodle>
      :doodle {
        @grid: 7 / 100vmax;
      }
    
      @shape: clover 5;
      background: hsla(
        calc(360 - @index() * 4),
        70%, 68%, @rand(.8)
      );
      transition:
    .5s cubic-bezier(.175, .885, .32, 1.275)
    @rand(500ms);
      transform:
        scale(@rand(.2, 1.5))
        translate(
          @rand(-50%, 50%), @rand(-50%, 50%)
        );
        </css-doodle>
        `
];
var index = Math.floor(Math.random() * doodles.length) + 1;

doodle.addEventListener('click', function () {
    console.log('interval = ' + interval)
    if (interval === 3000) {
        interval = 200;
    } else {
        interval = 3000;
    }
    clearInterval(intervalId);
    start(interval);
});

function changeScreen() {
    console.log('change', index)
    doodle.innerHTML = doodles[index];
    if (index === doodles.length - 1) {
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