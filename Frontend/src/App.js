import React from "react";
import { Route, Routes } from "react-router-dom";
import ConfirmPassword from "./components/auth/ConfirmPassword";
import EmailVerification from "./components/auth/EmailVerification";
import ForgotPassword from "./components/auth/ForgotPassword";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Navbar from "./components/user/Navbar";
import { useAuth } from "./hooks";
import AdminNavigator from "./Navigator/AdminNavigator";
import Dashboard from "./components/Admin/Dashboard";
import SingleMovie from "./components/user/SingleMovie";
import Main from "./components/MovieMain/Main";
import SideBar from "./components/Admin/SideBar";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Movies from "./components/Admin/Movies";
import AddMovie from "./components/Admin/AddMovie";
import UpdateMovie from "./components/Admin/UpdateMovie";
import NewNav from "./components/user/NewNav";  
import { Toaster } from "react-hot-toast";
import WatchPage from "./components/MovieMain/WatchPage";
import MoviePage from "./components/MoviesPage/MoviePage";
import Actors from "./components/Admin/Actors";
import Aos from "aos";
import ActorUpload from "./components/models/ActorUpload";
import MobileFooter from "./components/user/MobileFooter";
import Footer from "./components/user/Footer";
import SearchMovies from "./components/Admin/SearchMovies";

export default function App() {
  Aos.init();
  const {authInfo} = useAuth()
  const isAdmin = authInfo.profile?.role === 'admin'

  

  // if(isAdmin) return <AdminNavigator/>
  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-main min-h-[100vh] text-white">
      <NewNav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        
        <Route path="/auth/signin" element={<SignIn/>} />
        <Route path="/auth/signup" element={<SignUp/>} />
        <Route path="/auth/verification" element={<EmailVerification />} />
        <Route path="/auth/forget-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ConfirmPassword />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/movie" element={<Main />} />
        <Route path="/admin" element={<SideBar />} />
        <Route path="/trailer/:movieId" element={<WatchPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard admin={isAdmin} />} />
        <Route path="/admin/movielist" element={<Movies admin={isAdmin} />} />
        <Route path="/admin/addmovie" element={<AddMovie admin={isAdmin} />} />
        <Route path="/admin/updatemovie" element={<UpdateMovie admin={isAdmin}/>} />
        <Route path="/admin/actor" element={<Actors admin={isAdmin}/>} />
        <Route path="/search" element={<SearchMovies />} />
        <Route path="/admin/add/actor" element={<ActorUpload admin={isAdmin}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
       <Footer/>
      <Toaster/>
      <MobileFooter/>
      </div>
    </>
  );
}
