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
                    <audio :src="this.currentTrack.path" class="track_audio"></audio>
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

export default {
    name: 'PlayerSection',
    data() {
        return {
            currentTrack: trackStore().currentTrack
        }
    },
    mounted() {

    }
}
</script>

<style scoped>

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