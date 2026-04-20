import { Preloader } from '@ui';
import { useSelector } from '@store';
import { Navigate } from 'react-router';
import { TProtectedRouteProps } from './type';
import { useLocation } from 'react-router-dom';

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: TProtectedRouteProps) => {
  const location = useLocation();

  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
  const user = useSelector((state) => state.user.data);

  if (!isAuthChecked) {
    // Пока идёт проверка пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    // Если маршрут для неавторизованного пользователя, но пользователь авторизован, то делаем редирект на главную страницу
    return <Navigate replace to='/' />;
  }

  if (!onlyUnAuth && !user) {
    // Если маршрут для авторизованного пользователя, но пользователь не авторизован, то делаем редирект на страницу логина
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
