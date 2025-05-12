// hooks/useUser.js
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, registerUserThunk, resetUser, updateUserPhotoThunk, updateUserThunk } from '../services/api/userSlice';
import { useEffect } from 'react';

const useUser = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error, status } = useSelector(state => state.user);

  // Fungsi register, terima userData misal { name, email, password }
  const register = (userData) => {
    dispatch(registerUserThunk(userData));
  };

    const update = (userData) => {
      dispatch(updateUserThunk(userData));
    };

    const updateImage = (userData) => {
      dispatch(updateUserPhotoThunk(userData));
    };

  // Optional reset state
  const reset = () => dispatch(resetUser());

    useEffect(() => {
        dispatch(getUserById());
    }, [dispatch]);

  return { currentUser, loading, error, register, reset, update, status, updateImage };
};

export default useUser;
