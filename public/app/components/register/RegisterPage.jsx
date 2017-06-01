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
    this.handleSecondPasswordChange = this.handleSecondPasswordChange.bind(
        this);
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

// <form onSubmit={this.handleSubmit}>
// <input type="text"
// placeholder="login"
// value={this.state.login}/>
//
// <input type="text"
// placeholder="password"
// value={this.state.passwordFirstTime}
// onChange={this.handleFirstPasswordChange}/>
//
// <input type="text"
// placeholder="repeat password"
// value={this.state.passwordSecondTime}
// onChange={this.handleSecondPasswordChange}/>
//
// <span>{rightPassword}</span>
// <button>Войти</button>
// </form>

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
        <div>
          <form class="form-horizontal" style={{marginTop: '30px'}}>
            <div class="form-group">
              <label class="control-label col-xs-3" for="name">ФИО</label>
              <div class="col-xs-8">
                <input type="text" class="form-control" id="name"
                       placeholder="Введите ФИО"/>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-xs-3" for="login">Логин:</label>
              <div class="col-xs-8">
                <input type="text" class="form-control" id="login"
                       placeholder="Введите имя"/>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-xs-3"
                     for="inputPassword">Пароль:</label>
              <div class="col-xs-8">
                <input type="password" class="form-control" id="inputPassword"
                       placeholder="Введите пароль"/>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-xs-3" for="confirmPassword">Подтвердите
                пароль:</label>
              <div class="col-xs-8">
                <input type="password" class="form-control" id="confirmPassword"
                       placeholder="Введите пароль ещё раз"/>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label col-xs-3">Группа:</label>
              <div class="col-xs-3">
                <select class="form-control">
                  <option selected disabled>Выберите группу</option>
                  <option>ИУ1-123</option>
                  <option>ИУ1-122</option>
                  <option>ИУ1-121</option>
                  <option>ИУ1-113</option>
                  <option>ИУ1-112</option>
                  <option>ИУ1-111</option>
                </select>
              </div>
            </div>
            <br />
            <div class="form-group">
              <div class="col-xs-offset-3 col-xs-8">
                <input type="submit" class="btn btn-primary"
                       value="Регистрация"/>
                <input type="reset" class="btn btn-default"
                       value="Очистить форму"/>
              </div>
            </div>
          </form>
        </div>
    );
  }
}
