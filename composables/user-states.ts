import { ref } from "vue";

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
    return username.value = newUsername;
};
const setPassword = (newPassword: string) => {
    password.value = newPassword;
};
const setEmail = (newEmail: string) => {
    email.value = newEmail;
};
const setErrorMessage = (newErrorMessage: string) => {
    errorMessage.value = newErrorMessage;
};
const setUserId = (newUserId: string) => {
    userId.value = newUserId;
};
const setAccessToken = (newAccessToken: string) => {
    accessToken.value = newAccessToken;
};
const setDashboard = (newDashboard: object) => {
    dashboard.value = newDashboard;
};
const setIsLoadingUser = (status: boolean) => {
    loadingUser.value = status;
};
const setIsLoggedIn = (status: boolean) => {
    isLoggedIn.value = status;
};

export const useUserStates = () => {
    return {
        username,
        password,
        email,
        userId,
        accessToken,
        loadingUser,
        isLoggedIn,
        errorMessage,
        dashboard,
        setUsername,
        setPassword,
        setEmail,
        setErrorMessage,
        setUserId,
        setAccessToken,
        setDashboard,
        setIsLoadingUser,
        setIsLoggedIn
    };
};