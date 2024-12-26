import { API_URL } from "../constants";
import { useUserStates } from "./user-states";

const withEndpoint = (endpoint: string) => `${API_URL}/user-routes/${endpoint}`;

const { loadingUser, setDashboard, dashboard } = useUserStates();

export const useGetDashboard = async () => {
    try {
        loadingUser.value = true
        const response = await fetch(withEndpoint("dashboard"), {
            headers: {
                "Auth": localStorage.getItem("accessToken") || ""
            }
        })

        if (response.ok) {
            const data = await response.json()
            setDashboard(data);
            loadingUser.value = false
        }
    } catch (error) {
        console.error("There was an error =>", error)
    }
    return dashboard;
}