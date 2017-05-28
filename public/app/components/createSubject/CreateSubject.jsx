import '../../../js/fileform';

import axios from 'axios';
import InputLectureItem from './InputLectureItem';
import InputSubjectName from './InputSubjectName';

export default class CreateSubject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lecturesCount: 1,
    };
  }

  appendLectureField(event) {
    event.preventDefault();
    this.setState({
      lecturesCount: this.state.lecturesCount + 1,
    });
  }

  submitHandler(event) {
    event.preventDefault();
    let subjectName = document.getElementsByName('subjectName')[0].value;
    axios.post('/subjects/create', {subjectName: subjectName}).
        then((response) => {
          let fileInputs = $('input:file');
          let lecturesNameInputs = $('input:text');
          for (let i = 0; i < fileInputs.length; i++) {
            let data = new FormData();
            data.append('file', fileInputs[i].files[0]);
            data.append('lectureName', lecturesNameInputs[i+1].value);
            data.append('subjectName', subjectName);
            data.append('subjectId', response.data.id);
            axios.post('/lectures/upload', data, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
          }
        }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    let inputLectures = [];
    for (let i = 0; i < this.state.lecturesCount; i++) {
      inputLectures.push(<InputLectureItem name={`lecture${i}`} key={i}/>);
    }
    return (
        <div class="lectureContainer">
          <form encType="multipart/form-data"
                method="post"
                id="SubjectCreate"
                ref="SubjectCreate">
            <InputSubjectName name="subjectName"/>
            <br />
            {inputLectures}
            <br />
            <button onClick={this.appendLectureField.bind(this)}
                    style={{marginRight: '15px'}}>Добавить
              еще лекцию
            </button>
            <input type="button" onClick={this.submitHandler.bind(this)}
                   value="Создать предмет"/>
          </form>
        </div>
    );
  }
}
