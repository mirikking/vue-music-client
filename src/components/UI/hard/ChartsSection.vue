<template>
    <section class="container-fluid p-5 charts">
      <TrackItem :tracksArray="tracksArray" v-for="track in tracksArray" :key="track.id" :track="track"></TrackItem>
    </section>
</template>


<script>
import axios from "axios";
const api = 'https://mirik-music.herokuapp.com/api/graphql'

const apiLoop = axios.get(api)

export default { 
  name: "ChartsSection",
  data() {
    return {
        tracksArray: [],
        track: {},
    } 
  },
  mounted() {
    apiLoop.then((response) => {
        this.tracksArray = response.data
    })
  }
}
</script>

<style scoped>
.charts {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(3, 1fr);
}

</style>