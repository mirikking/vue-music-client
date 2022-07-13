<template>
  <header class="nav container-fluid pt-3">
    <router-link to="/"><h1 class="title">CCJ Music</h1></router-link>
    <router-link to="/charts"><h2>Charts</h2></router-link>
    <router-link to="/"><h2>Albums</h2></router-link>
  </header>
</template>

<script>
export default {
    name: 'MainHeader'
}
</script>

<style scoped>

.nav a {
    text-decoration: none;
    background-image: linear-gradient(currentColor, currentColor);
    background-position: 50% 70%;
    background-repeat: no-repeat;
    background-size: 0% 2px;
    transition: background-size .2s;
}

.nav a:hover:not(:first-child) {
    background-size: 100% 2px;
}

.nav {
    margin: 0px;
    padding: 0px;
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

.nav a {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-inline: 2rem;
    cursor: pointer;
    color: black
}

.nav h1:hover {
    cursor: pointer;
}

</style>