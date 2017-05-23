import '../../../js/fileform';

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
    console.log(event.target);
  }

  render() {
    let inputLectures = [];
    for (let i = 0; i < this.state.lecturesCount; i++) {
      inputLectures.push(<InputLectureItem name={`lecture${i}`} key={i}/>);
    }
    console.log(inputLectures);
    return (
        <div class="lectureContainer">
          <form encType="multipart/form-data"
                method="post"
                id="SubjectCreate"
                ref="SubjectCreate"
                action="http://localhost:3000/lectures/upload"
                onSubmit={this.submitHandler}>
            <InputSubjectName name="subjectName"/>
            <br />
            {inputLectures}
            <br />
            <button onClick={this.appendLectureField.bind(this)}
                    style={{marginRight: '15px'}}>Добавить
              еще лекцию
            </button>
            <input type="submit" value="Создать предмет"/>
          </form>
        </div>

    );
  }
}
