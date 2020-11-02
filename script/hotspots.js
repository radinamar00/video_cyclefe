let video2played = false;
let video3played = false;
let video4played = false;

const fps = 30;
const debug = false;


const msInterval = Math.floor(1000 / fps);
let engine;

let video = {
    log: (message = 'Missing log text') => {
        if (debug) {
            console.log(message);
        }
    },
    hotspots: {
        running: false,
        init: () => {
            video.log('video hotspot engine: init');
            const elmsVideo = document.querySelectorAll('video');
            elmsVideo.forEach((elmVideo) => {
                elmVideo.parentElement.classList.add('videoHotspotsParent');
                elmVideo.addEventListener('play', (event) => {
                    if (!video.hotspots.running) {
                        video.hotspots.on();
                    }
                });
                elmVideo.addEventListener('seeked', (event) => {
                    if (!video.hotspots.running) {
                        video.hotspots.on(true);
                    }
                });
                elmVideo.addEventListener('pause', (event) => {
                    if (video.hotspots.running) {
                        let videoPlaying = false;
                        elmsVideo.forEach((elmVideo) => {
                            if (!elmVideo.paused) {
                                videoPlaying = true;
                            }
                        });
                        if (!videoPlaying) {
                            video.hotspots.off();
                        }
                    }
                });
            });
        },
        on: (isSeeked = false) => {

            video.log('video hotspot engine: on');
            if (!video.hotspots.running) {
                video.hotspots.running = true;
            }
            engine = setInterval(() => {
                video.log('engine loop');
                video.hotspots.update(isSeeked);
            }, msInterval);
        },
        off: () => {

            video.log('video hotspot engine: off');
            video.hotspots.running = false;
            clearInterval(engine);
        },
        update: () => {

            hotspots.forEach((hotspot, index) => {
                if (hotspot.active) {
                    const video = document.querySelector(`#${hotspot.videoId}>video`);
                    if (video) {
                        const now = video.currentTime;
                        const elmHotspotCheck = document.querySelector(`#hotspotId${index}`);

                        if (hotspot.markIn > now || hotspot.markOut <= now) {
                            if (elmHotspotCheck) {
                                const elmHotspot = document.querySelector(`#hotspotId${index}`);
                                elmHotspot.parentElement.removeChild(elmHotspot);
                                hotspot.onscreen = false;
                            }
                        } else if (hotspot.markIn <= now && hotspot.markOut > now) {
                            if (!elmHotspotCheck) {
                                let elmHotspot = document.createElement('a');
                                elmHotspot.id = `hotspotId${index}`;
                                elmHotspot.className = 'hotspot';
                                if (hotspot.ui.title) {
                                    elmHotspot.title = hotspot.ui.title;
                                }
                                if (hotspot.ui.text && hotspot.ui.text != "") {
                                    elmHotspot.innerHTML = hotspot.ui.text;
                                }
                                let css = "";
                                css += `width: ${hotspot.sizeX}%;`;
                                css += `height: ${hotspot.sizeY}%;`;
                                css += `left: ${hotspot.posX}%;`;
                                css += `top: ${hotspot.posY}%;`;
                                css += `${hotspot.ui.style};`;
                                if (hotspot.ui.type == 'image') {

                                    css += `background-image: url(${hotspot.ui.image});`;
                                    elmHotspot.classList.add('image');
                                }
                                elmHotspot.style = css;
                                if (hotspot.hotspot.type == 'link') {

                                    elmHotspot.href = hotspot.hotspot.url;
                                    elmHotspot.target = hotspot.hotspot.target;
                                } else {

                                    elmHotspot.addEventListener('click', (event) => {
                                        event.preventDefault();
                                        hotspot.hotspot.func();
                                    });
                                }
                                video.parentElement.appendChild(elmHotspot);
                                video.pause();

                                if (hotspot.ui.pause) {
                                    videojs(hotspot.videoId).pause();
                                }
                            }
                        }
                    }
                }
            });
        },
        remove: () => {

            video.log('video hotspot engine: cleanup');
            video.hotspots.off();
            const elmsHotspots = document.querySelectorAll('a.hotspot');
            elmsHotspots.forEach((elmHotspot) => {
                elmHotspot.parentElement.removeChild(elmHotspot);
            });
            delete video;
            delete hotspots;
        }

    }
}

video.hotspots.init();

const div1 = document.querySelector('#div1');
const div2 = document.querySelector('#div2');
const div3 = document.querySelector('#div3');
const div4 = document.querySelector('#div4');
const vid1 = document.querySelector('#video1');
const vid2 = document.querySelector('#video2');
const vid3 = document.querySelector('#video3');
const vid4 = document.querySelector('#video4');

// videojs(video1).pause();

const hotspots = [{
        active: true,
        videoId: "video1",
        markIn: 39,
        markOut: 40,
        sizeX: 15,
        sizeY: 15,
        posX: 14,
        posY: 22,
        ui: {
            type: "image",
            style: "height: 8vw; width:8vw;",
            image: "assets/images/social_icon.png"
        },
        hotspot: {
            type: "function",
            func: () => {
                video1played = true;
                div1.classList.add("hidden");
                div2.classList.remove("hidden");
                videojs('video1').pause();
            }
        }
    },
    {
        active: true,
        videoId: "video1",
        markIn: 39,
        markOut: 40,
        sizeX: 15,
        sizeY: 15,
        posX: 60,
        posY: 17,
        ui: {
            type: "image",
            style: "height: 8vw; width:8vw;",
            image: "assets/images/unique_icon.png"
        },
        hotspot: {
            type: "function",
            func: () => {
                video2played = true;
                div1.classList.add("hidden");
                div3.classList.remove("hidden");
                videojs('video1').pause();
            }
        }
    },

    {
        active: true,
        videoId: "video1",
        markIn: 39,
        markOut: 40,
        sizeX: 15,
        sizeY: 15,
        posX: 78,
        posY: 20,
        ui: {
            type: "image",
            style: "height: 8vw; width:8vw;",
            image: "assets/images/money_icon.png"
        },
        hotspot: {
            type: "function",
            func: () => {
                video3played = true;
                div1.classList.add("hidden");
                div4.classList.remove("hidden");
                videojs('video1').pause();
            }
        }
    },

    {
        active: true,
        videoId: "video1",
        markIn: 39,
        markOut: 40,
        sizeX: 70,
        sizeY: 40,
        posX: 21,
        posY: 80,
        ui: {
            type: "box",
            text: "Click one of the icons above.<br> Watch each students unique story!",
            style: "font-size:2.6vw; height: auto; padding: 1% 2%; width: auto; text-align: center; color: #F85F02; background-color: white; font-family: 'Montserrat', sans-serif; border-radius: 500px; line-height: 1.1;"
        },
        hotspot: {
            type: "function",
            func: () => {
                console.log("Internal screaming!");
            }
        }
    },


    {
        active: true,
        videoId: "video1",
        markIn: 71,
        markOut: 72,
        sizeX: 70,
        sizeY: 40,
        posX: 36,
        posY: 40,
        ui: {
            type: "box",
            text: "Interested?",
            style: "font-size:3.5vw; height: auto; padding: 1% 2%; width: auto; text-align: center; color: #F85F02;  font-family: 'Montserrat', sans-serif; border-radius: 500px; line-height: 1.4;"
        },
        hotspot: {
            type: "function",
            func: () => {
                console.log("Internal screaming!");
            }
        }
    },


    {
        active: true,
        videoId: "video1",
        markIn: 71,
        markOut: 72,
        sizeX: 70,
        sizeY: 40,
        posX: 19,
        posY: 50,
        ui: {
            type: "box",
            text: "Scroll down to see our special offer",
            style: "font-size:3.3vw; height: auto; padding: 1% 2%; width: auto; text-align: center; color: white;  font-family: 'Montserrat', sans-serif; border-radius: 500px; line-height: 1.4;"
        },
        hotspot: {
            type: "function",
            func: () => {
                console.log("Scroll down to see our special offer!");
            }
        }
    }



];

videojs('video2').on('ended', () => {
    div2.classList.add("hidden");
    div1.classList.remove("hidden");
    video2played = true
    if (video2played && video3played && video4played) {
        videojs('video1').currentTime(42);
        videojs('video1').play();
    } else {
        videojs('video1').currentTime(39);
    }
});

videojs('video3').on('ended', () => {
    div3.classList.add("hidden");
    div1.classList.remove("hidden");
    video3played = true
    if (video2played && video3played && video4played) {
        videojs('video1').currentTime(42);
        videojs('video1').play();
    } else {
        videojs('video1').currentTime(39);
    }
});

videojs('video4').on('ended', () => {
    div4.classList.add("hidden");
    div1.classList.remove("hidden");
    video4played = true
    if (video2played && video3played && video4played) {
        videojs('video1').currentTime(42);
        videojs('video1').play();
    } else {
        videojs('video1').currentTime(39);
    }
});