'use strict';

export default function InputAnswer(props) {
  console.log(props);
  return (
      <div style={{display: 'inline', marginRight: '30px'}}>
        <input type="text" name={props.name} style={{width: '50%', marginRight: '10px'}} placeholder="Ответ"/>
        <span>
          <input type="radio" name={props.name} value="Правильный" />
          Правильный
        </span>
      </div>
  );
}
