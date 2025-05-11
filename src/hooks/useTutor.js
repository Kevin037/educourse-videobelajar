import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTutors } from '../services/api/tutorSlice';

const useTutor = (class_id=null) => {
  const dispatch = useDispatch();
  const {tutorData} = useSelector((state) => state.tutor);
  const loading = useSelector(state => state.class.loading);
  const error = useSelector(state => state.class.error);

  useEffect(() => {
    const columnName = class_id ? 'class_id' : null;
    dispatch(getTutors({class_id,columnName}));
  }, [dispatch]);

  return { tutorData, loading, error};
};

export default useTutor;
