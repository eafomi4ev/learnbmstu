import axios from 'axios';
import config from '../../configs/main';

import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import * as actions from '../../actions';
import Answer from './Answer';

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
    this.timer = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // componentWillMount() {
  //   console.log('componentWillMount()');
  //   // console.log(this.props);
  // }
  //
  // componentWillUpdate() {
  //   console.log('componentWillUpdate()');
  //   // console.log(this.props);
  // }
  //
  // componentDidMount() {
  //   console.log('componentDidMount()');
  //   // console.log(this.props);
  //
  // }

  componentDidUpdate() {
    console.log('componentDidUpdate()');
    // console.log(this.props);
    debugger;
    if (!this.props.testing) {
      // Если тестирования нет в store, диспатчим собыите начала тестирования
      let userId = this.props.user.id;
      let testId = this.props.test.testId;
      let p = actions.testing.startTesting(userId, testId);
      this.props.dispatch(p);

      this.timer.hours = +this.props.test.testDuration.substr(0, 2);
      this.timer.minutes = +this.props.test.testDuration.substr(3, 2);
      this.timer.seconds = +this.props.test.testDuration.substr(6, 2);

      this.timer.hours = 0;
      this.timer.minutes = 1;
      this.timer.seconds = 2;
      this.startTime();
    }
  }

  nextQuestion() {
    debugger;
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
    axios.post('/tests/finish', {
      userTestingId: this.props.testing.id,
    });
  }

  startTime() {
    let hours = this.timer.hours;
    let minutes = this.timer.minutes;
    let seconds = this.timer.seconds;

    if (seconds !== 0) {
      seconds--;
    } else if (minutes !== 0) {
      minutes--;
      seconds = 59;
    } else if (hours !== 0) {
      hours--;
      minutes = 59;
      seconds = 59;
    }

    let hoursStr;
    let minutesStr;
    let secondsStr;

    hoursStr = hours < 10 ? "0" + hours : '' + hours;
    minutesStr = minutes < 10 ? "0" + minutes : '' + minutes;
    secondsStr = seconds < 10 ? "0" + seconds : '' + seconds;

    this.timer.hours = hours;
    this.timer.minutes = minutes;
    this.timer.seconds = seconds;

    document.getElementById('time').innerHTML = hoursStr + ':' + minutesStr +
        ':' + secondsStr;
    console.log('Вывел время');
    setTimeout(this.startTime, 1000);
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
                    id="time"></span></b>
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
            <button type="button" class="btn btn-danger">Закончить
              тестирование
            </button>
          </form>
        </div>
    );
  }

}
