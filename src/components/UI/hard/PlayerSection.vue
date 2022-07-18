<template>
  <section class="container-fluid pt-5 player">
        <div class="container track_group">
            <img :src="this.currentTrack.encodedPicture" alt="Cover" class="track_img d-flex">
            <div class="track_discription mt-3">
                <div class="track_info ms-5">
                    <strong class="track_title">{{ this.currentTrack.trackTitle }}</strong>
                    <p class="track_artist">{{ this.currentTrack.trackArtist }}</p>
                </div>
                <div class="track_control_buttons p-0 mt-5">
                    <img src="../../../public/assets/svg/back.svg" alt="Back" class="track_back_button d-flex">
                    <img src="../../../public/assets/svg/playbutton.svg" alt="Play" class="track_control_button" data-status="onPause">
                    <img src="../../../public/assets/svg/next.svg" alt="Next" class="track_next_button d-flex">
                </div>
                <div class="track_progress_bar mt-4 me-0">
                    <audio :src="`http://localhost:3001/api/${this.currentTrack.name}`" class="track_audio"></audio>
                    <p class="me-3 current_time_track">0:00</p>
                    <div class="progress_bar"><div class="progress_slider"></div></div>
                    <p class="ms-3 duration_track">{{ this.currentTrack.trackDuration }}</p>
                </div>
                <div class="track_volume">
                    <img src="../../../public/assets/svg/volume.svg" alt="Volume" class="track_volume_img">
                    <div class="track_volume_control"><div class="volume_slider"></div></div>
                </div>
            </div>
        </div>
    </section>
</template> 

<script>
import { trackStore } from '@/stores/stateTrack'
import anime from 'animejs';

export default {
    name: 'PlayerSection',
    data() {
        return {
            currentTrack: trackStore().currentTrack
        }
    },
    mounted() {
        let controlButton = document.querySelector('.track_control_button');
        let nextButton = document.querySelector('.track_next_button');
        let prevButton = document.querySelector('.track_back_button');

        let progressSlider = document.querySelector('.progress_slider')
        let progress = document.querySelector('.progress_bar')
        let currentDuration = null; 
        let audio = document.querySelector('.track_audio');
        let volumeSlider = document.querySelector('.volume_slider');
        let progressVolume = document.querySelector('.track_volume_control');
        let volumeButton = document.querySelector('.track_volume_img');
        let isOncePlayed = false;
        audio.volume = 0.1

        // Animation
        const fliper = anime({
        targets: '.track_img',
        rotate: [0, 360],
        delay: 0,
        duration: 12000,
        loop: true,
        easing: 'linear',
        autoplay: false,
        });

        const backFliper = anime({
        targets: '.track_img',
        rotate: 0,
        duration: 1000,
        loop: false,
        easing: 'linear',
        autoplay: false,
        })

        const arrowForward = anime({
        targets: nextButton,
        translateX: 100,
        delay: 0,
        duration: 150,
        loop: 1,
        easing: 'linear',
        autoplay: false,
        direction: 'alternate',
        })

        const arrowBackward = anime({
        targets: prevButton,
        translateX: -100,
        delay: 0,
        duration: 150,
        loop: 1,
        easing: 'linear',
        autoplay: false,
        direction: 'alternate',
        })
    
        nextButton.addEventListener('click', () => {
            arrowForward.play()
        })
        prevButton.addEventListener('click', () => {
            arrowBackward.play()
        })
        controlButton.addEventListener('click', () => {
            audioControl()
        })
        volumeButton.addEventListener('click', () => {
            if (audio.muted) {
                audio.muted = false;
            } else {
                audio.muted = true;
            }
        })

        const audioControl = () => {
            let statusOfPlayer = controlButton.getAttribute('data-status') 
            if (statusOfPlayer === 'onPause') {
                if (isOncePlayed == false) {
                    controlButton.addEventListener('click', () => {
                        fliper.restart();
                    })
                    isOncePlayed = true;
                }
                controlButton.addEventListener('click', () => {
                    fliper.start();
                })
                audio.play();
                controlButton.setAttribute('src', '@/public/assets/svg/pausebutton.svg');
                controlButton.setAttribute('data-status', 'onPlay');
                controlButton.setAttribute('alt', 'Pause'); 
            } else if (statusOfPlayer === 'onPlay') {
                audio.pause();
                controlButton.addEventListener('click', () => {
                    fliper.pause();
                })
                controlButton.setAttribute('src', '@/public/assets/svg/playbutton.svg');
                controlButton.setAttribute('data-status', 'onPause'); 
                controlButton.setAttribute('alt', 'Play'); 
            }
        }

        const refreshPlayer = () => {
        let currentTime = audio.currentTime;
        let progressStat = (currentTime / currentDuration) * 99.99;
            if (progressStat >= 98.99) {
                fliper.pause()
                document.querySelector('.track_img').style.transition='all 2.5s';
                backFliper.play();
            }
            if (progressStat >= 99.97) {
                audio.pause()
                controlButton.setAttribute('src', '@/public/assets/svg/playbutton.svg');
                controlButton.setAttribute('data-status', 'onPause');
                document.querySelector('.track_img').style.transition='all 0s';
                backFliper.pause()
                isOncePlayed = false;
            }
        }
        
        const activeState = () => {
            const updateProgress = () => {
                let currentTime = audio.currentTime;
                let progressStat = (currentTime / currentDuration) * 100;
                progressSlider.style.width = `${progressStat}%`;
                document.querySelector('.current_time_track').innerHTML = pretifyNumber(currentTime);
            }
            const setProgress = (e) => {
                let width = progress.offsetWidth;
                let clickX = e.offsetX;

                audio.currentTime = (clickX / width) * currentDuration;
            }
            const updateVolume = () => {
                let progressStat = (audio.volume * 100);
                volumeSlider.style.width = `${progressStat}%`;
            }
            const setVolume = (e) => {
                let width = $(progressVolume).width();
                let clickX = e.offsetX;

                audio.volume = (clickX / width) * 1;
            }
            
            audio.addEventListener('timeupdate', updateProgress)
            progress.addEventListener('timeupdate', setProgress)
            progress.addEventListener('click', setProgress)

            audio.addEventListener('volumechange', updateVolume)
            progressVolume.addEventListener('click', setVolume)

            audio.addEventListener('timeupdate', refreshPlayer)
            document.querySelector('.duration_track').innerHTML = pretifyNumber(currentDuration)
        
        }

        const pretifyNumber = (num) => {
            let trackMinutes = (num / 60).toString().split('.')[0];
            let trackLessSeconds = (num % 60).toString().split('.')[0];
            if (trackLessSeconds < 10) {
                return `${trackMinutes}:0${trackLessSeconds}`
            }
            return `${trackMinutes}:${trackLessSeconds}`
        }

        activeState()
    }
}
</script>

<style scoped>

p {
    margin: 0px;
    padding: 0px;
}

.track_group {
    display: flex;
    padding: 1rem;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.track_info {
    display: flex;
    flex-direction: column;
}

.track_img {
    border-radius: 50%;
    height: 15rem;
    width: 15rem;
    background-color: white;
}

.track_discription {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.track_control_buttons {
    display: flex;
    justify-content: center;
    align-items: center;
}

.track_control_buttons:hover > img {
    cursor: pointer;
    transition: all 1s;
}

.track_control_button {
    height: 2rem;
    width: 2rem;
}

.track_next_button {
    height: 1.4rem;
    margin-left: 10%;
}

.track_back_button {
    height: 1.4rem;
    margin-right: 10%;
}

.track_progress_bar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    align-content: center
}

.track_volume {
    width: 2rem;
    height: 2rem;
    display: flex;
    flex-direction: column;
    position: relative;
    left: 94%;
    bottom: 70%;
    align-items: center;
    justify-content: center;
}

.track_volume_img {
    display: flex;
    height: 1.4rem;
    width: 1.6rem;
    cursor: pointer;
}

.track_volume_control {
    display: flex;
    position: relative;
    height: 5px;
    width: 8rem;
    top: 5rem;
    background-color: silver;
    transform: rotate(270deg);
    transition: width 0.1s linear;
    border-radius: 8px;
}

.volume_slider {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 10%;
    background-color: black;
    z-index: 1;
    height: 5px;
    border-radius: 8px;
    transition: 0.1s;
}

.progress_bar {
    width: 55%;
    height: 7px;
    border-radius: 5px;
    background-color: silver;
    transition: width 0.1s linear;
}

.progress_slider {
    width: 0%;
    background-color: black;
    z-index: 1;
    height: 7px;
    border-radius: 8px;
    transition: 0.1s;
}

</style>