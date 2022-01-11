import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Homepage from './pages/homepage/Homepage'
import Shop from './pages/shop/Shop'
import SignInSignUp from './pages/sign-in-sign-up/SignInSignUp'
import Header from './components/header/Header'

import { auth } from './firebase/firebase.utils'

import './App.css'


class App extends React.Component {

	constructor() {

		super()

		this.state = {
			currentUser: null
		}

	}

	unsubscribeFromAuth = null

	componentDidMount() {
		this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
			this.setState({ currentUser: user })
			console.log(user)
		})
	}

	componentWillUnmount() {
		this.unsubscribeFromAuth()
	}

	render() {
		return (
			<div>
				<Header currentUser={this.state.currentUser} />
				<Switch>
					<Route exact path='/' component={Homepage} />
					<Route path='/shop' component={Shop} />
					<Route path='/signin' component={SignInSignUp} />
				</Switch>
			</div>
		)
	}

}


export default App