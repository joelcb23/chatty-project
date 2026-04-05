let accessToken: string | null = null;
let logoutFunction: Function | null = null;

export const setToken = (token) => {
  accessToken = token;
};
export const getToken = () => accessToken;

export const executeLogout = () => logoutFunction();

export const setLogoutFunction = (func) => (logoutFunction = func);
