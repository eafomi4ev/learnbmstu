import {Link} from 'react-router';

const answer = (props) => {
  return (
      <span>
      <input type="radio"
             name={props.questionId}
             value={props.answerId}/>
        {props.answerText}
        <br/>
      </span>

  );
};

export default answer;
