import PageLoading from "@/components/Loading/PageLoading"
import { useAuth } from "@/context/Auth.context"
import { useGym } from "@/context/Gym.context"
import { useSegments, useRouter, Stack } from "expo-router"
import { useEffect } from "react"


export default function AuthCheck() {
	const { isAuthenticated, user } = useAuth()
	const {gym} = useGym()
	const segments = useSegments()
	const router = useRouter()

	useEffect(() => {
		const inApp = segments[2] == 'GymDashboardScreen'
		if (typeof isAuthenticated == 'undefined') return
		
		if (isAuthenticated && !inApp) {
			console.log('USER LOGGED IN AND NOT IN APP', segments)
			// Redirect to Dashboard
			if(user && gym) router.replace('/(Active_User)/(Drawer)/GymDashboardScreen')
				
		} else if (!isAuthenticated) {
			console.log('NO USER IS LOGGED IN', segments)
			// Redirect to starting page
			router.replace('StartScreen')
		}
	}, [isAuthenticated,user])

	return (
		<PageLoading/>
	)
}