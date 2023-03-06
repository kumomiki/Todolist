import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #f5f8fa;
  width: 100%;
  height: 54px;
  border-bottom: 2px solid black;
`;
const StyledLabel = styled.label`
  font-size: 14;
  color: '#696974';
  text-align: start;
`;

const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: #f5f8fa;
  border-radius: 0px;
`;

const AuthInput = ({ type, label, placeholder, value, onChange }) => {
  return (
    <StyledContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        type={type || 'text'} //讓 password 不顯示明碼時會用到，如果不是password時就是顯示text
        placeholder={placeholder || ''} // 如果外層沒有帶入 props 就預設給一個空字串
        value={value || ''} //如果外層沒有帶入 props 就預設給一個空字串
        onChange={(event) => onChange?.(event.target.value)}
      />
    </StyledContainer>
  );
};

export default AuthInput;
