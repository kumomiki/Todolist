import axios from 'axios';

const authURL = 'https://todo-list.alphacamp.io/api/auth ';

export const login = async ({ username, password }) => {
  try {
    //在res裡包含許多屬性,在此只需data的值，因此使用解構
    const { data } = await axios.post(`${authURL}/login`, {
      username,
      password,
    });
    //在data中，若註冊成功可取得一個authToken
    const { authToken } = data;

    //若 authToken 存在就代表登入成功，就回傳資料以便後續利用,立一個success為flag
    if (authToken) {
      return { success: true, ...data };
    }
    //若登入失敗也要讓頁面知道，因此回傳data，例如：UI層可以根據返回數據中的 error 屬性來確定錯誤類型，並在介面上顯示相應的錯誤信息
    return data;
  } catch (error) {
    console.error(`[Login failed]:`,error);
  }
};
