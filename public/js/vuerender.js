import Vue from './vendor/vue';

const xhr = new XMLHttpRequest();
xhr.onload = xhr.onerror = function() {
  if (this.status === 200) {
    // alert('success');
  } else {
    alert('error ' + this.status + ' ' + this.responseText);
  }
};

let subjects = {};
xhr.open('GET', '/subjectsandlectures', true);
xhr.send();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      // alert(xhr.responseText);
      subjects = JSON.parse(xhr.responseText);
      new Vue({
        el: '#main',
        data: subjects,
      });
    }
  }
};

// let subjects = {
//   subjects: [
//     {
//       subject_id: 1,
//       subject_name: 'Нейронные сети',
//       lectures: ['Введение', 'История развития', 'Структура нейрона'],
//     },
//     {
//       subject_id: 2,
//       subject_name: 'ТС САУ',
//       lectures: [
//         'Введение',
//         'История развития',
//         'Современные технические средства'],
//     },
//   ],
// };

// new Vue({
//   el: '#main',
//   data: subjects,
// });
