// hooks/useUser.js
import { useDispatch, useSelector } from 'react-redux';
import { createOrderThunk, createReviewThunk, fetchTestResult, getMyClasses, getOrderById, getOrders, paidOrderThunk, updateOrderThunk } from '../services/api/orderSlice';
import { useEffect } from 'react';

const useOrder = (id=null,params=null, testId = null, classes = false) => {
  const dispatch = useDispatch();
  const { orderData, currentOrder, loading, error, status, orderLessons, resultData, myClassData } = useSelector(state => state.order);

  const createOrder = (userData) => {
    dispatch(createOrderThunk(userData));
  };

  const createReview = (reviewData) => {
    dispatch(createReviewThunk(reviewData));
  };

  const updateOrder = (orderData) => {
    dispatch(updateOrderThunk(orderData));
  };

  const paidOrder = (id) => {
    dispatch(paidOrderThunk(id));
  };

    useEffect(() => {
      if (testId) {
        dispatch(fetchTestResult(testId));
      }
      // if (order_id || user_id) {
        dispatch(getOrders(params)); 
      // }
      if (classes) {
        dispatch(getMyClasses(params));
      }
      if (id) {
        dispatch(getOrderById(id));
      }
    }, [dispatch,params]);

  return { currentOrder, loading, error, createOrder, orderData, updateOrder, status, orderLessons, createReview, resultData, paidOrder, myClassData };
};

export default useOrder;
