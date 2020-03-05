<template>
  <div class="home-page">
    <p>This is list of cats</p>
    <hr>
    <div class="select">
      <select v-on:change="filtred" v-model="selectedGender">
        <option v-for="gender in allGenders" :key="gender">{{gender}}</option>
      </select>
    </div>
    <div class="select">
      <select v-on:change="filtred" v-model="selectedColor">
        <option v-for="color in allColors" :key="color">{{color}}</option>
      </select>
    </div>
    <div class="select">
      <select v-on:change="filtred" v-model="selectedBreed">
        <option v-for="breed in allBreeds" :key="breed">{{breed}}</option>
      </select>
    </div>
    <div class="control">
      <button v-on:click="reset" class="edit-btn button is-link">Reset</button>
    </div>
    <div class="cats">
      <div
        class="card cat"
        v-for="cat in pagination"
        :key="cat.id"
        v-on:click="goToCat(cat)"
      >
        <div class="card-image">
        
        </div>
        
        <p class="title is-6">{{ cat.name }}</p>
        <p v-if="cat.breed.length>=1" class="subtitle is-6">{{ cat.breed }}</p>
        <p v-if="cat.color.length>=1" >Окрас: {{cat.color}}</p>
        <p v-if="cat.gender.length>=1" >Пол: {{cat.gender}}</p>
        <p v-if="cat.age>0">Возвраст: {{cat.age}}</p>
        <p v-if="cat.comment.length>=1" class="card-footer">
          {{cat.comment}}
        </p>
      </div>
    </div>
    <hr>
    <nav class="pagination" role="navigation" aria-label="pagination">
      <button @click="previousPage" class="pagination-previous" :disabled="currentPage == 1" >Previous</button>
      <button @click="nextPage" class="pagination-next" :disabled="currentPage == totalPages" >Next page</button>
      <ul class="pagination-list">
        <li>
          <a class="pagination-link is-current" aria-label="Page 1" aria-current="page">{{currentPage}}</a>
        </li>
      </ul>  
    </nav>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["allGenders", "allColors", "allBreeds" , "allCats"]),
    pagination() {
      let list = this.renderList.slice(this.showFrom, this.showTo);
      this.totalPages = Math.ceil(this.renderList.length / 10)
      return list
    } 
  },
  methods: {
    filtred() {
      this.renderList = this.allCats.filter((elem)=>{
        if (this.selectedGender.length > 0 && this.selectedColor.length > 0 && this.selectedBreed.length > 0) {
          if (elem.gender == this.selectedGender && elem.color == this.selectedColor && elem.breed == this.selectedBreed ) { return elem.gender && elem.color && elem.breed}
        } else if (this.selectedColor.length > 0 && this.selectedBreed.length > 0) {
          if (elem.color == this.selectedColor && elem.breed == this.selectedBreed) { return elem.color && elem.breed }
        } else if (this.selectedGender.length > 0 && this.selectedBreed.length > 0) {
          if (elem.gender == this.selectedGender && elem.breed == this.selectedBreed) { return elem.gender && elem.breed }
        } else if (this.selectedGender.length > 0 & this.selectedColor.length > 0) {
          if (elem.gender == this.selectedGender && elem.color == this.selectedColor) { return elem.gender && elem.color }
        } else if (this.selectedBreed.length > 0) {
          if (elem.breed == this.selectedBreed) { return elem.breed }
        } else if (this.selectedGender.length > 0) {
          if (elem.gender == this.selectedGender) { return elem.gender }
        } else if (this.selectedColor.length > 0) {
          if (elem.color == this.selectedColor) { return elem.color }
        }
      })
    },
    goToCat(cat) {
      this.selectCat(cat)
      this.$router.push({ name: 'Cat', params: { id: cat.id } })
    },
    ...mapMutations([
      "selectCat"
    ]),
    reset() {
      this.selectedGender = ""
      this.selectedColor = ""
      this.selectedBreed = ""
      this.renderList = this.$store.state.cats
    },
    nextPage() {
      if (this.currentPage != this.totalPages) {
        this.showFrom = (this.currentPage * 10);
        this.currentPage = this.currentPage + 1;
        this.showTo = (this.currentPage * 10)
      }
    },
    previousPage() {
      if (this.currentPage != 1) {
        this.showFrom = ((this.currentPage - 2) * 10);
        this.currentPage = this.currentPage - 1;
        this.showTo = (this.currentPage * 10)
      }
    }
  },
  data: function() {
    return {
      renderList: this.$store.state.cats,
      selectedGender: "",
      selectedColor: "",
      selectedBreed: "",
      showFrom: 0,
      showTo: 10,
      totalPages: 0,
      currentPage: 1
    }
  }
}
</script>

<style lang="scss">
.cats { 
  display: flex;
  flex-wrap: wrap;
  align-content: flex-end;
}

.cat {
  width: 300px;
  padding: 10px;
  margin: 10px;
}

.select {
  margin: 1px
}

.control {
  margin : 1px
}
</style>
