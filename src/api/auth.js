import axios from 'axios';

const authURL = 'https://todo-list.alphacamp.io/api/auth';

export const login = async ({ username, password }) => {
  try {
    //在res裡包含許多屬性,在此只需data的值，因此使用解構
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });

    console.log(data);
    //在data中，若註冊成功可取得一個authToken
    const { authToken } = data;

    //若 authToken 存在就代表登入成功，就回傳資料以便後續利用,立一個success為flag
    if (authToken) {
      return { success: true, ...data };
    }
    //若登入失敗也要讓頁面知道，因此回傳data，例如：UI層可以根據返回數據中的 error 屬性來確定錯誤類型，並在介面上顯示相應的錯誤信息
    return data;
  } catch (error) {
    console.error(`[Login failed]:`, error);
  }
};

export const register = async ({ username, password, email }) => {
  try {
    const { data } = await axios.post(`${authURL}/register`, {
      username,
      password,
      email,
    });
    const { authToken } = data;

    // 若authToken存在，表示註冊成功
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error(`[Register failed]:`, error);
  }
};
//當切換page時，需要authToken讓後端再次確認該authToken是否還有效，才能進入新頁面
export const checkPermission = async (authToken) => {
  try {
    //前端會發送request，並把 token 放在 HTTP Request Header 裡，並使用 Authorization 的 Bearer 類型來攜帶 token，Axios 會協助轉換成規格要求的格式（第二個參數）
    const response = await axios.get(`${authURL}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    //根據後端提供的 API 規格，後端會提供 success 屬性來告知 true/false，並附上 error 說明
    return response.data.success;
  } catch (error) {
    console.error(`[Check Permission failed]:`, error);
  }
};
