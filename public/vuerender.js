import Vue from 'vue/dist/vue.esm.js';
import axios from 'axios';

axios.get('/subjects').then((response) => {
  let subjects = response.data;
  new Vue({
    el: '#main',
    data: subjects,
  });
});
