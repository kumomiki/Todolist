import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkPermission, register } from 'api/auth';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    // 先判斷輸入的長度是否符合
    if (username.length === 0) return;
    if (password.length === 0) return;
    if (email.length === 0) return;
    // 從auth api可獲得success和authToken屬性值，將其取出判斷
    const { success, authToken } = await register({
      username,
      email,
      password,
    });
    // 若成功，會先暫存在localStorage，並顯示登入成功通知
    if (success) {
      localStorage.setItem('authToken', authToken);
      Swal.fire({
        title: '註冊成功',
        icon: 'success',
        showConfirmButton: false,
        position: 'top',
        timer: 1000,
      });
      navigate('/todos');
      return;
    }
    Swal.fire({
      title: '註冊失敗',
      icon: 'error',
      showConfirmButton: false,
      position: 'top',
      timer: 1000,
    });
  };

  //把驗證 authToken 的流程放在 useEffect 裡，這樣在進入頁面時，就會直接觸發authToken 的檢查
  //確保使用者只有在擁有有效 token 時才能進入 todos 頁面，提高了安全性。
  useEffect(() => {
    const checkTokenIsValid = async () => {
      //先確認authToken是否存在
      // 取得authToken
      const authToken = localStorage.getItem('authToken');
      //若不存在，則return
      if (!authToken) {
        return;
      }
      //若authToken存在，驗證是否有效，才能進入todos page
      const result = await checkPermission(authToken);
      //若有效則進入 todos 頁面
      if (result) {
        navigate('/todos');
      }
    };
    checkTokenIsValid();
    // 因為有使用到navigate變數，所以須放入（表示有改變時執行）
  }, [navigate]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput
          label={'帳號'}
          placeholder={'請輸入帳號'}
          value={username}
          onChange={(nameInputValue) => setUsername(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={'Email'}
          placeholder={'請輸入 email'}
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={'密碼'}
          placeholder={'請輸入密碼'}
          value={password}
          type="password"
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
