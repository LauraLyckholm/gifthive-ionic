import { API_URL } from "../constants";
import { useUserStates } from "./user-states";
import { computed } from "vue";

const withEndpoint = (endpoint: string) => `${API_URL}/user-routes/${endpoint}`;

const { loadingUser, errorMessage, setUsername, setPassword, setEmail, setErrorMessage } = useUserStates();

export const useRegisterUser = async (username: string, password: string, email: string) => {

    if (!username || !email || !password) {
        setErrorMessage("Please fill in all fields");
        return;
    }
    console.log('username:', username);
    console.log('email:', email);


    try {
        loadingUser.value = true

        const response = await fetch(withEndpoint("register"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            })
        })
        const data = await response.json();
        const successfullFetch = data.success;

        const constructErrorMessage = computed(() => {
            if (data.success === false && data.response.message) {
                return setErrorMessage(data.response.message);
            }
            if (data.success === false && data.response) {
                return setErrorMessage(data.response);
            }
            return setErrorMessage("An error occured");
        })

        if (!response.ok) {
            loadingUser.value = false;
            constructErrorMessage.value;
            throw new Error(`${response.status}: "${errorMessage.value}"`);
        }

        if (successfullFetch) {
            setUsername(data.username);
            setEmail(data.email);
            loadingUser.value = false;
        }

    } catch (error) {
        setUsername("");
        setEmail("");
        setPassword("");
        loadingUser.value = false;

        console.error("There was an error =>", error)
    }
}