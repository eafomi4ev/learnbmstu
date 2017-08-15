

export default class HomePageContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <h1 style={{textAlign: 'center'}}>Система дистанционного обучения</h1>
          <h1 style={{textAlign: 'center'}}>МГТУ им. Н.Э. Баумана</h1>
          <p style={{textAlign: 'center', marginTop: '30px'}}><img src="/gerb.png" width="256" height="300"/></p>
        </div>
    );
  }
}
