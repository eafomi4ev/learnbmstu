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
      questionIndex: -1,
      userAnswers: [],

    };
    this.answers = [];
    // let subjectId = this.props.routeParams.subjectId;
    // let p = actions.getTest(subjectId);
    // this.props.dispatch(p);
  }

  componentWillMount() {
    console.log('componentWillMount()');
    console.log(this.props);
    debugger;
  }

  componentWillUpdate() {
    console.log('componentWillUpdate()');
    console.log(this.props);
  }

  componentDidMount() {
    console.log('componentDidMount()');
    console.log(this.props);

  }

  componentDidUpdate() {
    console.log('componentDidUpdate()');
    console.log(this.props);
    let userId = this.props.user.userId;
    let testId = this.props.test.testId;
    let p = actions.testing.startTesting(userId, testId);
    this.props.dispatch(p);
  }

  render() {
    if (this.props.test) {

      this.answers = this.props.test.questions[0].answers.map((answer) => {
        return <Answer questionId={this.props.test.questions[0].questionId}
                       answerId={answer.answerId}
                       answerText={answer.answerText}/>
      });
    }
    return (
        <div>
          <form name="test" method="post" action="">
            <div>
              {this.props.test &&
              <div>
                <span>{this.props.test.subjectName}: {this.props.test.testName}</span>
                <hr/>
                <div>
                  Вопрос: {this.props.test.questions[0].questionText}
                  <br/>
                  {this.answers}
                </div>
              </div>}

            </div>
            <br/>

          </form>
        </div>
    );
  }

}
