import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CompleteModuleThunk, fetchExamByNo, fetchLessonById, fetchOrderLessonById, submitTestThunk, updateAnswerThunk } from '../services/api/lessonSlice';

const useLesson = (id=null, orderId = null, type = null, no = null) => {
  const dispatch = useDispatch();
  const {selectedLesson,beforeLesson,afterLesson,test,tests,status,submitStatus} = useSelector((state) => state.lesson);
  const loading = useSelector(state => state.class.loading);
  const error = useSelector(state => state.class.error);

  const updateAnswer = (id,AnswerData) => {
    dispatch(updateAnswerThunk({id,AnswerData}));
  };

  const submitTest = (orderLessonId) => {
    dispatch(submitTestThunk(orderLessonId));
  };

  const completeModule = (id) => {
    dispatch(CompleteModuleThunk(id));
  };

  useEffect(() => {
    if (no) {
      dispatch(fetchExamByNo(no));
    }
    if (id) {
      dispatch(fetchOrderLessonById(id)); 
    }
  }, [dispatch,id,orderId,type,no]);

  return { selectedLesson, loading, error, beforeLesson, afterLesson, test, tests, updateAnswer,status, submitTest, submitStatus, completeModule };
};

export default useLesson;
