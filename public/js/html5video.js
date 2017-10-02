var html5video = !!document.createElement('video').canPlayType;
var video = document.getElementsByTagName('video')[0];
var image = document.getElementsByClassName('jumbotron')[0];
var overlay = document.getElementsByClassName('overlay')[0];

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

if (!html5video || w < 768) {
    video.style.display = "none";
    image.className += ' jumbo-bg-search';
    overlay.style.display = "none";
}