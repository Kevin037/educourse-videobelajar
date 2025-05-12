import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassById, getClassCategories, getClasses } from '../services/api/classSlice';

const useClass = (id=null,limit=0,category_id = null, price = null, duration = null, search = null, order_by = null) => {
  const dispatch = useDispatch();
  const {classData, selectedClass, classLessons, classFacilities, classCategoriesData} = useSelector((state) => state.class);
  const limitedClass = classData.slice(0,limit);
  const loading = useSelector(state => state.class.loading);
  const error = useSelector(state => state.class.error);

  useEffect(() => {
    // if (ClassType || price || duration || keyword || ordering) {
    //   dispatch(getClassesFilter({ClassType, price, duration, keyword, ordering}));
    // } else {
    dispatch(getClasses({category_id, price, duration, search, order_by}));
    dispatch(getClassCategories());
    // }
    if (id) {
      dispatch(fetchClassById(id)); 
    }
  }, [dispatch, category_id, price, duration, search, order_by,id]);

  return { classData, loading, error, selectedClass, limitedClass, classLessons, classFacilities, classCategoriesData};
};

export default useClass;
