import Question from './Question';


export default class CreateTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsCount: 1,
    };
  }

  appendQuestion(event) {
    event.preventDefault();
    this.setState({
      questionsCount: this.state.questionsCount + 1,
    });
  }

  submitHandler(event) {
    console.log(event.target);
  }

  render() {

    let inputQuestion = [];
    for (let i = 0; i < this.state.questionsCount; i++) {
      inputQuestion.push(<Question name={`question${i}`} key={i}/>);
    }

    return (
        <div class="testContainer">
          <form encType="multipart/form-data"
                method="post"
                id="TestCreate"
                ref="TestCreate"
                action="http://localhost:3000/tests/create"
                onSubmit={this.submitHandler}>

            <p><select size="1">
              <option disabled>Выберите героя</option>
              <option value="Нейронные сети">Нейронные сети</option>
              <option selected value="Механика полета">Механика полета</option>
              <option value="ТС САУ">ТС САУ</option>
              <option value="Математика">Математика</option>
            </select></p>
            <input type="text" placeholder="Название теста" />
            <hr/>
            {inputQuestion}
            <br />
            <br />
            <button onClick={this.appendQuestion.bind(this)}
                    style={{marginRight: '15px'}}>Добавить
              еще вопрос
            </button>
            <input type="submit" value="Создать тест"/>
          </form>
        </div>

    );
  }
}
