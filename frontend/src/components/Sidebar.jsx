import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import {FcHome as Home} from 'react-icons/fc'

import { categories } from '../utilis/data';

import logo from '../assets/logo4.png';

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({user}) => {
  
  return <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex-row justify-between w-full  h-full'>

      
                          
        

          <Link
          to="/"
          className='flex  flex-row  my-6 '
          >
            <div
            className='flex flex-row px-5 gap-2 my-6 w-100 justify-between '
            >
            <img src={logo} className='w-20 h-20'></img>
            <p className='text-xl font-bold '>Beograd Na Dlanu</p>
            </div>
          </Link>
          <div className="   ">
                              
                          
            <div>
              <NavLink
              to="/"
              className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
              >
                <Home></Home>
                <h1  className='text text-xl'>Home</h1>
              </NavLink>
              <h3 className="mt-2 mb-1 px-10 mt-3 text-base 2xl:text-xl">Pretrazi Kategorije</h3>
              {categories.slice(0,categories.length).map((category) =>(
                  <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                key={category.name}
                  >
                  {category.name}
                  </NavLink>
              )) }
            </div>
            <Link
                            to={`user-profile/${user?._id}`}
                            className= " flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-2xl mx-3 ">
                                  <div>
                                  <img src={user?.image} className='"w-10 h-10 rounded-full'></img>
                                  </div>
                                  <div>
                                  <p className='w-16'>{user?.userName}</p>
                                  </div>
                            </Link>
                          </div>
            
                    

           
                    
                
      </div>
    
  </div>
  
    

};

export default Sidebar;
