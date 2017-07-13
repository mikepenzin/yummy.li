var html5video = !!document.createElement('video').canPlayType;
var video = document.getElementsByTagName('video')[0];
var image = document.getElementsByClassName('jumbotron')[0];
var overlay = document.getElementsByClassName('overlay')[0];


if (!html5video || window.screen.availWidth < 768) {
    video.style.display = "none";
    image.className += ' jumbo-bg-search';
    overlay.style.display = "none";
}