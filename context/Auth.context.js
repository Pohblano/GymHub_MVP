import { createContext, useContext, useEffect, useState } from "react";
// import {onAuthStateChanged, signOut} from 'firebase/auth'
import { auth, db } from "@/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from '@firebase/auth'
import { doc, addDoc, collection, getDoc, setDoc, Timestamp, updateDoc, getDocs, query, where } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { router } from "expo-router";
import { getBlobFromUri } from "@/utils/linking";
import { useTranslation } from "react-i18next";

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(undefined)
	const [completedSetup, setCompletedSetup] = useState(undefined)
	const { t } = useTranslation()

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => {
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
			const profile_img = await (async (uri) => {
				if (uri) {
					try {
						const downloadURL = await upload_image(uri, `profile_images/${user.uid}`)
						if (downloadURL) return downloadURL
					} catch (err) {
						console.log(err)
					}
				} else {
					const default_image = `https://firebasestorage.googleapis.com/v0/b/gym24-7.appspot.com/o/profile_images%2Fdefault-image.jpg?alt=media&token=67031391-86e9-4311-b9c1-77a49008c557`
					return default_image
				}
			})(props.profile_img)

			if (profile_img) {
				const docData = {
					username: props.username,
					username_lower: props.username_lower,
					profile_img: profile_img,
					location: props.location
				}
				const collRef = collection(db, 'Users')
				const q = query(collRef, where('username_lower', '==', props.username_lower))
				const querySnapshot = await getDocs(q)
				if (querySnapshot.empty) {
					const userRef = doc(db, 'Users', uid)
					await updateDoc(userRef, docData)
						.then(() => {
							setUser({ ...user, ...docData })
							router.replace('CompletedScreen')
						})
				} else setErrors({ username: "That username is already taken" });

			} else console.log('Profile image url came up empty')

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
			router.replace('../../StartScreen')
			await signOut(auth)
			
		} catch (e) {
			console.log('There was an error while logging user out')
		}
	}

	const register = async (email, password, setErrors, setSubmitting) => {
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password)
			if (response.user) {
				router.replace('SetupProfileScreen')
				const newUser = {
					uid: response?.user?.uid,
					email,
					password,
					created_at: Timestamp.fromDate(new Date())
				}

				await setDoc(doc(db, 'Users', response?.user?.uid), newUser)
					.catch(error => {
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

	// Upload image to Firebase Storage
	const upload_image = async (uri, path) => {
		try {
			const storage = getStorage()
			const imageBlob = await getBlobFromUri(uri)
			const storageRef = ref(storage, path);
			const uploadTask = uploadBytesResumable(storageRef, imageBlob);

			return new Promise((resolve, reject) => {
				uploadTask.on('state_changed',
					(snapshot) => {
						const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
					}, (error) => {
						console.log(error);
						reject(error);  // Reject the promise on error
					}, () => {
						// Handle successful uploads on complete
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							resolve(downloadURL);  // Resolve the promise with the download URL
						}).catch((error) => {
							reject(error);  // Reject the promise if getting the download URL fails
						});
					}
				);
			})
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
				msg = t('That email is invalid')
			}
			setErrors({ email: msg });
		} finally {
			setSubmitting(false)
		}
	}

	const register_bug = async (bug_report, setErrors, setSubmitting, setSent) => {
		try{
			const file_name = bug_report.img.split('/ImagePicker/')[1]
			const img = await (async (uri) => {
				if (uri) {
					try {
						const downloadURL = await upload_image(uri, `bugs/${file_name}`)
						if (downloadURL) return downloadURL
					} catch (err) {
						console.log(err)
					}
				} else return ''
			})(bug_report.img)

			if(img){
				const data = {
					img, 
					description: bug_report.description, 
					user_uid: user.uid, 
					timestamp: Timestamp.fromDate(new Date())
				}
				const collRef = collection(db, 'Bugs')
				addDoc(collRef, data)
			}
		}catch(error){
			let msg = error.message
			setErrors({ description: msg });
		}finally{
			setSubmitting(false)
			setSent(true)
		}
	}


	return (
		<AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, update, reset_password, upload_image, register_bug }}>
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
