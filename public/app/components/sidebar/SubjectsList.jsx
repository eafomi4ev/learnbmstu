import '../../../css/sidebar';

import MenuItem from './MenuItem';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import * as actions from '../../actions/subjects';

@connect((store) => {
  return {
    subjects: store.subjects.subjects,
    isProcessing: store.subjects.isProcessing,
  };
})
@autobind()
export default class SubjectsList extends React.Component {
  constructor(props) {
    super(props);
  };

  componentWillMount() {

    let p = actions.getSubjects();
    this.props.dispatch(p);
  }

  render() {
    let subjects;
    if (this.props.subjects) {
      subjects = this.props.subjects.map((subject, index) =>
          <MenuItem {...subject} key={index}/>);
    }
    return (

        <div>
          <div class="nav-side-menu">

            <div class="menu-list">

              <ul id="menu-content" class="menu-content collapse out">

                {subjects}

              </ul>
            </div>
          </div>
        </div>
    );
  };
}
