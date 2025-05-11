import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk, logOutuserThunk } from '../services/api/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error, status } = useSelector(state => state.auth);

  const login = (userData) => {
    dispatch(loginUserThunk(userData));
  };

    const logOut = () => {
      dispatch(logOutuserThunk());
    };

  return { user, loading, error, login, logOut, status };
};

export default useAuth;
