let index = 0;
var interval = 15000;

let chatsEl = $('.chats');

function getChatHTML(chat) {
    let bubbleHTML = ``;
    for (let i = 0; i < chat.dialog.length; i++) {
        let bubble = chat.dialog[i];
        let userClass = 'me'
        if (bubble.user === 'student') {
            userClass = 'student';
        }
        bubbleHTML += `<div class="${userClass}-wrapper">
                            <div class="bubble bubble-${userClass}">
                                ${bubble.text}
                            </div>
                        </div>`;

    }
    return bubbleHTML;
}

function changeScreen() {
    if (index > chats.length - 1) {
        index = 0;
    }
    if (chatsEl.html() !== '') {
        chatsEl.addClass('animated bounceOutUp');
        setTimeout(function () {
            chatsEl.html(getChatHTML(chats[index]));
            chatsEl.removeClass('animated bounceOutUp').addClass('animated bounceInUp');
            index++;
        }, 2000);

    } else {
        chatsEl.html(getChatHTML(chats[index]));
        chatsEl.removeClass('animated bounceOutUp').addClass('animated bounceInUp');
        index++;
    }

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
$.getJSON('json/chats.json', function (data) {
    chats = data.chats;
    start(interval);
    changeScreen();
});