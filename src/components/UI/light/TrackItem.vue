<template>
    <div class="container card chartsCard" :data-musicid="track.id" @click="pushTrack">
        <img class="card-img-top" :src="track.encodedPicture" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{track.trackTitle}}</h5>
            <p class="card-text">{{track.trackArtist}}</p>
        </div>
    </div>
</template>

<script>
import { trackStore } from '@/stores/stateTrack'

export default {
    name: "TrackItem",
    props: {
      tracksArray: {
        type: Array,
        required: true
      },
      track: {
          type: Object,
          required: true
        }
    },
    methods: {
       pushTrack(event) {
        let proxiedTracksArray = this.tracksArray
        let currentTrackId = event.currentTarget.getAttribute('data-musicid')
        proxiedTracksArray.forEach(e => {
          if (e.id == currentTrackId) {
            trackStore().currentTrack = e
            this.$router.push({path: '/player',})
          }
        })
      } 
    }
}
</script>

<style scoped>

.chartsCard {
    display: flex;
    width: auto;
    margin: 0;
    padding-top: 1rem;
    text-align: center;
    transition: all 0.4s;
    align-items: center;
}

.card-img-top {
    width: 50%;
    height: auto;
    object-fit: fill;
    border-radius: 50%
}

.chartsCard:hover {
    cursor: pointer;
    -webkit-box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
}

</style>