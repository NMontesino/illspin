import React from 'react'

import FormInput from '../form-input/FormInput'
import CustomButton from '../custom-button/CustomButton'

import { signInWithGoogle } from '../../firebase/firebase.utils'

import './SignIn.scss'

class SignIn extends React.Component {
	constructor() {
		super()

		this.state = {
			email: '',
			password: ''
		}
	}

	handleSubmit = (e) => {
		e.preventDefault()

		this.setState({ email: '', password: '' })
	}

	handleChange = (e) => {
		const { name, value } = e.target

		this.setState({ [name]: value })
	}

	render() {
		return (
			<div className='sign-in'>
				<h2 className='title'>I already have an account</h2>
				<span>Sign in with your email and password</span>

				<form onSubmit={this.handleSubmit}>
					<FormInput
						name='email'
						type='email'
						value={this.state.email}
						required
						handleChange={this.handleChange}
						label='email'
					/>
					<FormInput
						name='password'
						type='password'
						value={this.state.password}
						required
						handleChange={this.handleChange}
						label='password'
					/>
					<div className='buttons'>
						<CustomButton type='submit'>Sign In</CustomButton>
						<CustomButton onClick={signInWithGoogle} isGoogleSignIn>
							Sign In with Google
						</CustomButton>
					</div>
				</form>
			</div>
		)
	}
}

export default SignIn
