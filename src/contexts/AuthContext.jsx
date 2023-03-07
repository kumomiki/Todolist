import { login, register } from '../api/auth';
import { useState } from 'react';
import { createContext } from 'react';
//使用星號（*）來導入一個模組中的所有命名導出
import * as jwt from 'jsonwebtoken';

const defaultAuthContext = {
  // 使用者是否登入的判斷依據，預設為 false，若取得後端的有效憑證，則切換為 true
  isAuthenticated: false,
  // 當前使用者相關資料，預設為 null，成功登入後就會有使用者資料
  currentMember: null,
  // 影響isAuthenticated是true/false的點，註冊方法
  register: null,
  // 影響isAuthenticated是true/false的點，登入方法
  login: null,
  // 影響isAuthenticated是true/false的點，登出方法
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payload, setPayload] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload,
        register: async (data) => {
          const { success, authToken } = await register({
            username: data.username,
            email: data.email,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        login: async (data) => {
          const { success, authToken } = await login({
            username: data.username,
            password: data.password,
          });
          const tempPayload = jwt.decode(authToken);
          if (tempPayload) {
            setPayload(tempPayload);
            setIsAuthenticated(true);
            localStorage.setItem('authToken', authToken);
          } else {
            setPayload(null);
            setIsAuthenticated(false);
          }
          return success;
        },
        logout: () => {
          localStorage.removeItem('authToken');
          setPayload(null);
          setIsAuthenticated(false);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
