//
//
//

import React , { Component } from 'react';


export default class Loading extends Component {

	componentDidMount() {
	  
	}

	render () {
		return (
			<div style={styles.container}>
				<p>加载中。。。</p>
			</div>
		)
	}
}

const styles = {
	container: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	}
}
