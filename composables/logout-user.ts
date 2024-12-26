import { useUserStates } from "./user-states";

const { isLoggedIn, setUsername, setPassword, setEmail, setUserId, setAccessToken } = useUserStates();

export const useLogoutUser = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setUserId("");
    setAccessToken("");
    isLoggedIn.value = false;
    localStorage.clear();
};