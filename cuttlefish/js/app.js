const headerEle = document.querySelector('h1');
headerEle.addEventListener('click', videoHandler);

const headerEles = document.querySelectorAll('h1');
console.log('first h1', headerEle);
console.log('all h1', headerEles);

function videoHandler () {
    // TODO

    // reference the video
    const video = document.querySelector('video');
    // play the video!

    if ( video.paused ) {
        video.play();
    } else {
        video.pause();
    }

}