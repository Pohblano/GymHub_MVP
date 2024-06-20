import { createContext, useContext, useEffect, useState } from "react";
// import {onAuthStateChanged, signOut} from 'firebase/auth'
import { auth, db } from "@/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from '@firebase/auth'
import { doc, addDoc, collection, getDoc, setDoc, Timestamp, updateDoc, getDocs, query, where} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { router } from "expo-router";
import { getBlobFromUri } from "@/utils/linking";
import { useTranslation } from "react-i18next";

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(undefined)
	const [completedSetup, setCompletedSetup] = useState(undefined)
	const { t } = useTranslation()
	/// add condition to check if user completed setup if not then reroute them to finish setup page.
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
			console.log('got user:', user)
			if (user) {
				setIsAuthenticated(true);
				setUser(user);
				updateUserData(user.uid)

			} else {
				setIsAuthenticated(false);
				setUser(null)
			}
			return unsub
		})
	}, [])

	// Updates auth context
	const updateUserData = async (uid) => {
		const docRef = doc(db, 'Users', uid)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			const data = docSnap.data()
			delete data.password
			setUser({
				...data,
				uid: uid
			})
		}
	}

	const update = async (uid, props, setErrors, setSubmitting) => {
		try {
			const docData = {
				username: props.username,
				username_lower: props.username_lower,
				profile_img: props.profile_img,
				location: props.location
			}
			const collRef = collection(db, 'Users')
			const q = query(collRef, where('username_lower', '==', props.username_lower))
			const querySnapshot = await getDocs(q)
			if (querySnapshot.empty) {
				const userRef = doc(db, 'Users', uid)
				await updateDoc(userRef, docData)
					.then(doc => {
						setUser({
							...user,
							...docData
						})
						router.replace('CompletedScreen')
					})
			}else{
				setErrors({ username: "That username is already taken" });
			}

		} catch (error) {
			console.log(error)
			let msg = error.message
			setErrors({ location: msg });
		} finally {
			setSubmitting(false)
		}
	}

	const login = async (email, password, setErrors, setSubmitting) => {
		try {
			const response = await signInWithEmailAndPassword(auth, email, password)
			if (response) router.replace('(Drawer)/GymDashboardScreen')

		} catch (error) {
			console.log(error)
			let msg = error.message
			console.log(msg)
			if (msg.includes('(auth/invalid-credential)')) msg = t('Invalid Credentials')
			setErrors({ email: msg });
		} finally {
			setSubmitting(false)
		}
	}

	const logout = async () => {
		try {
			await signOut(auth)
			router.replace('/')
		} catch (e) {
			console.log('There was an error while logging user out')
		}
	}

	const register = async (email, password, setErrors, setSubmitting) => {
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password)

			if (response.user) {
				const newUser = {
					uid: response?.user?.uid,
					email,
					password,
					created_at: Timestamp.fromDate(new Date())
				}

				await setDoc(doc(db, 'Users', response?.user?.uid), newUser)
					.then(doc => {
						router.replace('SetupProfileScreen')
					}).catch(error => {
						console.log('Error adding document: ')
						console.log(error)
					})
			}
		} catch (error) {
			console.log(error)
			let msg = error.message
			if (msg.includes('(auth/invalid-email)')) msg = t('That email is invalid')
			if (msg.includes('(auth/email-already-in-use)')) msg = t('That email is already in use')

			setErrors({ email: msg });
		} finally {
			setSubmitting(false);
		}
	}

	const upload_image = async (uri) => {
		try {
			// Upload image to Firebase Storage
			const storage = getStorage()
			const imageBlob = await getBlobFromUri(uri)
			const imageName = imageBlob['data']['name']
			const storageRef = ref(storage, `profile_images/${user.uid}`);
			const uploadTask = uploadBytesResumable(storageRef, imageBlob);
			uploadTask.on('state_changed',
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
					}
				}, (error) => {
					console.log(error)
				}
			);
			const url = getDownloadURL(uploadTask.snapshot.ref)
			return url

		} catch (error) {
			console.log(error)
		}
	}

	const reset_password = async (email, setErrors, setSubmitting, setEmailSent) => {
		try {
			await sendPasswordResetEmail(auth, email)
				.then(response => setEmailSent(true))

		} catch (error) {
			console.log(error)
			let msg = error.message
			if (msg.includes('(auth/invalid-email)')) {
				console.log(msg)
				msg = t('That email is invalid')
			}
			setErrors({ email: msg });
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, update, reset_password, upload_image }}>
			{children}
		</AuthContext.Provider>
	)
}

export const AuthContext = createContext();

export const useAuth = () => {
	const value = useContext(AuthContext)

	if (!value) {
		throw new Error('useAuth must be wrapped inside AuthContextProvider')
	}
	return value
}
