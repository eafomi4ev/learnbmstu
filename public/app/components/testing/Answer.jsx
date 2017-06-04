import {Link} from 'react-router';



const answer = (props) => {
  return (
      <span>
      <input type="radio"
             name={props.questionId}
             value={props.answerId}
             style={{marginRight: '15px'}}/>
        {props.answerText}
        <br/>
      </span>

  );
};

export default answer;
