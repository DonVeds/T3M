<template>
  <div class="edit-page">
    <p>This is editing tools for cat item</p>
    <hr>
    <div class="field">
      <label class="label">Кличка</label>
      <div class="control">
        <input class="input" type="text" placeholder="Kiт" v-model="cat.name">
      </div>
    </div>

    <div class="field">
      <label class="label">Порода</label>
      <div class="control">
        <input class="input" type="text" placeholder="Метис" v-model="cat.breed">
      </div>
    </div>

    <div class="field">
      <label class="label">Окрас</label>
      <div class="control">
        <input class="input" type="text" placeholder="Рыжий" v-model="cat.color">
      </div>
    </div>

    <div class="field">
      <label class="label">Пол</label>
      <div class="control">
        <div class="select">
          <select v-model="cat.gender">
            <option>Мальчик</option>
            <option>Девочка</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Возвраст</label>
      <div class="control">
        <input class="input" type="text" placeholder="2" v-model="cat.age">
      </div>
    </div>

    <div class="field">
      <label class="label">Комментарий</label>
      <div class="control">
        <textarea class="textarea" placeholder="Хороший" v-model="cat.comment"></textarea>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button v-on:click="edit(cat.name, cat.breed, cat.color, cat.gender, cat.age, cat.comment, cat.id)" class="edit-btn button is-link">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    edit: function (name, breed, color, gender, age, comment, id) {
      if (name.length<2 || breed.length<1 || !Number.isInteger(Number(age))) {
        alert("Невалидно")
      } else {
        document.querySelector(".edit-btn").classList.add("is-loading");
        let editedCat = {
          name,
          breed,
          color,
          gender,
          age: Number(age),
          comment,
          id
        }
        this.editCat(editedCat);
        setTimeout( () => this.$router.push({ name: 'Cat', params: { id: id } }), 500);
      }
    },
    ...mapMutations([
      "editCat"
    ])
  },
  computed: {
    cat: function() {
      return this.$store.state.cats.find(cat => cat.id == this.$route.params.id)
    }
  }
}
</script>

<style lang="scss">
.edit-page{
  width: 90%
}
</style>