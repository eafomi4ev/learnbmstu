// import * as React from 'react';

export function SubjectListItem(props) {
  // console.log(props);
  let lectures = props.lectures.map((lecture, index) =>
      <a href={lecture.lecture_path} key={index}>
        <li>{lecture.lecture_name}</li>
      </a>);
  return (
      <li>
        { props.subject_name }
        <ul>
          {lectures}
        </ul>
      </li>
  );
}
