import {Link} from 'react-router';

const headerLogin = (props) => {
 return(
     <li class="dropdown">
       <a href="" class="dropdown-toggle"
          data-toggle="dropdown">Профиль
       </a>
       {!props.user ?
       <ul class="dropdown-menu">
         <li><Link to='/login'>Login</Link></li>
         <li>< Link to='/register'>Register</Link></li>
       </ul> :
       <ul class="dropdown-menu">
         <li><Link to='' onClick={props.logout}>Выход</Link>
         </li>
       </ul>}
     </li>
 );
};

export default headerLogin;
