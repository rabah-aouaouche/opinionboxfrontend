import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const user = localStorage.getItem("User");
  const userObject = JSON.parse(user);
  const [auth, setAuth] = useState({
    _id: userObject?._id || null,
    token: userObject?.token || null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
