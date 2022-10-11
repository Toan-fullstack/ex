import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { path } from './constants/path'
import AuthenticatedGuard from './guards/AuthenticatedGuard'
import UnauthenticatedGuard from './guards/UnauthenticatedGuard'
import MainLayout from './layouts/MainLayout/MainLayout'
import RegisterLayout from './layouts/ResgisterLayout/RegisterLayout'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import User from './pages/User/User'
export default function RoutesSetup() {
  return (
    <Routes>
      <Route
        path={path.home}
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      ></Route>
      <Route
        path={path.productDetail}
        element={
          <MainLayout>
            <ProductDetail />
          </MainLayout>
        }
      ></Route>
      <Route
        path={path.login}
        element={
          <UnauthenticatedGuard>
            <RegisterLayout title="Đăng nhập">
              <Login></Login>
            </RegisterLayout>
          </UnauthenticatedGuard>
        }
      ></Route>
      <Route
        path={path.register}
        element={
          <UnauthenticatedGuard>
            <RegisterLayout title="Đăng ký">
              <Register></Register>
            </RegisterLayout>
          </UnauthenticatedGuard>
        }
      ></Route>
      <Route
        path={path.user}
        element={
          <AuthenticatedGuard>
            <MainLayout>
              <User />
            </MainLayout>
          </AuthenticatedGuard>
        }
      ></Route>
      <Route path={path.notFound} element={<NotFound />}></Route>
    </Routes>
  )
}
