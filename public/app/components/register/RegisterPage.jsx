import axios from 'axios';

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      passwordFirstTime: '',
      passwordSecondTime: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleFirstPasswordChange = this.handleFirstPasswordChange.bind(this);
    this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:8080/users/register',
      data: {
        login: this.state.login,
        password: this.state.passwordFirstTime,
      },
    }).then(function(response) {
      console.log(response);
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

  handleFirstPasswordChange(event) {
    // console.log('Password was changed', event.target.value);
    this.setState({
      passwordFirstTime: event.target.value,
    });
  }

  handleSecondPasswordChange(event) {
    this.setState({
      passwordSecondTime: event.target.value,
    });
  }

  render() {
    let rightPassword;
    if (this.state.passwordFirstTime === this.state.passwordSecondTime) {
      console.log(this.rightPassword, 'verno');
      rightPassword = 'Пароль верный';
    } else {
      console.log(this.rightPassword, 'neverno');
      rightPassword = 'Пароль неверный';
    }
    return (
        <form onSubmit={this.handleSubmit}>
          <input type="text"
                 placeholder="login"
                 value={this.state.login}/>

          <input type="text"
                 placeholder="password"
                 value={this.state.passwordFirstTime}
                 onChange={this.handleFirstPasswordChange}/>

          <input type="text"
                 placeholder="repeat password"
                 value={this.state.passwordSecondTime}
                 onChange={this.handleSecondPasswordChange}/>

          <span>{rightPassword}</span>
          <button>Войти</button>
        </form>
    );
  }
}
