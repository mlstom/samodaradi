import React from 'react';
import { Link, useNavigate,NavLink } from 'react-router-dom';
import { FcSearch } from 'react-icons/fc';
import { FcAddImage } from 'react-icons/fc';

import { categories } from '../utilis/data';

import logo from '../assets/logo4.png'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold   transition-all duration-200 ease-in-out capitalize';

const Navbar = ({searchTerm , setSearchTerm}) => {
    const navigate = useNavigate()


  return <div className=''>
      <div className=' p-3 bg-transparent z-10 flex flex-col gap-4 '>
          <div className='flex '>
          <div className='flex bg-white rounded-full w-full items-center px-2 md:p-1  border-none focus-within:drop-shadow-xl max-h-16'> 
            <FcSearch 
                className='w-10 h-10'
            />
            <input
                type="text"
                placeholder='Pretrazi...'
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                onFocus={()=> navigate("/search")}
                className='w-full rounded-full  outline-none  h-full '
            />
                
            </div>
            <div className='block md:hidden'>
                <Link to="/">
                 <img src={logo} className='w-10 h-10'></img>
                </Link>
               
            </div>
            <div className='hidden md:block'>
                    <Link to='/create-pin'>
                          <FcAddImage className='w-20 h-20 ' />
                    </Link>
            </div>
            
          </div>
            <div className='md:hidden '>
                    <div className='flex justify-between overflow-scroll hide-scrollbar '>
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
            </div>
            
            
      </div>
  </div>;
};

export default Navbar;
