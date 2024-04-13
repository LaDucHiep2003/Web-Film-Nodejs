const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const video = $('#video');
const playVideo = $('.play-video');
const pauseVideo = $('.pause-video');
const watching = $('.content-watch-firm .watching');
const pauseVideoBottom = $('.pause-video-bottom');
const playVideoBottom = $('.play-video-bottom');
const controlVideo = $('.container-control-video');
const progress = $('#progress');
const prevBtnSecond = $('.btn-prev-second');
const nextBtnSecond = $('.btn-next-second');
const currentTimeVideo = $('.current-video');
const totalTimeVideo = $('.total-video');
const audioVideo = $('.fa-volume-high');
const volumeIcon = $('.volume');
const fullScreenBtn = $('.fa-up-right-and-down-left-from-center');
const Screen = $('.movie');
const smallScreen = $('.fa-down-left-and-up-right-to-center');
const backgroundVideo = $('.backgrond-video');
const settingVideo = $('.setting-speed-video');
const settingBtn = $('.fa-gear');
const speed = $$('.speed');
const btnSortComment = $('.choose')
const hidenComment = $('.choose-sort')

const app = {
    isPlaying: false,
    totalVolume: video.volume,
    seekVolume: null,
    timeOut: null,
    appear: false,
    checkSettingVideo: false,

    handleEvents: function () {
        const _this = this;

        // Xu Ly Su Kien Play or Pause Video
        controlVideo.onclick = function (e) {
            e.stopPropagation();
        };
        settingVideo.onclick = function (e) {
            e.stopPropagation();
        };



        watching.addEventListener("click", () =>{
            if (_this.isPlaying) {
                video.pause();
            } else {
                video.play();
            }
        })

        btnSortComment.onclick = function(){
            if($('.choose-sort.disable')){
                $('.choose-sort.disable').classList.remove('disable')
            }
            else{
                hidenComment.classList.add('disable')
            }
        }


        playVideoBottom.onclick = function () {
            video.play();
        };
        pauseVideoBottom.onclick = function () {
            video.pause();
        };

        video.onplay = function () {
            _this.isPlaying = true
            playVideo.classList.add('disable');
            backgroundVideo.classList.add('visible');
            pauseVideoBottom.classList.remove('disable');
            playVideoBottom.classList.add('disable');
            controlVideo.classList.add('active-control-video');
            _this.appear = true;
        };

        video.onpause = function () {
            _this.isPlaying = false;
            pauseVideoBottom.classList.add('disable');
            playVideoBottom.classList.remove('disable');
            _this.appear = false;
        };

        // Xu Ly SU Kien Khi Tien Do Video Thay Doi

        video.ontimeupdate = function () {
            if (video.duration) {
                const progressPersent = Math.floor(
                    (video.currentTime / video.duration) * 1000,
                );
                progress.value = progressPersent;
            }
            if (video.currentTime < 0) {
                currentTimeVideo.innerText = _this.formatTime(0);
            } else {
                currentTimeVideo.innerText = _this.formatTime(
                    video.currentTime,
                );
            }
        };

        speed.forEach(function (sp, idx) {
            const a = speed[idx];
            sp.onclick = function () {
                $('.speed.active-speed').classList.remove('active-speed');
                if (idx == 0) {
                    video.playbackRate = 0.5;
                    a.classList.add('active-speed');
                } else if (idx == 1) {
                    video.playbackRate = 1;
                    a.classList.add('active-speed');
                } else if (idx == 2) {
                    video.playbackRate = 1.25;
                    a.classList.add('active-speed');
                } else if (idx == 3) {
                    video.playbackRate = 1.5;
                    a.classList.add('active-speed');
                } else if (idx == 4) {
                    video.playbackRate = 2;
                    a.classList.add('active-speed');
                }
            };
        });
        // Khoi Tao Cac Thong So Video ngay khi load

        video.onloadeddata = function () {
            totalTimeVideo.innerText = _this.formatTime(video.duration);
            video.volume = 0.2;
        };
        // Khi Thay Doi Am Luong
        volumeIcon.onchange = function (e) {
            _this.seekVolume = (_this.totalVolume / 50) * e.target.value;
            video.volume = _this.seekVolume;
        };

        audioVideo.onclick = function () {
            if (video.volume > 0) {
                video.volume = 0;
            } else {
                video.volume = _this.seekVolume;
            }
        };

        video.onvolumechange = function () {
            if (_this.totalVolume) {
                const progressPersentx = Math.floor(
                    (video.volume / _this.totalVolume) * 50,
                );
                volumeIcon.value = progressPersentx;
            }
        };

        // Xu Ly Su Kien Khi Tua Video
        progress.onchange = function (e) {
            const seekTime = (video.duration / 1000) * e.target.value;
            video.currentTime = seekTime;
        };

        prevBtnSecond.onclick = function () {
            if (video.currentTime < 0) {
                video.currentTime = 0;
            } else {
                video.currentTime -= 10;
            }
        };

        nextBtnSecond.onclick = function () {
            if (video.currentTime > video.duration) {
                video.currentTime = video.duration;
            } else {
                video.currentTime += 10;
            }
        };

        // Nut Phong To / Thu Nho Man Hinh Video

        fullScreenBtn.onclick = function () {
            Screen.requestFullscreen();
            smallScreen.classList.remove('disable');
            fullScreenBtn.classList.add('disable');
        };

        smallScreen.onclick = function () {
            document.exitFullscreen();
            smallScreen.classList.add('disable');
            fullScreenBtn.classList.remove('disable');
        };

        settingBtn.onclick = function () {
            if (_this.checkSettingVideo == false) {
                settingVideo.classList.remove('visible');
                _this.checkSettingVideo = true;
            } else {
                settingVideo.classList.add('visible');
                _this.checkSettingVideo = false;
            }
        };

        // SU Kien Xay ra khi dua chuot vao man hinh
        Screen.addEventListener('mouseenter', function () {
            clearTimeout(_this.timeOut);
            if (_this.appear) {
                controlVideo.style.display = 'flex';
                Screen.style.cursor = 'cursor';
            }
        });
        // SU Kien Xay ra khi dua chuot ra man hinh
        Screen.addEventListener('mouseleave', function () {
            clearTimeout(_this.timeOut);
            if (_this.appear) {
                _this.timeOut = setTimeout(function () {
                    controlVideo.style.display = 'none';
                    settingVideo.classList.add('visible');
                    _this.checkSettingVideo = false;
                }, 3000);
            }
        });
        // SU Kien Xay ra khi dua chuot di chuuyen va dung im 3s se an  man hinh
        Screen.addEventListener('mousemove', function () {
            if (_this.appear) {
                clearTimeout(_this.timeOut);
                controlVideo.style.display = 'flex';
                Screen.style.cursor = 'pointer';

                _this.timeOut = setTimeout(function () {
                    controlVideo.style.display = 'none';
                    Screen.style.cursor = 'none';
                    settingVideo.classList.add('visible');
                    _this.checkSettingVideo = false;
                }, 3000);
            } else {
                clearTimeout(_this.timeOut);
                controlVideo.style.display = 'flex';
                Screen.style.cursor = 'pointer';
            }
        });
    },
    formatTime: function (seconds) {
        var minutes = Math.floor(seconds / 60);
        var seconds = Math.floor(seconds % 60);
        return (
            minutes.toString().padStart(2, '0') +
            ':' +
            seconds.toString().padStart(2, '0')
        );
    },

    start: function () {
        this.handleEvents();
    },
};

app.start();

