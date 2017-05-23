'use strict';

export default function InputSubjectName(props) {
  let style = {
    marginBottom: `40px`,
  };

  return (
      <div class="form-group">
        <p>Название предмета:</p>
        <input type="text" name={props.name} class="form-control" id="usr" style={style}/>
      </div>
  );
}
