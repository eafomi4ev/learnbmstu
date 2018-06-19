let json = [
  {
    testid: 1,
    test_name: 'Вариант 5',
    subjectid: 1,
    subject_name: 'Нейронные сети',
    questionid: 2,
    question_text: 'Какого цвета трава ?',
    answerid: 3,
    answer_text: 'Зеленого',
    is_correct: true,
  },
  {
    testid: 1,
    test_name: 'Вариант 5',
    subjectid: 1,
    subject_name: 'Нейронные сети',
    questionid: 2,
    question_text: 'Какого цвета трава ?',
    answerid: 2,
    answer_text: 'Синего',
    is_correct: false,
  },
  {
    testid: 1,
    test_name: 'Вариант 5',
    subjectid: 1,
    subject_name: 'Нейронные сети',
    questionid: 3,
    question_text: 'Сколько будет 2+2 ?',
    answerid: 8,
    answer_text: '6',
    is_correct: false,
  },
  {
    testid: 1,
    test_name: 'Вариант 5',
    subjectid: 1,
    subject_name: 'Нейронные сети',
    questionid: 3,
    question_text: 'Сколько будет 2+2 ?',
    answerid: 7,
    answer_text: '5',
    is_correct: false,
  },
  {
    testid: 1,
    test_name: 'Вариант 5',
    subjectid: 1,
    subject_name: 'Нейронные сети',
    questionid: 3,
    question_text: 'Сколько будет 2+2 ?',
    answerid: 6,
    answer_text: '4',
    is_correct: true,
  },
  {
    testid: 1,
    test_name: 'Вариант 5',
    subjectid: 1,
    subject_name: 'Нейронные сети',
    questionid: 3,
    question_text: 'Сколько будет 2+2 ?',
    answerid: 5,
    answer_text: '3',
    is_correct: false,
  },
  {
    testid: 1,
    test_name: 'Вариант 5',
    subjectid: 1,
    subject_name: 'Нейронные сети',
    questionid: 2,
    question_text: 'Какого цвета трава ?',
    answerid: 4,
    answer_text: 'Красного',
    is_correct: false,
  }];

let test = {
  testId: json[0].testid,
  testName: json[0].test_name,
  subjectName: json[0].subject_name,
  questions: [],
};

let questions = {};

for (let i in json) {
  if (!questions.hasOwnProperty(json[i].question_text)) {
    questions[json[i].question_text] = {
      questionId: json[i].questionid,
      questionText: json[i].question_text,
      answers: [],
    };
  }
  questions[json[i].question_text].answers.push({
    answerId: json[i].answerid,
    answerText: json[i].answer_text,
    isCorrect: json[i].is_correct,
  });
}


for (let key in questions) {
  test.questions.push(questions[key]);
}

console.log('test', JSON.stringify(test, undefined, 2));

let result = {
  'testId': 1,
  'testName': 'Вариант 5',
  'subjectName': 'Нейронные сети',
  'questions': [
    {
      'questionId': 2,
      'questionText': 'Какого цвета трава ?',
      'answers': [
        {
          'answerId': 3,
          'answerText': 'Зеленого',
          'isCorrect': true,
        },
        {
          'answerId': 2,
          'answerText': 'Синего',
          'isCorrect': false,
        },
        {
          'answerId': 4,
          'answerText': 'Красного',
          'isCorrect': false,
        },
      ],
    },
    {
      'questionId': 3,
      'questionText': 'Сколько будет 2+2 ?',
      'answers': [
        {
          'answerId': 8,
          'answerText': '6',
          'isCorrect': false,
        },
        {
          'answerId': 7,
          'answerText': '5',
          'isCorrect': false,
        },
        {
          'answerId': 6,
          'answerText': '4',
          'isCorrect': true,
        },
        {
          'answerId': 5,
          'answerText': '3',
          'isCorrect': false,
        },
      ],
    },
  ],
};


