import React from 'react'
import { Outlet, Route, Routes } from 'react-router'
import Home from './components/Home'
import Header from './components/Header';
import LoginForm from './components/forms/LoginForm';


const BaseLayout = () => {
  return (
    <>
      <Header />
      <section className="min-h-[90vh] bg-gray-100 p-4 lg:px-[12%]">
        <Outlet />
      </section>
    </>
  );
}

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<BaseLayout />} >
        <Route index element={<Home />} />
        <Route path="login" element={<LoginForm />} />
      </Route>

      {/* <Route path="about" element={<About />} />

      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="concerts">
        <Route index element={<ConcertsHome />} />
        <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} />
      </Route> */}
    </Routes>
  )
}

export default App
