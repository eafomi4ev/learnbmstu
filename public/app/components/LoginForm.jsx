import axios from 'axios';

export default class LoginForm extends React.Component {
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
      url: 'http://localhost:8080/users/login',
      data: {
        login: this.state.login,
        password: this.state.password,
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

	handlePasswordChange(event) {
		// console.log('Password was changed', event.target.value);
		this.setState({
			password: event.target.value,
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text"
            placeholder="login"
            value={this.state.login}
            onChange={this.handleLoginChange}/>
				<input type="text"
            placeholder="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}/>
				<button>Войти</button>
			</form>
		);
	}
}
