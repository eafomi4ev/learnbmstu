import '../../css/hello';

export default class HelloComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class="test">Hello World!{this.props.title}</div>
		);
	}
}
