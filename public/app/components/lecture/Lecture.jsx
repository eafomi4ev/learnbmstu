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
    this.subjectName = '';
    this.lectureName = ';'
    this.lecturePath = '';
  }

  getLecturePath() {
    let subjectId = +this.props.routeParams.subjectId;
    let lectureId = +this.props.routeParams.lectureId;
    let lecturePath = '';
    this.props.subjects.forEach((subject, i) => {
      if(subject.subject_id === subjectId) {
        this.subjectName = subject.subject_name;
        subject.lectures.forEach((lecture, i) => {
          if(lecture.lecture_id === lectureId) {
            this.lecturePath = lecture.lecture_path;
            this.lectureName = lecture.lecture_name;
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
            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: '150%'}}><span style={{marginLeft: '50px'}}>{`${this.subjectName} - ${this.lectureName}`}</span></div>
            <br/>
            <embed
                src={`${config.baseUrl}/pdf${this.lecturePath}`}
                width="850" height="570"
                type="application/pdf"/>
          </div>
        </div>
    );
  }
}
