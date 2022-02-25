import React, {useEffect,useState,useRef} from 'react';
import {Link,Routes,Route} from 'react-router-dom'



import UserProfile from '../components/UserProfile'
import Sidebar from '../components/Sidebar';
import Pins from './Pins';


import { userQuery } from '../utilis/data';
import { client } from '../client';
import logo from '../assets/logo4.png';
import Mobilebar from '../components/Mobilebar';
import CreatePin from '../components/CreatePin';

const Home = () => {
  
  const [user, setUser] = useState()

  

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

  useEffect( () => {

    const query = userQuery(userInfo?.googleId);
    
    client.fetch(query).then((data) => {
        setUser(data[0]);
    });
    
  }, []);

 




  return (
     <div className='hide-scrollbar'>
    <div className='bg-zinc-200 flex max-h-screen h-screen flex-initial'>
        <div className='hidden md:flex  h-full'  >
              <Sidebar user={user && user} /> 
        </div>
        <div className='w-screen max-h-screen z-30'>
          <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/create-pin" element={<CreatePin user={user && user} />} />
            <Route path="/*" element={<Pins user={user} />} />
           
          </Routes>
        </div>
        
        <div 
          className='fixed  md:hidden absolute  z-50  bg-transparent '>
           <Mobilebar user={user && user} />
        </div>

       
        
    </div>
    </div>
  )

}

export default Home;
