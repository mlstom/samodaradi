import React,{useEffect,useState} from 'react';
import {GoogleLogout} from 'react-google-login'
import { useParams, useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from 'react-icons/md';

import { userCreatedPinsQuery,userQuery,userSavedPins, userSavedPinsQuery } from '../utilis/data';
import { client } from '../client';
import MasonytLayout from './MasonytLayout';
import Spinner from './Spinner';

const random="https://source.unsplash.com/1600x900/?technology,photography"

const aktivanoDugmeIzgled = "bg-red-500 text-white font-bold p-2 rounded-full w-32  outline-none align-center text-center "
const neAktivnoDugmeIzgled = "bg-primary mr-4 text-black font-bold p-2 rounded-full w-32  outline-none  "


const UserProfile = () => {
  const [user, setuser] = useState(null)
  const [slike, setslike] = useState(null)
  const [pro, setpro] = useState('Napravljene')
  const [aktivnodugme, setaktivnodugme] = useState('Napravljene')

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
  const navigate = useNavigate()

  const {userId} = useParams()

  useEffect(() => {
    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
    
    if(!user) navigate('/login');
  }, [])


  useEffect(() => {
    if(pro==='Napravljene'){
      const createdPinsQuery= userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data)=>{
        setslike(data);
      })
    }else{
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data)=>{
        setslike(data);
        
      })

    }
  }, [pro,userId])


  const logout= () =>{
    localStorage.clear()
    navigate("/login")
  }

  useEffect(() => {
    const query = userQuery(userId)
    client.fetch(query).then((data)=>{
      setuser(data[0])
    })
  }, [userId])

  if(!user){
    return <Spinner poruka='ucitavanje usera' />
  }

  return <div className='bg-zinc-200 pb-20'>

      <div className='p-3 flex justify-center place-center'>
          <div className='baner w-full flex justify-center flex-col items-center '>
            <img 
              src={random}
              className="w-full h-300 2xl:h-370 shadow-lg object-cover"
            />
            <img
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover '
              src={user.image}
            />
            <h1
              className='font-bold text-3xl text-center mt-3'
            >
              {user.userName}
            </h1>
            
                  { userInfo?.googleId === userId && (
                    
                      <GoogleLogout
                        clientId='928159064575-gec1ittj1fam7b8vr900k7bhesl5id0a.apps.googleusercontent.com'

                        render={(renderProps) => (
                          <button
                          type="button"
                          className="bg-white p-2 rounded-full cursor-pointer outline-none z-10 absolute top-10 right-10 w-32 h-10 flex items-center justify-around "
                          
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
        
                          >
                            <MdOutlineLogout  />
                            Izloguj se
                          </button>
                        )}
                        onLogoutSuccess={logout}
                        
                        cookPolicy="single_host_origin"
                      />
                  )

                        }
            
          </div>
                      

          

      </div>
      <div className='text-center mb-7 z-1'>
                  <button
                    type="button"
                    onClick={(e)=>{
                      setpro(e.target.textContent);
                      setaktivnodugme('Napravljene');
                    }
                      
                    }
                    className={`${aktivnodugme === 'Napravljene' ? aktivanoDugmeIzgled : neAktivnoDugmeIzgled }`}
                  >
                        Napravljene  
                  </button>
                  <button
                    type="button"
                    onClick={(e)=>{
                      setpro(e.target.textContent);
                      setaktivnodugme('Lajkovane');
                    }
                      
                    }
                    className={`${aktivnodugme === 'Lajkovane' ? aktivanoDugmeIzgled : neAktivnoDugmeIzgled }`}
                  >
                        Lajkovane 
                  </button>
        </div>
                    {slike?.length ? (
                        <div className='px-2 z-30'>
                        <MasonytLayout pins={slike} />
                      </div>
                    ):(
                      <div className='flex justify-center mt-10 z-30'>
                        Nema slika...
                        </div>
                   