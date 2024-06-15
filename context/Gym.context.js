import { createContext, useContext, useEffect, useState, useMemo } from "react";
// import {onAuthStateChanged, signOut} from 'firebase/auth'
import { db } from "@/firebase.config";
import { doc, addDoc, collection, getDoc, setDoc, Timestamp, updateDoc, getDocs, query } from 'firebase/firestore'

import { router } from "expo-router";

export const GymContextProvider = ({ children }) => {
	const [gym, setGym] = useState(null);
	const [trainers, setTrainers] = useState(null)
	const [reviews, setReviews] = useState(null)
	const [gymsList, setGymsList] = useState([]);
	const [dataLoading, setDataLoading] = useState(true);
	const [gymError, setError] = useState(null);
	/// add condition to check if user completed setup if not then reroute them to finish setup page.
	useEffect(() => {
		(async () => {
			try {
				const gyms = await getGyms()
				const mainGym = gyms[0]
				setGym(mainGym)
				await getGymSubCollectionData(mainGym.uid, 'Trainers', setTrainers)
				await getGymSubCollectionData(mainGym.uid, 'Reviews', setReviews)

			} catch (err) {
				setError(err.message);
				console.log(err.message)
			} finally {
				setDataLoading(false);
			}
		})()


	}, [])

	const updateGym = async (uid, data) => {
		try {
			const gymRef = doc(db, 'Gyms', uid)
			await updateDoc(gymRef, data)
			console.log('UPDATED GYM DATA')

		} catch (err) {
			console.log(err)
			setError(err.message);
			console.log('There was an error updating gym data.')
		}
	}

	const createTrainers = async (gym_uid, data) => {
		try{
			const collRef = collection(db, 'Gyms', gym_uid, 'Trainers')
			data.map((item)=>{
				addDoc(collRef, item)
			})
		}catch(e){
			console.log(e)
		}
	} 
	
	const getGyms = async () => {
		try {
			const querySnapshot = await getDocs(collection(db, 'Gyms'))
			const gymsList = querySnapshot.docs.map(doc => ({
				uid: doc.id,
				...doc.data()
			}));
			return gymsList

		} catch (err) {
			setError(err.message);
			console.log('There was an error retrieving all gyms')
		}
	}

	const getGymSubCollectionData = async (gym_uid, sub_collection, setStateData) => {
		try {
			const querySnapshot = await getDocs(collection(db, 'Gyms', gym_uid, sub_collection))
			const dataList = querySnapshot.docs.map((doc) => ({
				uid: doc.id,
				...doc.data()
			}))
			setStateData(dataList)
		} catch (err) {
			setError(err.message);
			console.log(err.message)
			console.log(`There was an error retrieving ${sub_collection}`)

		}
	}

	return (
		<GymContext.Provider value={{ dataLoading, gym, trainers, reviews, updateGym, createTrainers }}>
			{children}
		</GymContext.Provider>
	)
}

export const GymContext = createContext();

export const useGym = () => {
	const value = useContext(GymContext)

	if (!value) {
		throw new Error('useGym must be wrapped inside GymContextProvider')
	}
	return value
}
