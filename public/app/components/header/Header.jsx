import {Link} from 'react-router';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext(){
    return {
      cookies: this.props.cookies,
    };
  }

  static childContextTypes = {
    cookies: React.PropTypes.any
  };

  render() {
    return (
        <div class="row">
          <div class="col-md-12">
            <nav class="navbar navbar-default" role="navigation">
              <div class="container-fluid">
                <div class="collapse navbar-collapse"
                     id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/auth'>Тест авторизации</Link></li>
                    <li><Link to='/tests/start'>Пройти тест</Link></li>
                  </ul>

                  <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                      <a href="" class="dropdown-toggle"
                         data-toggle="dropdown">Администрирование <b
                          class="caret"></b></a>
                      <ul class="dropdown-menu">
                        <li><Link to='/subjects/create'>Создать предмет</Link></li>
                        <li><Link to='/tests/create'>Создать тест</Link></li>
                      </ul>
                    </li>
                    <li class="dropdown">
                      <a href="" class="dropdown-toggle"
                         data-toggle="dropdown">Профиль <b
                          class="caret"></b></a>
                      <ul class="dropdown-menu">
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/register'>Register</Link></li>
                        <li class="divider"></li>
                        <li><Link to='#'>Logout</Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          {this.props.children}
        </div>
    );
  }
}
