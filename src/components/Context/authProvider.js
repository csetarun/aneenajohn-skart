import { useReducer, useContext } from "react";
import { AuthContext } from "./authContext";
import { authReducer } from "./authReducer";

export const AuthProvider = ({ children }) => {
  const userInfo = JSON.parse(localStorage?.getItem("login")) || {
    isLoggedIn: false,
    userToken: null
  };

  const [authState, authDispatch] = useReducer(authReducer, userInfo);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
