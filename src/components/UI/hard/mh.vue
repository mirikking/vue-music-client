<template>
  <header class="nav container-fluid pt-3">
    <h1 class="title">CCJ Music</h1>
    <h2 onclick="location.href='music/charts.html'">Charts</h2>
    <h2 onclick="location.href='#'" id="test">Albums</h2>
  </header>
</template>

<script>
export default {
    name: 'MainHeader'
}
</script>

<style scoped>

.nav h2:not(.title) {
    text-decoration: none;
    background-image: linear-gradient(currentColor, currentColor);
    background-position: 0% 100%;
    background-repeat: no-repeat;
    background-size: 0% 2px;
    transition: background-size .3s;
}

.nav h2:hover {
    background-size: 100% 2px;
}

.nav {
    font-family: 'Roboto Mono', monospace;
    display: flex;
    justify-content: center;
    text-align: center;
    color: rgb(0, 0, 0);
    height: 5rem;
    cursor: default;
    -webkit-box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
    -moz-box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
    box-shadow: 0px 5px 5px -5px rgba(34, 60, 80, 0.6);
}

.nav h2,
.nav img {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-inline-start: 5rem;
    cursor: pointer;
}

.nav h1:hover {
    cursor: pointer;
}

</style>