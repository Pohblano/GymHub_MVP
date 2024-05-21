import { createContext, useContext, useEffect, useState } from "react";
import firebase from 'firebase/app'
import {onAuthStateChanged, signOut} from 'firebase/auth'
import { auth, db } from "@/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth'
import { doc, addDoc, collection } from 'firebase/firestore'



export const AuthContextProvider = ({children}) => {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(undefined)

	useEffect(() => {
		const unsub =onAuthStateChanged(auth, (user)=> {
			console.log('got user:', user)
			if (user){
				setIsAuthenticated(true);
				setUser(user);
			}else{
				setIsAuthenticated(false);
				setUser(null)
			}
			return unsub
		})
	}, [])

	const login = async (email, password, setErrors, setSubmitting) => {
		try{
			const response = await signInWithEmailAndPassword(auth, email, password)
		}catch(e){
			console.log(error)
			let msg = error.message
			if(msg.includes('(auth/invalid-credential)')) msg = 'Invalid credentials'
			setErrors({ email: msg });
		}finally{
			setSubmitting(false)
		}
	}
	const logout = async () => {
		try{
			await signOut(auth)
		}catch(e){
			console.log('There was an error while logging user out')
		}
	}
	const register = async (email, password, setErrors, setSubmitting) => {
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password)
			if (response.user) {
				const userData = response?.user
				const newUser = {
					email,
					password,
					created_at: new Date()
				}
				console.log(newUser)

				await await addDoc(collection(db, "Users"), newUser)
					.then((doc) => {
						console.log('Firebase data')
						console.log(doc)
						console.log("Document written with ID: ", doc.id);
						return{success: true, data: response?.user}
					})
					.catch((error) => {
						console.error("Error adding document: ", error);
					});
			}
			
		} catch (error) {
			console.log(error)
			let msg = error.message
			if(msg.includes('(auth/invalid-email)')) msg = 'That email is invalid'
			if(msg.includes('Firebase: Error (auth/email-already-in-use)')) msg = 'That email is already in use'
			setErrors({ email: msg });
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
			{children}
		</AuthContext.Provider>
	)
}

export const AuthContext = createContext();

export const useAuth = () =>{
	const value = useContext(AuthContext)

	if(!value){
		throw new Error('useAuth must be wrapped inside AuthContextProvider')
	}
	return value
}

// const handleLogout = async () => {
// 	await logout()
// }