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
  }
})
@autobind()
export default class SubjectChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      chosenSubject: '',
    };
  }

  setSubjectsToState() {
    axios.get('/subjects/withlectures').then((response) => {
      let subjects = [];
      for (let subject in response.data) {
        subjects.push(response.data[+subject]);
      }
      this.setState({
        subjects: subjects,
      });
    });
  }

  handleChange(event) {
    console.log('target', event.target.value);
    this.setState({
      chosenSubject: event.target.value,
    });
  }

  componentWillMount() {
    console.log('a');
    this.setSubjectsToState();
  }

  handleClick(event) {
    // запрос на выдачу теста и помещение в стор
    event.preventDefault();
    let subjectId = this.state.chosenSubject;
    let p = actions.test.getTest(subjectId);
    this.props.dispatch(p);
    // запрос на создание тестирования и помещение в стор
    browserHistory.push('/tests/start/'+subjectId);
    // переход на страницу отображение теста
  }

  render() {
    let selectorItems = this.state.subjects.map((subject, i) => {
      return <option value={subject.subject_id} key={i}>{subject.subject_name}</option>;
    });

    return (
        <div>
          <p>
            <select size="1" onChange={this.handleChange.bind(this)}>
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

          <Link onClick={this.handleClick}>GO!</Link>
        </div>
    );
  }

}
