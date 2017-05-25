'use strict';

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
        subjects.push(response.data[+subject].subject_name);
      }
      console.log(subjects);
      this.setState({
        subjects: subjects,
      });

    });
  }

  componentWillMount() {
    this.setSubjectsToState();
    console.log(this.state.subjects);
  }

  render() {

    let selectorItems = this.state.subjects.map((subject, i) => {
      return <option key={i} value={subject}>{subject}</option>;
    });

    return (
        <div>
          <p>
            <select size="1">
              <option selected disabled>Выберите предмет</option>
              {selectorItems}
            </select>
          </p>
          <button>GO!</button>
        </div>
    );
  }

}
