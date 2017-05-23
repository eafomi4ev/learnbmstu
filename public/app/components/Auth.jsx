
export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.isAuth = false;
  }

  // componentDidMount(){
  //   // debugger;
  //   const coockieName = 'AAA';
  //   let currentCoockie = this.context.cookies.get();
  //   if (!currentCoockie) {
  //     // авторизация пользователя
  //   } else {
  //     // считанный токен шлем на сервер и там проверяется, авторизованный пользователь или нет
  //   }
  // }

  render() {
    if (this.isAuth) {
      return (
          <div>
            {this.props.children}
          </div>
      );
    }
    return null;
  }
}
