<template>
  <div id="app">
    <header class="header">
      <h3>T3M</h3>
    </header>
    <nav class="nav">
      <router-link class="button" to="/">Home</router-link>
      <router-link class="button" to="/create">Create</router-link>
      <router-link v-if="isSelectedCat" :to="{ name: 'Cat', params: { id: this.$store.state.selectedCat }}" class="button">Cat</router-link>
      <button v-else class="button" disabled>Cat</button>
      <router-link v-if="isSelectedCat" class="button" :to="{ name: 'Edit', params: { id: this.$store.state.selectedCat }}" >Edit</router-link>
      <button v-else class="button" disabled>Edit</button>
      <router-link class="button" to="/about">About</router-link>
    </nav>
    <main class="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  computed: {
    isSelectedCat () {
      return this.$store.state.selectedCat 
    },
  }
}
</script>

<style lang="scss">

#app {
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: 20% auto;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header"
    "nav main"
}

.header {
  grid-area: header;
  text-align: center;
  font-size: 2em;
  font-weight: bold;
}

.nav {
  grid-area: nav;
  display: flex;
  flex-direction: column;

  a {
    font-weight: bold;
    color: black;

    &.router-link-exact-active {
      color: black;
    }
  }

  .button {
    
    margin: 5px auto;
      &.router-link-exact-active{
        border-color: #7957d5
      }
  }
}

.main {
  grid-area: main;
}
</style>
