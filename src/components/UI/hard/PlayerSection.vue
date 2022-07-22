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
                    <button class="track_back_button d-flex"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg></button>
                    <button class="track_control_button">
                        <svg v-if="statusOfPlayer == 'onPause'" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 92.2 122.88" style="enable-background:new 0 0 92.2 122.88" xml:space="preserve"><g><polygon class="st0" points="92.2,60.97 0,122.88 0,0 92.2,60.97"/></g></svg>
                        <svg v-if="statusOfPlayer == 'onPlay'" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 87.72 122.88" style="enable-background:new 0 0 87.72 122.88" xml:space="preserve"><g><path class="st0" d="M0,0h35.54v122.88l-35.54,0V0L0,0z M52.18,0h35.54v122.88l-35.54,0V0L52.18,0z"/></g></svg>
                        </button>
                    <button class="track_next_button d-flex"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve"><g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5 c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg></button>
                </div>
                <div class="track_progress_bar mt-4 me-0">
                    <audio :src="`http://localhost:3001/api/${this.currentTrack.name}`" class="track_audio"></audio>
                    <p class="me-3 current_time_track">0:00</p>
                    <div class="progress_bar"><div class="progress_slider"></div></div>
                    <p class="ms-3 duration_track">0:00</p>
                </div>
                <div class="track_volume">
                    <svg
                        class="track_volume_img"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M24 12C24 16.4183 20.4183 20 16 20V18C19.3137 18 22 15.3137 22 12C22 8.68629 19.3137 6 16 6V4C20.4183 4 24 7.58172 24 12Z"
                            fill="currentColor"
                        />
                        <path
                            d="M20 12C20 14.2091 18.2091 16 16 16V14C17.1046 14 18 13.1046 18 12C18 10.8954 17.1046 10 16 10V8C18.2091 8 20 9.79086 20 12Z"
                            fill="currentColor"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9 16L15 20V4L9 8H5C2.79086 8 1 9.79086 1 12C1 14.2091 2.79086 16 5 16H9ZM5 10H9L13 7.5V16.5L9 14H5C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10Z"
                            fill="currentColor"
                        />
                    </svg>
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
            statusOfPlayer: 'onPause',
            currentTrack: trackStore().currentTrack
        }
    },
    mounted() {
        let controlButton = document.querySelector('.track_control_button');
        let nextButton = document.querySelector('.track_next_button');
        let prevButton = document.querySelector('.track_back_button');

        let progressSlider = document.querySelector('.progress_slider')
        let progress = document.querySelector('.progress_bar')
        let currentDuration = this.currentTrack.trackDuration; 
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
        translateX: 10,
        delay: 0,
        duration: 150,
        loop: 1,
        easing: 'linear',
        autoplay: false,
        direction: 'alternate',
        })

        const arrowBackward = anime({
        targets: prevButton,
        translateX: -10,
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
            if (this.statusOfPlayer === 'onPause') {
                if (isOncePlayed == false) {
                        fliper.restart();
                    isOncePlayed = true; 
                } else {
                    fliper.play(); 
                }
                audio.play();
                this.statusOfPlayer = 'onPlay'
                controlButton.setAttribute('data-status', 'onPlay');
                controlButton.setAttribute('alt', 'Pause'); 
            } else if (this.statusOfPlayer === 'onPlay') {
                audio.pause();
                fliper.pause();
                this.statusOfPlayer = 'onPause'
                controlButton.setAttribute('data-status', 'onPause'); 
                controlButton.setAttribute('alt', 'Play'); 
            }
        }
                const pretifyNumber = (num) => {
            let trackMinutes = (num / 60).toString().split('.')[0];
            let trackLessSeconds = (num % 60).toString().split('.')[0];
            if (trackLessSeconds < 10) {
                return `${trackMinutes}:0${trackLessSeconds}`
            }
            return `${trackMinutes}:${trackLessSeconds}`
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
                this.statusOfPlayer = 'onPause'
                controlButton.setAttribute('src', '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 87.72 122.88" style="enable-background:new 0 0 87.72 122.88" xml:space="preserve"><g><path class="st0" d="M0,0h35.54v122.88l-35.54,0V0L0,0z M52.18,0h35.54v122.88l-35.54,0V0L52.18,0z"/></g></svg>');
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
                let width = progressVolume.offsetWidth
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
    height: 3rem;
}

.track_control_button {
    height: 2rem;
    width: 1.4rem;
    border: none;
    background: none
}

.track_next_button {
    height: 1.5rem;
    margin-left: 10%;
    width: 1.5rem;
    border: none;
    background: none;
}

.track_back_button {
    height: 1.5rem;
    margin-right: 10%;
    width: 1.5rem;
    border: none;  
    background: none;
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
    transition: all 0.1s;
    border: none;
}

.track_volume_img:hover {
    height: 1.6rem;
    width: 1.8rem;
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