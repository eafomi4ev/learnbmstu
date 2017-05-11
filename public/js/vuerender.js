import Vue from './vendor/vue';

let subjects = {
  subjects: [
    {
      subject_id: 1,
      subject_name: 'Нейронные сети',
      lectures: ['Введение', 'История развития', 'Структура нейрона'],
    },
    {
      subject_id: 2,
      subject_name: 'ТС САУ',
      lectures: [
        'Введение',
        'История развития',
        'Современные технические средства'],
    },
  ],
};

new Vue({
  el: '#main',
  data: subjects,
});