import axios from 'axios';
import MenuItem from './MenuItem';

import '../../../css/sidebar';

export default class SubjectsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
    };
  };

  componentWillMount() {
    axios.get('/subjects/withlectures').then((response) => {
      this.setState({
        subjects: response.data,
      });
    });
  }

// {lectureId || subjectId ? this.props.children : null}

  render() {
    // let {subjectId, lectureId} = this.props.params;
    let subjects = this.state.subjects.map((subject, index) =>
        <MenuItem {...subject} key={index}/>);

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
