import { API_URL } from "../constants";
import { useUserStates } from "./user-states";
import { computed } from "vue";

const withEndpoint = (endpoint: string) => `${API_URL}/user-routes/${endpoint}`;

const { loadingUser, isLoggedIn, errorMessage, setUsername, setPassword, setEmail, setUserId, setAccessToken, setErrorMessage } = useUserStates();

export const useLoginUser = async (username: string, password: string, userId: string) => {

    if (!username || !password) {
        setErrorMessage("Please fill in all fields");
        return;
    }

    try {
        loadingUser.value = true

        const response = await fetch(withEndpoint("login"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                userId,
            })
        })
        const data = await response.json();
        const successfullFetch = data.success;
        console.log('data:', data);
        const constructErrorMessage = computed(() => {
            if (response.status === 401) {
                return setErrorMessage("Wrong username or password, please try again");
            }
            if (response.status === 404) {
                return setErrorMessage("Username not found, please try again");
            }
            return setErrorMessage("Something went wrong, please try again");
        })
        console.log('response:', data.response);

        if (!response.ok) {
            loadingUser.value = false;
            constructErrorMessage.value;
            throw new Error(`${response.status}: "${errorMessage.value}"`);
        }

        if (successfullFetch) {
            setUsername(data.response.username);
            setAccessToken(data.response.accessToken);
            setUserId(data.response._id);
            setEmail(data.response.email);
            loadingUser.value = false;
            isLoggedIn.value = true;

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("username", username);
            localStorage.setItem("userId", data._id);
            localStorage.setItem("isLoggedIn", isLoggedIn.value.toString());
            localStorage.setItem("email", data.email)
        } else {
            setUsername("");
            setEmail("");
            setAccessToken("");
            isLoggedIn.value = false;
            loadingUser.value = false;

            throw new Error(`${response.status}: "${errorMessage.value}"`);
        }

    } catch (error) {
        setUsername("");
        setPassword("");
        setEmail("");
        loadingUser.value = false;
        errorMessage.value = "Login failed, please try again";

        console.error("There was an error =>", error)
    }
}