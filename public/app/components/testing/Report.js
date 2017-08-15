import axios from 'axios';

export default class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: '',
    };
  }

  componentDidMount() {
    axios.get('/tests/report/' + this.props.routeParams.id).then(({data}) => {
      debugger;
      let filepath = '/pdf'+data.filename.substr(data.filename.indexOf('/reports'));
      debugger;
      this.setState({
        filepath: filepath,
      });
    });
  }

  render() {
    return (
        <div>
          <embed
              src={`${this.state.filepath}`}
              width="850" height="600"
              type="application/pdf"/>
        </div>
    );
  }
}
