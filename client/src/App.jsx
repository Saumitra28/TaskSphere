// App.jsx
import React from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import Dashboard from "./pages/dashboard";
import { setOpenSidebar } from "./redux/slices/authSlice";
import { Helmet } from "react-helmet-async";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const getTitle = (pathname) => {
    switch (pathname) {
      case '/log-in':
        return 'Log In - TaskSphere';
      case 'register':
        return 'Register - TaskSphere'; 
      case '/dashboard':
        return 'Dashboard - TaskSphere';
      case '/tasks':
        return 'Tasks - TaskSphere';
      case '/completed/completed':
        return 'Completed Tasks - TaskSphere';
      case '/in-progress/in%20progress':
        return 'In Progress Tasks - TaskSphere';
      case '/todo/todo':
        return 'To Do Tasks - TaskSphere';
      case '/team':
        return 'Team - TaskSphere';
      case '/trashed':
        return 'Trashed Tasks - TaskSphere';
      case `/task/${location.pathname.split('/')[2]}`:
        return 'Task Details - TaskSphere';
      default:
        return 'TaskSphere';
    }
  };

  
  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <Helmet>
        <title>{getTitle(location.pathname)}</title>
      </Helmet>
      <div className='w-1/5 h-screen bg-[#100C08] sticky top-0 hidden md:block'>
        <Sidebar />
      </div>
      <MobileSidebar />
      <div className='flex-1 overflow-y-auto'>
        <Navbar />
        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={() => closeSidebar()}
          >
            <div className='bg-[#100C08] w-3/4 h-full'>
              <div className='w-full flex justify-end px-5 mt-5'>
                <button
                  onClick={() => closeSidebar()}
                  className='flex justify-end items-end'
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className='-mt-10'>
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

function App() {
  return (
    <main className='w-full min-h-screen bg-[#100C08]  '>
      <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<Navigate to='/dashboard' />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/completed/:status' element={<Tasks />} />
          <Route path='/in-progress/:status' element={<Tasks />} />
          <Route path='/todo/:status' element={<Tasks />} />
          <Route path='/team' element={<Users />} />
          <Route path='/trashed' element={<Trash />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Route>

        <Route path='/log-in' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

      <Toaster richColors />
    </main>
  );
}

export default App;
