import {Link} from 'react-router';

import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import * as actions from '../../actions/auth';

@connect((store) => {
  return {
    user: store.user.user,
    isProcessing: store.user.isProcessing,
  };
})
@autobind()
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.unAuthorizedItems = [];
    this.editorItems = [];
  }

  handleLogout(event) {
    event.preventDefault();
    let login = this.props.user.login;
    let p = actions.logout(login);
    this.props.dispatch(p);
  }

  checkAuthorizedUser() {
    if (this.props.user) {
      this.unAuthorizedItems = [];
    } else {
      this.unAuthorizedItems.push(<li><Link to='/login'>Login</Link></li>);
      this.unAuthorizedItems.push(<li><Link to='/register'>Register</Link>
      </li>);
      this.unAuthorizedItems.push(<li class="divider"></li>);
    }
  }

  render() {

    this.checkAuthorizedUser();
    return (
        <div class="row">
          <div class="col-md-12">
            <nav class="navbar navbar-default" role="navigation">
              <div class="container-fluid">
                <div class="collapse navbar-collapse"
                     id="bs-example-navbar-collapse-1">
                  <ul class="nav navbar-nav">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/tests/choice'>Пройти тест</Link></li>
                  </ul>

                  <ul class="nav navbar-nav navbar-right">
                    {this.props.user && this.props.user.rolename === 'editor' &&
                    <li class="dropdown">
                      <a href="" class="dropdown-toggle"
                         data-toggle="dropdown">Администрирование <b
                          class="caret"></b></a>
                      <ul class="dropdown-menu">
                        <li><Link to='/subjects/create'>Создать предмет</Link>
                        </li>
                        <li><Link to='/tests/create'>Создать тест</Link></li>
                      </ul>
                    </li>}
                    <li class="dropdown">
                      <a href="" class="dropdown-toggle"
                         data-toggle="dropdown">Профиль <b
                          class="caret"></b></a>
                      <ul class="dropdown-menu">
                        {!this.props.user && <li><Link to='/login'>Login</Link></li>}
                        {!this.props.user && <li >< Link to='/register'>Register</Link></li>}
                        {!this.props.user && <li class='divider'></li>}
                        <li><Link to='' onClick={this.handleLogout}>Выход</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
    );
  }
}
