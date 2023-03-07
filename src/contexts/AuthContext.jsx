import { checkPermission, login, register } from '../api/auth';
import { useEffect, useState } from 'react';
import { createContext } from 'react';
//使用星號（*）來導入一個模組中的所有命名導出
import * as jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';

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
  // react Hook:useLocation 取得瀏覽器網址列中的路徑資訊
  const { pathname } = useLocation();

  useEffect(() => {
    const checkTokenIsValid = async () => {
      //先確認authToken是否存在
      // 取得authToken
      const authToken = localStorage.getItem('authToken');
      //若不存在，則return
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }
      //若authToken存在，驗證是否有效，才能進入todos page
      const result = await checkPermission(authToken);
      //若有效則進入 todos 頁面
      if (result) {
        //有效再取token
        setIsAuthenticated(true);
        const tempPayload = jwt.decode(authToken);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };
    checkTokenIsValid();
    // 一旦 pathname 有改變，就需要重新驗證 token
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
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
