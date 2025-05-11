// hooks/useUser.js
import { useDispatch, useSelector } from 'react-redux';
import { createOrderThunk, createReviewThunk, fetchTestResult, getOrderById, getOrders, paidOrderThunk, updateOrderThunk } from '../services/api/orderSlice';
import { useEffect } from 'react';

const useOrder = (id=null,order_id=null, columnName=null, user_id = null, testId = null) => {
  const dispatch = useDispatch();
  const { orderData, currentOrder, loading, error, status, orderLessons, resultData } = useSelector(state => state.order);

  const createOrder = (userData) => {
    dispatch(createOrderThunk(userData));
  };

  const createReview = (reviewData) => {
    dispatch(createReviewThunk(reviewData));
  };

  const updateOrder = (id,orderData) => {
    dispatch(updateOrderThunk({id,orderData}));
  };

  const paidOrder = (id) => {
    dispatch(paidOrderThunk(id));
  };

    useEffect(() => {
      if (testId) {
        console.log(testId);
        
        dispatch(fetchTestResult(testId));
      }
      if (order_id || user_id) {
        dispatch(getOrders({order_id,columnName, user_id})); 
      }
      if (id) {
        dispatch(getOrderById(id));
      }
    }, [dispatch,order_id]);

  return { currentOrder, loading, error, createOrder, orderData, updateOrder, status, orderLessons, createReview, resultData, paidOrder };
};

export default useOrder;
