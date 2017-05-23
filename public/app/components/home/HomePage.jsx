import Header from '../header/Header';
import SubjectsList from '../sidebar/SubjectsList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <Header/>
          {this.props.children}
        </div>
    );
  }
}
