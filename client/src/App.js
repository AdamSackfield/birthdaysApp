import React, { Component, Fragment } from 'react';
import './App.css';
import Main from './containers/main';
import AddBirthday from './containers/addBirthday';

class App extends Component {
	render() {
		return (
			<Fragment>
				<Main />
				<AddBirthday />
			</Fragment>
		);
	}
}

export default App;
