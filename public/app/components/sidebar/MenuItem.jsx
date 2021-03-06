'use strict';

// import * as React from 'react';
import {Link} from 'react-router';

export default function MenuItem(props) {
  let subject = props;
  let lectures = props.lectures.map((lecture, index) =>
      <Link to={`/subject/${subject.subject_id}/lecture/${lecture.lecture_id}`}
            key={index}
            name={lecture.lecture_name}>
        <li>{lecture.lecture_name}</li>
      </Link>);

  return (
      <div>
        <li data-toggle="collapse" data-target={'#lecture' + subject.subject_id}
            class="collapsed">
          <a href="#"><i class="fa fa-circle-o fa-lg" aria-hidden="true"></i> {subject.subject_name}
            <span class="arrow"></span></a>
        </li>
        <ul class="sub-menu collapse" id={'lecture' + subject.subject_id}>
          {lectures}
        </ul>
      </div>
  );
}
