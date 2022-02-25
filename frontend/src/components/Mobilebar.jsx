import React from 'react';
import { NavLink} from 'react-router-dom';
import {FcAddImage,FcHome as Home } from 'react-icons/fc'


const isNotActiveStyle = ' transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = ' border-b-2 border-black transition-all duration-200 ease-in-out ';

const Mobilebar = ({user}) => {



  return <div >
        <div className=' w-screen  bg-transparent hide-scrollbar '>
            <div className='fixed w-full inset-x-0 bottom-3 h-14 bg-zinc-300  rounded-full '>
                <div className='flex justify-around items-center relative  '>
                    <NavLink to='/'
                        className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                    >
                          <Home className='w-12 h-12  ' />
                    </NavLink>
                    <NavLink to='/create-pin' className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
                          <FcAddImage className='w-12 h-12 ' />
                    </NavLink>
                   
                    <NavLink to={`user-profile/${user?._id}`} className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} >
                     <img src={user?.image} className='rounded-full w-10 h-10  '></img> 
                     </NavLink>


                </div>
                   
            </div>

        </div>

  </div>;
};

export default Mobilebar;
