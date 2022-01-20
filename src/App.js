import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Homepage from './pages/homepage/Homepage'
import Shop from './pages/shop/Shop'
import SignInSignUp from './pages/sign-in-sign-up/SignInSignUp'
import Header from './components/header/Header'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

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
		this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth)

				userRef.onSnapshot((snapshot) => {
					this.setState({
						currentUser: {
							id: snapshot.id,
							...snapshot.data()
						}
					}, () => console.log(this.state))
				})
			} else {
				this.setState({ currentUser: userAuth })
			}
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
