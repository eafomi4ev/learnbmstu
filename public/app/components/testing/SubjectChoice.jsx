import {Link} from 'react-router';
import axios from 'axios';

import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import * as actions from '../../actions';
import { browserHistory } from 'react-router';

@connect((store) => {
  return {
    user: store.user.user,
    test: store.test.test,
    testing: store.testing.testing,
    subjects: store.subjects.subjects,
    choosenSubject: store.subjects.choosenSubject,
  }
})
@autobind()
export default class SubjectChoice extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange(event) {
    let toDispatch = actions.subjects.choose(event.target.value);
    this.props.dispatch(toDispatch);
  }



  handleClick(event) {
    // запрос на выдачу теста и помещение в стор
    event.preventDefault();
    let subjectId = this.props.choosenSubject;
    let p = actions.test.getTest(subjectId);
    this.props.dispatch(p);
    // запрос на создание тестирования и помещение в стор
    // переход на страницу отображение теста
  }

  componentWillMount() {
    let action = actions.subjects.unChoose();
    this.props.dispatch(action);
  }

  render() {
    let selectorItems = this.props.subjects.map((subject, i) => {
      return <option value={subject.subject_id} key={i}>{subject.subject_name}</option>;
    });

    return (
        <div>
          <p>
            <select size="1" onChange={this.handleChange}>
              <option selected disabled key={-1}>Выберите предмет</option>
              {selectorItems}
            </select>
            <select size="1">
              <option selected disabled key={-1}>Выберите модуль</option>
              <option key={0}>1</option>
              <option key={1}>2</option>
              <option key={2}>3</option>
              <option key={3}>4</option>
            </select>
          </p>

          <button onClick={this.handleClick}>Начать тестирование</button>
        </div>
    );
  }

}
