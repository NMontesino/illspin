import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const config = {
	apiKey: 'AIzaSyDevBUEPBQNPiDWPFMfk6EE_4zLg6jr1Gc',
	authDomain: 'illspin-db.firebaseapp.com',
	projectId: 'illspin-db',
	storageBucket: 'illspin-db.appspot.com',
	messagingSenderId: '867316055018',
	appId: '1:867316055018:web:5c7b09de68aa73ea14d093',
	measurementId: 'G-ESPCB9BZ97'
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return

	const userRef = firestore.doc(`users/${userAuth.uid}`)
	const snapshot = await userRef.get()

	if (!snapshot.exists) {
		const { displayName, email } = userAuth
		const createdAt = new Date()

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (err) {
			console.log('Error Creating User', err.message)
		}
	}

	return userRef
}

firebase.initializeApp(config)

export const auth = getAuth()
export const firestore = firebase.firestore()

const providerGoogle = new GoogleAuthProvider()
providerGoogle.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => {
	return signInWithPopup(auth, providerGoogle)
}

export default firebase
