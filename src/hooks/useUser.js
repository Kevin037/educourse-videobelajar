// hooks/useUser.js
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, registerUserThunk, resetUser, updateUserThunk } from '../services/api/userSlice';
import { useEffect } from 'react';

const useUser = (id=null) => {
  const dispatch = useDispatch();
  const { currentUser, loading, error, status } = useSelector(state => state.user);

  // Fungsi register, terima userData misal { name, email, password }
  const register = (userData) => {
    dispatch(registerUserThunk(userData));
  };

    const update = (id,userData) => {
      dispatch(updateUserThunk({id,userData}));
    };

  // Optional reset state
  const reset = () => dispatch(resetUser());

    useEffect(() => {
      if (id) {
        dispatch(getUserById(id));
      }
    }, [dispatch]);

  return { currentUser, loading, error, register, reset, update, status };
};

export default useUser;
