import React,{useState,useEffect} from 'react';
import {useNavigate,Link} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {RiDeleteBin5Line } from 'react-icons/ri'
import {AiOutlineDownload } from 'react-icons/ai'
import {FcLikePlaceholder } from 'react-icons/fc'
import {FcLike } from 'react-icons/fc'



import {client, urlFor} from '../client';

import userSavedPinsQuery from '../utilis/data'



const Pin = ({pin}) => {


  const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  const navigate = useNavigate()

  const [hover, sethover] = useState(false)
  const [lajkovan, setlajkovan] = useState(false)
  const [small, setsmall] = useState(false)

  useEffect(() => {



    setsmall(true)
  }, [])

  let alreadySaved = pin?.save?.filter((item) => item?.postedBy._id === user?.googleId);

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const obrisipin = (id) => {
      client.delete(id)
        .then(()=>{
          window.location.reload();
        })
  }


  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setlajkovan(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setlajkovan(false);
        });
    }else{
        setlajkovan(true);
        const unlike =[`save[userId=="${user?.googleId}"]`]
        client.patch(id).unset(unlike).commit().then(() => {
          window.location.reload();
          setlajkovan(false);
        });
    }
  };

  return <div className='p-2 hide-scrollbar'>
      <div 
      onMouseEnter={()=>sethover(true)}
      onMouseLeave={()=> sethover(false)}
      onClick={()=> navigate(`/pin-detail/${pin._id}`)}

      className='relative cursor-pointer w-auto hover:shadow-2xl rounded-lg overflow-hidden transition-all duration-500 ease-in-out '>
        <img src={urlFor(pin.image).width(250).url()} 
          className='w-full'
        />

<div>

<div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pb-2z-50 flex flex-col md:hidden'> 
    
    <div className='flex gap-2 justify-between '> 
      
        <a
          href={`${pin.image?.asset?.url}?dl=`}
          download
          onClick={(e)=>{
            e.stopPropagation()
          }}
          className='bg-white rounded-full w-8 h-8 opacity-75 text-xl  flex justify-center items-center hover:shadow-md outline-none'
        >
            <AiOutlineDownload />
        </a>
        
        <a
        href={`https://${pin.destination}`}
        target="_blank"
        onClick={(e)=>{
          e.stopPropagation()
        }}
        className='bg-white hover:shadow-md outline-none opacity-75 '
        >
          {pin.destination.slice(0,17)}
        </a>
        {pin.postedBy?._id === user?.googleId && (
          <button
          onClick={(e)=>{
            e.stopPropagation()
            obrisipin(pin._id)
          }}
          className='bg-white rounded-full w-8 h-8 opacity-75 text-xl  flex justify-center items-center hover:shadow-md outline-none'
          >
              <RiDeleteBin5Line />
          </button>
        )}

      </div>
     
</div>
 <div className=' gap-2 justify-around pb-2 flex md:hidden'>
 <Link to={`/user-profile/${pin.postedBy?._id}`} className="flex gap-2 mt-2 items-center z-50 hover:shadow-md"
  onClick={(e) => {
    e.stopPropagation();
    
  }}
          
 >
       <img
         className="w-8 h-8 rounded-full object-cover"
         src={pin.postedBy?.image}
         alt="user-profile"
       />
       <p className="font-semibold capitalize">{pin.postedBy?.userName}</p>
     </Link>
     {alreadySaved?.length !== 0 ? (
      <button type="button"
      onClick={(e) => {
        e.stopPropagation();
        savePin(pin._id)
      }}

      className="  z-50   hover:shadow-md outline-none">
        <div className='flex w-auto'>
        <p>{pin?.save?.length}</p>   <FcLike className='w-10 h-10' /> 
          </div>    
      </button>
    ) : (
      <button
      onClick={(e) => {
        e.stopPropagation();
        savePin(pin._id)
      }}
        type="button"
        className=" z-50   hover:shadow-md outline-none"
      >
        <div className='flex w-auto'>
          {lajkovan ? 'Lajkovanje' : <div className='flex'> <p>{pin?.save?.length}</p>  <FcLikePlaceholder className='w-10 h-10' /> </div>}
          </div> 
      </button>
    )}
</div>

</div>




        {hover && (
            
          <div className='hidden md:flex md:flex-col'>

          <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pb-2z-50 '> 
              
              <div className='flex gap-2 justify-between '> 
                
                  <a
                    href={`${pin.image?.asset?.url}?dl=`}
                    download
                    onClick={(e)=>{
                      e.stopPropagation()
                    }}
                    className='bg-white rounded-full w-8 h-8 opacity-75 text-xl  flex justify-center items-center hover:shadow-md outline-none'
                  >
                      <AiOutlineDownload />
                  </a>
                  
                  <a
                  href={`https://${pin.destination}`}
                  target="_blank"
                  onClick={(e)=>{
                    e.stopPropagation()
                  }}
                  className='bg-white hover:shadow-md outline-none opacity-75 '
                  >
                    {pin.destination.slice(0,17)}
                  </a>
                  {pin.postedBy?._id === user?.googleId && (
                    <button
                    onClick={(e)=>{
                      e.stopPropagation()
                      obrisipin(pin._id)
                    }}
                    className='bg-white rounded-full w-8 h-8 opacity-75 text-xl  flex justify-center items-center hover:shadow-md outline-none'
                    >
                        <RiDeleteBin5Line />
                    </button>
                  )}
          
                </div>
               
          </div>
           <div className='flex gap-2 justify-around pb-2 '>
           <Link to={`/user-profile/${pin.postedBy?._id}`} className="flex gap-2 mt-2 items-center z-50 hover:shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              
            }}
                    
           >
                 <img
                   className="w-8 h-8 rounded-full object-cover"
                   src={pin.postedBy?.image}
                   alt="user-profile"
                 />
                 <p className="font-semibold capitalize">{pin.postedBy?.userName}</p>
               </Link>
               {alreadySaved?.length !== 0 ? (
                <button type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  savePin(pin._id)
                }}

                className="  z-50   hover:shadow-md outline-none">
                  <div className='flex w-auto'>
                  <p>{pin?.save?.length}</p>   <FcLike className='w-10 h-10' /> 
                    </div>    
                </button>
              ) : (
                <button
                onClick={(e) => {
                  e.stopPropagation();
                  savePin(pin._id)
                }}
                  type="button"
                  className=" z-50   hover:shadow-md outline-none"
                >
                  <div className='flex w-auto'>
                    {lajkovan ? 'Lajkovanje' : <div className='flex'> <p>{pin?.save?.length}</p>  <FcLikePlaceholder className='w-10 h-10' /> </div>}
                    </div> 
                </button>
              )}
          </div>

        </div>
        )}
      </div>
      
  </div>;
};


export default Pin;
