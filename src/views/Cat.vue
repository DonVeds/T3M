<template>
  <div class="cat-page">
    <p>This is cat from main page</p>
    <hr>
    <h1 class="title">Кличка: {{cat.name}}</h1>
    <h2 class="subtitle">Порода: {{cat.breed}}</h2>
    <p>Окрас: {{cat.color}}</p>
    <p>Пол: {{cat.gender}}</p>
    <p>Возвраст: {{cat.age}}</p>
    <p>Комментарий: {{cat.comment}}</p>
    <div class="control">
      <button v-on:click="showDeleteModal" class="button is-danger">Delete</button>
    </div>
    <div class="modal-delete-cat modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Delete</p>
        </header>
        <section class="modal-card-body">
          <p>Подтверждение удаления кота по кличке {{cat.name}}</p>
        </section>
        <footer class="modal-card-foot">
          <button v-on:click="commitDelete(cat)" class="button is-danger">Подтвердить</button>
          <button v-on:click="hideDeleteModal" class="button">Отмена</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  computed: {
    cat: function() {
      return this.$store.state.cats.find(cat => cat.id == this.$route.params.id)
    }
  },
  methods: {
    showDeleteModal: function() {
      document.querySelector(".modal-delete-cat").classList.add("is-active");
    },
    hideDeleteModal: function() {
      document.querySelector(".modal-delete-cat").classList.remove("is-active");
    },
    commitDelete: function(cat) {
      this.deleteCat(cat);
      this.unselectCat();
      this.$router.push({ name: 'Home' })
    },
    ...mapMutations([
      "deleteCat", "unselectCat"
    ])
  },
}
</script>