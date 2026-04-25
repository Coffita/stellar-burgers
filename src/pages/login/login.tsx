import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { loginUser } from '@slices';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const error = useSelector((state) => state.user.loginError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigateTo = location.state?.from || { pathname: '/' };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await dispatch(loginUser({ email, password })).unwrap();

      navigate(navigateTo);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
