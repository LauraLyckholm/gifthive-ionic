import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { API_URL } from "../constants";

const withEndpoint = (endpoint: string) => `${API_URL}/user-routes/${endpoint}`;

export const useUserStore = defineStore("user", () => {
    const username = ref<string>("");
    const password = ref<string>("");
    const email = ref<string>("");
    const userId = ref<string>("");
    const accessToken = ref<string>("");
    const loadingUser = ref<boolean>(false);
    const isLoggedIn = ref<boolean>(false);
    const errorMessage = ref<string>("");
    const dashboard = ref<object>({});

    const setUsername = (newUsername: string) => {
        username.value = newUsername;
    }
    const setPassword = (newPassword: string) => {
        password.value = newPassword;
    }
    const setEmail = (newEmail: string) => {
        email.value = newEmail;
    }
    const setUserId = (newUserId: string) => {
        userId.value = newUserId;
    }
    const setErrorMessage = (newErrorMessage: string) => {
        errorMessage.value = newErrorMessage;
    }
    const setAccessToken = (newAccessToken: string) => {
        accessToken.value = newAccessToken;
    }
    const setDashboard = (newDashboard: object) => {
        dashboard.value = newDashboard;
    }
    const setIsLoadingUser = (status: boolean) => {
        loadingUser.value = status;
    }
    const setIsLoggedIn = (status: boolean) => {
        isLoggedIn.value = status;
    }

    const getDashboard = async () => {
        try {
            setIsLoadingUser(true)
            const response = await fetch(withEndpoint("dashboard"), {
                headers: {
                    "Auth": localStorage.getItem("accessToken") || ""
                }
            })

            if (response.ok) {
                const data = await response.json()
                setDashboard(data);
                setIsLoadingUser(false)
            }
        } catch (error) {
            console.error("There was an error =>", error)
        }
        return dashboard;
    };

    const loginUser = async (username: string, password: string, userId: string) => {

        if (!username || !password) {
            setErrorMessage("Please fill in all fields");
            return;
        }

        try {
            setIsLoadingUser(true)

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
                setIsLoadingUser(false);
                constructErrorMessage.value;
                throw new Error(`${response.status}: "${errorMessage.value}"`);
            }

            if (successfullFetch) {
                setUsername(data.response.username);
                setAccessToken(data.response.accessToken);
                setUserId(data.response._id);
                setEmail(data.response.email);
                setIsLoadingUser(false);
                setIsLoggedIn(true);

                console.log(isLoggedIn.value);

                // localStorage.setItem("accessToken", data.accessToken);
                // localStorage.setItem("username", username);
                // localStorage.setItem("userId", data._id);
                // localStorage.setItem("isLoggedIn", isLoggedIn.value.toString());
                // localStorage.setItem("email", data.email)
            } else {
                setUsername("");
                setEmail("");
                setAccessToken("");
                setIsLoggedIn(false);
                setIsLoadingUser(false);

                throw new Error(`${response.status}: "${errorMessage.value}"`);
            }

        } catch (error) {
            setUsername("");
            setPassword("");
            setEmail("");
            setIsLoadingUser(false);
            errorMessage.value = "Login failed, please try again";

            console.error("There was an error =>", error)
        }
    }

    const registerUser = async (username: string, password: string, email: string) => {

        if (!username || !email || !password) {
            setErrorMessage("Please fill in all fields");
            return;
        }
        console.log('username:', username);
        console.log('email:', email);


        try {
            setIsLoadingUser(true)

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
                setIsLoadingUser(false);
                constructErrorMessage.value;
                throw new Error(`${response.status}: "${errorMessage.value}"`);
            }

            if (successfullFetch) {
                setUsername(data.username);
                setEmail(data.email);
                setIsLoadingUser(false);
            }

        } catch (error) {
            setUsername("");
            setEmail("");
            setPassword("");
            setIsLoadingUser(false);

            console.error("There was an error =>", error)
        }
    }

    const logoutUser = () => {
        setUsername("");
        setPassword("");
        setEmail("");
        setUserId("");
        setAccessToken("");
        setIsLoggedIn(false);
        localStorage.clear();
    };

    return {
        getDashboard,
        loginUser,
        registerUser,
        logoutUser
    };
})