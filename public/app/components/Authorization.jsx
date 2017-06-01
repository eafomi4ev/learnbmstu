import {connect} from 'react-redux';
import {autobind} from 'core-decorators';

const Authorization = (allowedRoles) => (WrappedComponent) => {
  @connect((store) => {
    return {
      user: store.user.user,
    }
  })
  @autobind()
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      debugger;
      const {role} = this.props.user;
      if (allowedRoles.includes(role)) {
        return (<WrappedComponent {...this.props} />);
      } else {
        return (<h1>No page for you!</h1>);
      }
    }
  }
};
export default Authorization;
