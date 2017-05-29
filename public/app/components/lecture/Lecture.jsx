import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import * as actions from '../../actions/subjects';
import config from '../../configs/main';


@connect((store) => {
  return {
    subjects: store.subjects.subjects,
    isProcessing: store.subjects.isProcessing,
  };
})
@autobind()
export default class Lecture extends React.Component {
  constructor(props) {
    super(props);
    this.lecturePath = '';
  }

  getLecturePath() {
    let subjectId = +this.props.routeParams.subjectId;
    let lectureId = +this.props.routeParams.lectureId;
    let lecturePath = '';
    this.props.subjects.forEach((subject, i) => {
      if(subject.subject_id === subjectId) {
        subject.lectures.forEach((lecture, i) => {
          if(lecture.lecture_id === lectureId) {
            this.lecturePath = lecture.lecture_path;
            return;
          }
        });
      }
    });

  }

  render() {
    this.getLecturePath();
    let path = `${config.baseUrl}/pdf${this.lecturePath}`;
    debugger;
    return (
        <div>
          <div>
            <br/>
            <embed
                src={`${config.baseUrl}/pdf${this.lecturePath}`}
                width="850" height="600"
                type="application/pdf"/>
          </div>
        </div>
    );
  }
}
