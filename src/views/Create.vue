<template>
  <div class="create-page">
    <p>Create new cat</p>
    <hr>
    <div class="field">
      <label class="label">Кличка</label>
      <div class="control">
        <input class="input" type="text" placeholder="Kiт" v-model="name">
      </div>
      <p v-if="name.length<2" class="help is-danger">Имя не может быть пустым полем и быть короче 2-х символов</p>
    </div>

    <div class="field">
      <label class="label">Порода</label>
      <div class="control">
        <input class="input" type="text" placeholder="Метис" v-model="breed">
      </div>
      <p v-if="breed.length<1" class="help is-danger">Пол является обязательным параметром</p>
    </div>

    <div class="field">
      <label class="label">Окрас</label>
      <div class="control">
        <input class="input" type="text" placeholder="Рыжий" v-model="color">
      </div>
    </div>

    <div class="field">
      <label class="label">Пол</label>
      <div class="control">
        <div class="select">
          <select v-model="gender">
            <option>Мальчик</option>
            <option>Девочка</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Возвраст</label>
      <div class="control">
        <input class="input" type="text" placeholder="2" v-model="age">
      </div>
      <p v-if="!Number.isInteger(Number(age))" class="help is-danger">Возвраст не может быть дробным числом</p>
    </div>

    <div class="field">
      <label class="label">Комментарий</label>
      <div class="control">
        <textarea class="textarea" placeholder="Хороший" v-model="comment"></textarea>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button v-on:click="create(name, breed, color, gender, age, comment)" class="create-btn button is-link">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data: function () {
    return {
      name    : "",
      breed   : "",
      color   : "",
      gender  : "",
      age     : 0,
      comment : ""
    }
  },
  methods: {
    create: function (name, breed, color, gender, age, comment) {
      if (name.length<2 || breed.length<1 || !Number.isInteger(Number(age))) {
        alert("Невалидно")
      } else {
        document.querySelector(".create-btn").classList.add("is-loading");
        let newCat = {
          name,
          breed,
          color,
          gender,
          age: Number(age),
          comment,
          id: this.$store.state.cats.length + 1
        }
        this.selectCat(newCat);
        this.addCat(newCat);
        setTimeout( () => this.$router.push({ name: 'Cat', params: { id: newCat.id }}), 500);
      }
    },
    ...mapMutations([
      "addCat", "selectCat"
    ])
  }
  
  
}
</script>

<style lang="scss">
.create-page{
  width: 90%
}
</style>