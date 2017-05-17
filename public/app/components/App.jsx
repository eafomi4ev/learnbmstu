import Header from './Header';
import SubjectsList from './SubjectsList';

// import LoginForm from './LoginForm';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <Header />
          <SubjectsList />
        </div>
    );
  }
}
