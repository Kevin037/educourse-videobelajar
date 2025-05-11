import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './index.css'
import LoginPage from './components/Pages/login.jsx'
import RegisterPage from './components/Pages/register.jsx'
import HomePage from './components/Pages/home.jsx'
import ProductPage from './components/Pages/product.jsx'
import CheckoutPage from './components/Pages/checkout.jsx'
import PaymentPage from './components/Pages/payment.jsx'
import ChangePaymentPage from './components/Pages/change_payment.jsx'
import SuccessPaymentPage from './components/Pages/success_payment.jsx'
import OrderPage from './components/Pages/orders.jsx'
import ProfilePage from './components/Pages/profile.jsx'
import ClassPage from './components/Pages/classes.jsx'
import { store } from './services/store.js'
import { Provider } from 'react-redux';
import CategoryPage from './components/Pages/category.jsx'
import MyClassPage from './components/Pages/class.jsx'
import CertificatePage from './components/Pages/certificate.jsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/register',
    element: <RegisterPage/>
  },
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/product/:id',
    element: <ProductPage/>
  },
  {
    path: '/checkout/:id',
    element: <CheckoutPage/>
  },
  {
    path: '/payment/:id',
    element: <PaymentPage/>
  },
  {
    path: '/change_payment/:id',
    element: <ChangePaymentPage/>
  },
  {
    path: '/success_payment',
    element: <SuccessPaymentPage/>
  },
  {
    path: '/orders',
    element: <OrderPage/>
  },
  {
    path: '/profile',
    element: <ProfilePage/>
  },
  {
    path: '/classes',
    element: <ClassPage/>
  },
  {
    path: '/category',
    element: <CategoryPage/>
  },
  {
    path: '/class/:id/:lessonId?/:no?/:rules?',
    element: <MyClassPage/>
  },
  {
    path: '/certificate/:id',
    element: <CertificatePage/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
