var videoData = {
    web: '4_g7MC9PehI',
    ux: 'xqJoWPXMlfQ',
    design: '7_jbm6ae3Tk'
};

var isSlideshow = true;
var index = 0;
var interval = 78000;//one minutes and 18 seconds (length of shortest video)
var intervalId;

var container = $('.container'),
    overlays = $('.overlay'),
    player;

overlays.click(handleSubjectClick);

function handleSubjectClick(evt) {
    if (evt.isTrigger) {
        if (index != overlays.length - 1) {
            index++;
        } else {
            index = 0;
        }
    } else {
        isSlideshow = false; //stop slideshow
    }
    var subject = $(this).data('subject')
    toggleNav(subject);
}

function toggleNav(subject) {
    if (container.hasClass('is-open')) {
        container.removeClass('is-open');
        player.stopVideo();
    } else {
        container.addClass('is-open');
        player.loadVideoById(videoData[subject]);
        player.playVideo();
    }
}

//*************Youtube Player**********//

// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;
function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
        videoId: '4_g7MC9PehI',
        playerVars: {
            'autoplay': 1,
            'showinfo': 0,
            'controls': 0,
            'playlist': '4_g7MC9PehI',
            'loop': 1
        }
    });
}

//***********Slideshow**************//

function start(interval) {
    intervalId = setInterval(function () {
        if (isSlideshow) {
            $('#overlay' + index).trigger('click');
        } else {
            clearInterval(intervalId);
        }
    }, interval);
}

function getInterval() {
    return interval;
}

//kickoff slideshow
start(interval);