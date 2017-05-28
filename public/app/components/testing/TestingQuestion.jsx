import axios from 'axios';
import config from '../../configs/main';

export default class TestingQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
      userChoise: [],
    };
  }

  getTest() {
    axios.get(config.baseUrl + `/tests/` + this.subjectId).then((res) => {
      console.log(res);
      this.setState({
        test: res.data,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  // componentWillMount() {
  //   this.subjectId = this.props.routeParams.subjectId;
  //   this.getTest();
  // }

  render() {
    return (
        <div>
          <span>FFFF</span>
        </div>
    );
  }

}
