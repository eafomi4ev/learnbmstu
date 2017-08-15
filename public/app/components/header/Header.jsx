import {Link} from 'react-router';
import HeaderLogin from './Header_Login';
import HeaderAdmin from './Header_Admin';

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
  }

  handleLogout(event) {
    event.preventDefault();
    let login = this.props.user.login;
    let p = actions.logout(login);
    this.props.dispatch(p);
  }

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
                    {this.props.user && <li><Link to='/tests/choice'>Пройти тест</Link></li>}
                  </ul>
                  <ul class="nav navbar-nav navbar-right">
                    <HeaderAdmin user={this.props.user} />
                    <HeaderLogin logout={this.handleLogout} user={this.props.user} />
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
    );
  }
}
