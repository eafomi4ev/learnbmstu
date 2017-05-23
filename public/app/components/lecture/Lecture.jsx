export default class Lecture extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <div>{this.props.params.subject}: {this.props.params.lecture}
            <br/>
            <embed
                src="http://www.tsu.ru/upload/medialibrary/1ae/gost_2.114_95.pdf"
                width="850" height="600"/>
          </div>
        </div>
    );
  }
}
