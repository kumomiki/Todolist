import { createContext } from 'react';

const defaultAuthContext = {
  // 使用者是否登入的判斷依據，預設為 false，若取得後端的有效憑證，則切換為 true
  isAuthenticated: false,
  // 當前使用者相關資料，預設為 null，成功登入後就會有使用者資料
  currentMember: null,
  // 註冊方法
  register: null,
  // 登入方法
  login: null,
  // 登出方法
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
