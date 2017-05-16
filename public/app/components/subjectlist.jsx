import axios from 'axios';
import {SubjectListItem} from './subjectlistitem';

export default class SubjectList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			subjects: [],
		};

		axios.get('http://localhost:8080/subjects').then((response) => {
			// console.log(response.data.subjects);
			this.setState({
				subjects: response.data.subjects,
			});
		});
	};

	render() {
		let subjects = this.state.subjects.map((subject, index) =>
			<SubjectListItem {...subject} key={index}/>);
		return (
			<div>
				<ul>{subjects}</ul>
			</div>
		);
	};
}
