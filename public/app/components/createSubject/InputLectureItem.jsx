'use strict';
import '../../../js/fileform';

export default function InputLectureItem(props) {
  return (
      <p>
        <input type="file" name={props.name} style={{display: 'inline', marginRight: '10px'}}/>
        <input type="text" name={props.name} style={{width: '50%'}} placeholder="Название лекции"/>
      </p>
  );
}
