export default class Lecture extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let pathToLecture = `http://localhost:3000/public/lectures/${this.props.params.subjectName}/${this.props.params.lectureName}`;
    return (
        <div>
          <div>{this.props.params.subjectName}: {this.props.params.lectureName.substring(
              0, this.props.params.lectureName.length - 4)}
            <br/>
            <embed
                src={pathToLecture}
                width="850" height="600"/>
          </div>
        </div>
    );
  }
}
