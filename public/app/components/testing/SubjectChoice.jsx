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
    debugger;
    let selectorItems = this.state.subjects.map((subject, i) => {
      return <option value={i}>{subject}</option>;
    });

    return (
        <div>
          <p>
            <select size="1">
              <option selected disabled key={-1}>Выберите предмет</option>
              {selectorItems}
            </select>
          </p>
          <button>GO!</button>
        </div>
    );
  }

}
