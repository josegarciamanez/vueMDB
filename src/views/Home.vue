<template>
<div>
  <div class="row">
    <div class="input-field col l6 offset-l3 center">
      <input type="text" placeholder="Buscar Película ..." v-model="titulo" @keyup.enter="getPelis" />
      <i class="material-icons small">search</i>
    </div>
  </div>
  <div class="row">
    <div v-for="peli in pelis.results" :key="peli.id" class="col l3" v-if="peli.poster_path">
      <div class="card">
        <div class="card-image">
          <img :src="'https://image.tmdb.org/t/p/w300'+peli.poster_path">
          <span class="card-title">{{peli.title}}</span>
        </div>
        <div class="card-content">
          <p>{{peli.overview | truncate(300)}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="containerPagination" v-if="this.titulo !== ''" >
    <paginate :page-count="this.pageNumber" :page-range="5" :click-handler="functionName" :prev-text="'<'" :next-text="'>'" :container-class="'pagination'">
    </paginate>
  </div>
  <pre>{{$data}}</pre>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: "home",
  components: {},
  data() {
    return {
      url: 'https://image.tmdb.org/t/p/w500',
      titulo: '',
      pelis: [],
      errors: [],
      pageNumber: null,
      pageActual: null,
      isActive: false
    }
  },
  methods: {
    getPelis: function() {
      if (this.titulo !== '') {
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=fcfbdbe8a826235ce7358cfa2383365b&language=es-ES&query=${this.titulo}&page=1&include_adult=false`)
          .then(response => {
            this.pelis = response.data
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  },
  updated() {
    if (this.titulo !== '') {
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=fcfbdbe8a826235ce7358cfa2383365b&language=es-ES&query=${this.titulo}&page=1&include_adult=false`)
        .then(response => {
          this.pageActual = response.data.page
          if (this.pageActual = 1) {
            this.isActive = true
          }
          this.pelis = response.data
          this.pageNumber = this.pelis.total_pages
          if (this.titulo === '') {
            this.pelis = []
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}

i {
  color: #673ab7;
}

.card {
  height: 720px;
}

.card-title {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  width: 100%;
}

input:focus {
  color: #673ab7;
  border-bottom: 1px solid #673ab7 !important;
}

.containerPagination {
  margin: auto auto;
  text-align: center;
}
</style>
