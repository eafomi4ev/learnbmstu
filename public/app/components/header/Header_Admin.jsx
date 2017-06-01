import {Link} from 'react-router';

const headerAdmin = (props) => {
  if (props.user && props.user.rolename === 'editor')
    return (
        <li class="dropdown">
          <a href="" class="dropdown-toggle"
             data-toggle="dropdown">Администрирование <b
              class="caret"></b></a>
          <ul class="dropdown-menu">
            <li><Link to='/subjects/create'>Создать предмет</Link>
            </li>
            <li><Link to=''>Редактировать предмет</Link>
            </li>
            <li><Link to=''>Удалить предмет</Link>
            </li>
            <li class='divider'></li>
            <li><Link to='/tests/create'>Создать тест</Link></li>
            <li><Link to=''>Удалить тест</Link></li>
          </ul>
        </li>
    );
  return null;

};

export default headerAdmin;
