import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Router>
          <div>
            <Link to='/login'>Login</Link>
            <Link to='#'>Logout</Link>
            <Link to='/register'>Register</Link>
            <hr/>

            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
          </div>
        </Router>
    );
  }
}
