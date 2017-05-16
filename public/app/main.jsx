import HelloComponent from './components/hello';
import SubjectList from './components/subjectlist';

let app = document.getElementById('main');

ReactDOM.render(<SubjectList />, app);

// ReactDOM.render(<HelloComponent title="AAAA"/>, app);
