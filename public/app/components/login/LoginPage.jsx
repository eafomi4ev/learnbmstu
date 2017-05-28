import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import * as actions from '../../actions/auth';



import '../../../css/login';


@connect((store) => {
  return {
    user: store.user.user,
    isProcessing: store.user.isProcessing,
  }
})
@autobind()
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
    let login = this.refs.login.value;
    let password = this.refs.password.value;
    let p = actions.login(login, password);
    debugger;
    this.props.dispatch(p);
  }

  componentWillUpdate() {
    // this.props.user загружен и имеет id => redirect
    // if (this.props.isProcessing) {
    //   console.log('Логин', this.props.isProcessing);
    // }
    console.log('User');
    console.log(this);
  }

  render() {
    return (
        <div class="container" onSubmit={this.handleSubmit}>
          <form class="form-signin" role="form">
            <h2 class="form-signin-heading">Please sign in</h2>
            <input ref="login"
                   type="text"
                   class="form-control"
                   placeholder="Login"
                   required
                   autoFocus/>
            <input type="password"
                   class="form-control"
                   placeholder="Password"
                   required
                   ref="password"/>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign
              in
            </button>
          </form>
        </div>
    );
  }
}

