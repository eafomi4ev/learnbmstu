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
          <SubjectsList />
          <div class="col-md-offset-3 col-md-8">
            {this.props.children}
          </div>
        </div>
    );
  }
}
