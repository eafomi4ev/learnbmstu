'use strict';
import '../../../js/fileform';

import InputAnswer from './InputAnswer';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersCount: 1,
    };
  }

  appendAnswerField(event) {
    event.preventDefault();
    this.setState({
      answersCount: this.state.answersCount + 1,
    });
  }

  render() {
    let inputAnswer = [];
    for (let i = 0; i < this.state.answersCount; i++) {
      inputAnswer.push(<InputAnswer name={this.props.name} key={i}/>);
    }

    return (
        <div>
            <textarea class="form-control"
                      style={{minWidth: '100%', maxWidth: '100%'}}
                      name="questionText"
                      placeholder="Текст вопроса"></textarea>
          <p>
            <input type="file" name='{props.name}'
                   style={{display: 'inline', marginRight: '10px'}}/>
          </p>
          {inputAnswer}
          <button class="btn btn-default" onClick={this.appendAnswerField.bind(this)}>Добавить еще
            ответ
          </button>
          <hr/>
        </div>
    );
  };
}
