import React from 'react';
import GoogleLogin from 'react-google-login';
import {  useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'

import logo from '../assets/logo4.png'
import baner from '../assets/Baner.jpg'

import {client} from '../client'


const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: response.profileObj.googleId,
      _type: 'user',
      userName: response.profileObj.name,
      image: response.profileObj.imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    
  <div className='flex flex-col justify-start items-center max-h-screen overflow-hidden'>
    <div className='relative'>
      <img src={baner} className=' object-cover  max-h-screen min-w-fit' ></img>
      <div className='absolute bg-blackOverlay flex-col flex justify-center items-center z-10 top-0 bottom-0 right-0 left-0 opacity-80'>
          <div className='p-5'>
                <img src={logo} className='z-50 w-20 h-20'></img>
          </div>
          <div className='shadow-2x1'>
              <GoogleLogin 

                clientId='928159064575-gec1ittj1fam7b8vr900k7bhesl5id0a.apps.googleusercontent.com'

                render={(renderProps) => (
                  <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center pt-3 pb-3 pr-6 pl-6 rounded-lg cursor-pointer"
                  onClick={renderProps.onClick}
                  
                  disabled={renderProps.disabled}

                  >
                   
                    <p> Uloguj se pomcu Googla</p>
                    <FcGoogle className='ml-4' />
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookPolicy="single_host_origin"
              />
          </div>
      </div>
    </div>
    
  </div>
  
  
  )

  

};

export default Login;
