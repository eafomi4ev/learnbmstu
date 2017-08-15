import axios from 'axios';
import config from '../../configs/main';
import {browserHistory} from 'react-router';

import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import * as actions from '../../actions';
import Answer from './Answer';
import moment from 'moment';

@connect((store) => {
  return {
    test: store.test.test,
    user: store.user.user,
    testing: store.testing.testing,
  };
})
@autobind()
export default class TestingQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      userAnswers: [],
    };
    this.answers = [];
  }

  componentDidUpdate() {
    console.log('componentDidUpdate()');
    // console.log(this.props);
    if (!this.props.testing) {
      // Если тестирования нет в store, диспатчим собыите начала тестирования
      let userId = this.props.user.id;
      let testId = this.props.test.testId;
      let time = actions.testing.startTime(this.props.test.testDuration);
      this.props.dispatch(time);
      let p = actions.testing.startTesting(userId, testId);
      this.props.dispatch(p);
      if(!this.timerLink) {
        this.startTime();
      }
    }
  }

  nextQuestion() {
    let asnwerInput = $(
        `input[name=${this.props.test.questions[this.state.questionIndex].questionId}]:checked`)[0];
    console.log('userTestingId', this.props.testing.id);
    console.log('answerId', asnwerInput.value);
    console.log('questionId', asnwerInput.name);
    axios.post('/tests/set/answer', {
      userTestingId: this.props.testing.id,
      answerId: +asnwerInput.value,
      questionId: +asnwerInput.name,
    }).then((res) => {
      console.log('Ответ записан.');
      console.log(res);
    });
    this.setState({
      questionIndex: this.state.questionIndex <
      this.props.test.questions.length - 1
          ? this.state.questionIndex + 1
          : this.props.test.questions.length - 1,
    });
    if (this.state.questionIndex === this.props.test.questions.length - 1) {
      this.finishTesting();
    }
  }

  finishTesting() {
    clearInterval(this.timerLink);
    axios.post('/tests/finish', {
      userTestingId: this.props.testing.id,
    });
    browserHistory.push('/tests/reportpdf/' + this.props.testing.id);
  }

  startTime() {
    this.timerLink = setInterval(()=> {
      debugger;
      if (!this.props.testing.time) {
        return;
      }
      let time = actions.testing.tickTimer(this.props.testing.time);
      this.props.dispatch(time);
    }, 1000);
  }

  render() {
    if (this.props.test) {
      this.answers = this.props.test.questions[this.state.questionIndex].answers.map(
          (answer) => {
            return <Answer
                questionId={this.props.test.questions[this.state.questionIndex].questionId}
                answerId={answer.answerId}
                answerText={answer.answerText}/>;
          });
    }
    return (
        <div>
          <form name="test" method="post" action="">
            <div>
              {this.props.test &&
              <div>
                <span>{this.props.test.subjectName}: {this.props.test.testName},
                  Вопрос {this.state.questionIndex + 1} из {this.props.test.questions.length}
                </span>
                <b style={{marginLeft: '15px'}}>Время до конца теста: <span
                    id="time">{this.props.testing && this.props.testing.time && this.props.testing.time.format('HH:mm:ss')}</span></b>
                <hr/>
                <div>
                  Вопрос: {this.props.test.questions[this.state.questionIndex].questionText}
                  <br/>
                  {this.answers}
                </div>
              </div>}

            </div>
            <br/>
            <button onClick={this.nextQuestion} type="button"
                    class="btn btn-success"
                    style={{marginRight: '10px'}}>Следующий вопрос
            </button>
            <button onClick={this.finishTesting}
                    type="button"
                    class="btn btn-danger">Закончить
              тестирование
            </button>
          </form>
        </div>
    );
  }

}

// ПОПЫТКА СДЕЛАТЬ ТАЙМЕР ЧЕРЕЗ REDUX
// import axios from 'axios';
// import config from '../../configs/main';
//
// import {connect} from 'react-redux';
// import {autobind} from 'core-decorators';
// import * as actions from '../../actions';
// import Answer from './Answer';
//
// @connect((store) => {
//   return {
//     test: store.test.test,
//     user: store.user.user,
//     testing: store.testing.testing,
//   };
// })
// @autobind()
// export default class TestingQuestion extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       questionIndex: 0,
//       userAnswers: [],
//     };
//     this.timer = {
//       hours: 0,
//       minutes: 0,
//       seconds: 0,
//     };
//   }
//
//   componentDidUpdate() {
//     console.log('componentDidUpdate()');
//     // console.log(this.props);
//     if (!this.props.testing) {
//       // Если тестирования нет в store, диспатчим собыите начала тестирования
//       let userId = this.props.user.id;
//       let testId = this.props.test.testId;
//       let p = actions.testing.startTesting(userId, testId);
//       this.props.dispatch(p);
//
//       // Формируем и запускаем таймер
//
//       // this.timer.hours = +this.props.test.testDuration.substr(0, 2);
//       // this.timer.minutes = +this.props.test.testDuration.substr(3, 2);
//       // this.timer.seconds = +this.props.test.testDuration.substr(6, 2);
//     }
//     if (!this.props.testing.timer) {
//       let action = actions.testing.startTime(this.props.test.testDuration);
//       this.props.dispatch(action);
//     } else if(!this.props.testing.timer.tick){
//       debugger;
//       setTimeout(this.props.dispatch(
//           actions.testing.tickTimer(this.props.testing.timer)), 1000);
//     }
//
//   }
//
//   nextQuestion() {
//     let asnwerInput = $(
//         `input[name=${this.props.test.questions[this.state.questionIndex].questionId}]:checked`)[0];
//     console.log('userTestingId', this.props.testing.id);
//     console.log('answerId', asnwerInput.value);
//     console.log('questionId', asnwerInput.name);
//     axios.post('/tests/set/answer', {
//       userTestingId: this.props.testing.id,
//       answerId: +asnwerInput.value,
//       questionId: +asnwerInput.name,
//     }).then((res) => {
//       console.log('Ответ записан.');
//       console.log(res);
//     });
//     this.setState({
//       questionIndex: this.state.questionIndex <
//       this.props.test.questions.length - 1
//           ? this.state.questionIndex + 1
//           : this.props.test.questions.length - 1,
//     });
//     if (this.state.questionIndex === this.props.test.questions.length - 1) {
//       this.finishTesting();
//     }
//   }
//
//   finishTesting() {
//     axios.post('/tests/finish', {
//       userTestingId: this.props.testing.id,
//     });
//   }
//
//   render() {
//     let time = `Неопределено`;
//     if(this.props.testing && this.props.testing.timer) {
//       time = `${this.props.testing.timer.hours}:${this.props.testing.timer.minutes}:${this.props.testing.timer.seconds}`;
//     }
//     let answers = null;
//     if (this.props.test) {
//       answers = this.props.test.questions[this.state.questionIndex].answers.map(
//           (answer) => {
//             return <Answer
//                 questionId={this.props.test.questions[this.state.questionIndex].questionId}
//                 answerId={answer.answerId}
//                 answerText={answer.answerText}/>;
//           });
//     }
//     return (
//         <div>
//           <form name="test" method="post" action="">
//             <div>
//               {this.props.test &&
//               <div>
//                 <span>{this.props.test.subjectName}: {this.props.test.testName},
//                   Вопрос {this.state.questionIndex + 1}
//                   из {this.props.test.questions.length}
//                 </span>
//                 <b style={{marginLeft: '15px'}}>Время до конца теста:
//                   <span>
//                     {time}
//                   </span>
//                 </b>
//                 <hr/>
//                 <div>
//                   Вопрос: {this.props.test.questions[this.state.questionIndex].questionText}
//                   <br/>
//                   {answers}
//                 </div>
//               </div>}
//
//             </div>
//             <br/>
//             <button onClick={this.nextQuestion} type="button"
//                     class="btn btn-success"
//                     style={{marginRight: '10px'}}>Следующий вопрос
//             </button>
//             <button type="button" class="btn btn-danger">Закончить
//               тестирование
//             </button>
//           </form>
//         </div>
//     );
//   }
//
// }
