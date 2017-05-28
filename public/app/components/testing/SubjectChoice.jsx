import {Link} from 'react-router';
import axios from 'axios';

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
          </p>
          <Link to={`/tests/start/${this.state.chosenSubject}`}>GO!</Link>
        </div>
    );
  }

}
