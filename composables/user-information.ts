import { ref } from "vue";

const API_URL = import.meta.env.VITE_BACKEND_URL as string;
const withEndpoint = (endpoint: string) => `${API_URL}/user-routes/${endpoint}`;

export const useUserInformation = () => {
    const username = ref<string>("");
    const password = ref<string>("");
    const email = ref<string>("");
    const accessToken = ref<string>("");
    const isLoggedIn = ref<boolean>(false);
    const loadingUser = ref<boolean>(false);
    const errorMessage = ref<string>("");
    const userId = ref<string>("");
    const dashboard = ref<object>({});
    const hivesSharedBytMe = ref([]);

    const setUsername = (newUsername: string) => {
        username.value = newUsername;
    };
    const setPassword = (newPassword: string) => {
        password.value = newPassword;
    };
    const setEmail = (newEmail: string) => {
        email.value = newEmail;
    };
    const setAccessToken = (newAccessToken: string) => {
        accessToken.value = newAccessToken;
    };
    const setErrorMessage = (newErrorMessage: string) => {
        errorMessage.value = newErrorMessage;
    };
    const setUserId = (newUserId: string) => {
        userId.value = newUserId;
    };
    const setDashboard = (newDashboard: object) => {
        dashboard.value = newDashboard;
    };
    const setHivesSharedByMe = (newHivesSharedByMe: any) => {
        hivesSharedBytMe.value = newHivesSharedByMe;
    };


    const getDashboard = async () => {
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
    }

    return {
        getDashboard,
    }
};