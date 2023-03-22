
import { Navigate } from 'react-router-dom'
import Login from '../components/auth/login/login'
import SignIn from '../components/auth/login/SignIn'
import Dashboard from '../components/dashboard/dashboard'
import { ROUTE_CONSTANTS } from './route-constants'

export const routes: any = [
  { path: ROUTE_CONSTANTS.SLASH, element: <Navigate to={ROUTE_CONSTANTS.DASHBOARD} /> },
  { path: ROUTE_CONSTANTS.LOGIN, element: <Login /> },
  { path: ROUTE_CONSTANTS.DASHBOARD, element: <Dashboard /> },
  { path: 'sign-in', element: <SignIn /> },

]
