export function SubjectListItem(props) {
	let lectures = props.lectures.map( (lecture, index) =>
		<li key={index}>{lecture.lecture_name}</li>);
	return(
		<li>
			{ props.subject_name }
			<ul>
				{lectures}
			</ul>
		</li>
	);
}
