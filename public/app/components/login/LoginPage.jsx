import axios from 'axios';
import {connect} from 'react-redux';

import '../../../css/login';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('form is submitted. Login is', this.state.login);
    axios({
      method: 'post',
      url: 'http://localhost:3000/users/login',
      data: {
        login: this.state.login,
        password: this.state.password,
      },
    }).then(function(res) {
      console.log(res);
      // res.redirect('http://localhost:3000');
    }).catch(function(error) {
      console.log('Неправильный логин или пароль');
      // console.log(error);
    });
  }

  handleLoginChange(event) {
    // console.log('Login was changed', event.target.value);
    this.setState({
      login: event.target.value,
    });
  }

  handlePasswordChange(event) {
    // console.log('Password was changed', event.target.value);
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    console.log(this.props.testStore);
    return (
        <div class="container" onSubmit={this.handleSubmit}>
          <form class="form-signin" role="form">
            <h2 class="form-signin-heading">Please sign in</h2>
            <input ref={(input) => {this.login = input;}}
                   type="login"
                   class="form-control"
                   placeholder="Login"
                   required
                   autoFocus
                   value={this.state.login}
                   onChange={this.handleLoginChange}/>
            <input type="password"
                   class="form-control"
                   placeholder="Password"
                   required
                   onChange={this.handlePasswordChange}/>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign
              in
            </button>
          </form>
        </div>
    );
  }
}

export default connect(
    (state) => ({
      testStore: state,
    }),
    (dispatch) => ({}),
)(LoginPage);
