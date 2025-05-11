import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassById, getClasses, getClassesFilter } from '../services/api/classSlice';

const useClass = (type=null,id=null,limit=0,ClassType = null, price = null, duration = null, keyword = null, ordering = null) => {
  const dispatch = useDispatch();
  const {classData, selectedClass, classLessons, classFacilities} = useSelector((state) => state.class);
  const limitedClass = classData.slice(0,limit);
  const loading = useSelector(state => state.class.loading);
  const error = useSelector(state => state.class.error);

  useEffect(() => {
    if (ClassType || price || duration || keyword || ordering) {
      dispatch(getClassesFilter({ClassType, price, duration, keyword, ordering}));
    } else {
      const columnName = type ? 'group' : null;
      dispatch(getClasses({type,columnName}));
    }
    if (id) {
      dispatch(fetchClassById(id)); 
    }
  }, [dispatch,type, ClassType, price, duration, keyword, ordering,id]);

  return { classData, loading, error, selectedClass, limitedClass, classLessons, classFacilities};
};

export default useClass;
