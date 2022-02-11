import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {RiDeleteBinLine} from 'react-icons/ri'

import {RiUploadCloud2Line} from "react-icons/ri"

import { client } from '../client';
import Spinner from './Spinner';
import { categories } from '../utilis/data';


const CreatePin = ({user}) => {
  const [title, settitle] = useState('')
  const [about, setabout] = useState('')
  const [destination, setdestination] = useState('')
  const [loading, setloading] = useState(false)
  const [fields, setfields] = useState(false)
  const [category, setcategory] = useState(null)
  const [imageAsset, setimageAsset] = useState(null)
  const [wrongImage, setwrongImage] = useState(false)

  const navigate = useNavigate();

  const upoladImage = (e) => {
    const selectedFile = e.target.files[0];

    if(selectedFile.type ==='image/png' || selectedFile.type ==='image/svg' || selectedFile.type ==='image/gif' || selectedFile.type ==='image/jpg' || selectedFile.type ==='image/jpeg' || selectedFile.type ==='image/tiff' ){
        setwrongImage(false)
        setloading(true)

        client.assets
          .upload("image",selectedFile,{contentType : selectedFile.type, filename: selectedFile.name})
          .then((doc) =>{
            setimageAsset(doc)
            setloading(false)

          })
    }else{
      setwrongImage(true)
    }

  }

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setfields(true);

      setTimeout(
        () => {
          setfields(false);
        },
        2000,
      );
    }
  };

  return <div className=''>
    
      <div className='hidden md:flex p-5 justify-center  md:flex-row '>
               
                    {fields && (
                      <p className='text-red-500 text-xl '>Popuni sva polja !!!</p>
                    )
                    }
                  
          <div className='bg-white w-2/5 h-96 border-2 border-dashed border-slate-500 rounded-md'>
                      
                  <div className='flex justify-center items-center h-full  '>
                       {loading ? (<Spinner />) : (
                              <div>
                                    {wrongImage && (
                                        <p>
                                          Unesio sliku u pogresnom podatku
                                        </p>
                                      )}

                                      {!imageAsset ? (
                        <label className='cursor-pointer'>
                              <div className=''>
                                <p >
                                  <RiUploadCloud2Line className=' w-12 h-12' />
                                </p>     
                              </div>
                            <input
                              type='file'
                              name='slika'
                              onChange={upoladImage}
                              className='w-0 h-0 '
                            >
                            </input>

                        </label>

                    ):(
                      <div className='relative w-full h-96 '>
                       

                          <img
                            src={imageAsset?.url}
                            className="h-full w-full relative z-1 "
                          />
                           
                          <button
                              type='button'
                              className=' absolute z-50 bg-white border-none rounded-full bottom-3 right-3  hover:shadow-md  transition-all duration-500 ease-in-out  p-3 cursor-ponter'
                              onClick={()=> setimageAsset(null)}
                            >
                              <RiDeleteBinLine />
                            </button>
                          
                             
                      </div>
                    ) }
                              </div>


                       )}
                  </div>

          </div>

    
    </div>
    <div className='hidden md:flex w-full justify-center items-center  flex-col'>
                  <div className='flex justify-center items-center   flex-col gap-3  h-auto w-full pl-5 pt-5 gap-5'>
                    <input
                      className='outline-none p-2 text-xl focus:drop-shadow-md rounded-md  border-gray-200 w-2/5 '
                      type='text'
                      value={title}
                      onChange={(e)=> settitle(e.target.value)}
                      placeholder='Naslov...'
                    >
                    
                    </input>
                    <input
                      
                      
                      className='outline-none p-5  text-lg focus:drop-shadow-md rounded-md  border-gray-200 w-2/5 '
                      type='text'
                      value={about}
                      onChange={(e)=> setabout(e.target.value)}
                      placeholder='Desktipcija...'

                      
                    >
                    
                    </input>
                    <input
                      className='outline-none p-2 text-xl focus:drop-shadow-md rounded-md  border-gray-200 w-2/5 '
                      type='url'
                      value={destination}
                      onChange={(e)=> setdestination(e.target.value)}
                      placeholder='Dodaj link ka stranici'
                    />
                    

                    <div className='p-3 '>
                        <select className='p-2'
                        onChange={(e)=> setcategory(e.target.value)}

                        >
                          <option value='ostalo'>
                              Izaberi kategoriju
                          </option>
                        { categories.map((x) => (
                          <option value={x.name}>
                            {x.name}
                          </option>
                        ))
                            
                        } 
                        </select>
                    </div>

                    
                  </div>


            <div className="flex justify-center w-full h-full items-center mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Sacuvaj
              </button>
            </div>
    </div>


    <div className='md:hidden  pb-20'>
        <div className='flex justify-between pr-5 place-center'>
          <p className='text-bold text-2xl'>Napravi svoj pin</p>
          <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Sacuvaj
              </button>
            </div>
        </div>
                  
    <div className='flex  justify-between p-5  '>
                      
      {fields && (
         <p className='text-red-500 text-xl'>Popuni sva polja !!!</p>
      )
      }

      <div className='flex  flex-col justify-center items-center drop-shadow  h-72 rounded-lg   bg-white  w-2/5 '>
              <div className='flex'>
                
                  <div className='flex flex-row relative' >
                    { loading ? (<Spinner />) : (

                      <div>
                           {wrongImage && (
                      <p>
                        Unesio sliku u pogresnom podatku
                      </p>
                    )}
                    {!imageAsset ? (
                        <label className='cursor-pointer'>
                              <div className=''>
                                <p >
                                  <RiUploadCloud2Line className=' w-12 h-12' />
                                </p>     
                              </div>
                            <input
                              type='file'
                              name='slika'
                              onChange={upoladImage}
                              className='w-0 h-0 '
                            >
                            </input>

                        </label>

                    ):(
                      <div className='relative  '>
                       

                          <img
                            src={imageAsset?.url}
                            className="h-full w-full relative "
                          />
                           <div className='w-full flex justify-center'>
                          <button
                              type='button'
                              className=' z-50 rounded-full  hover:shadow-md  transition-all duration-500 ease-in-out  p-3 cursor-ponter'
                              onClick={()=> setimageAsset(null)}
                            >
                              <RiDeleteBinLine />
                            </button>
                          </div>
                             
                      </div>
                    ) }
                      </div>
                    )
                    
                      
                    }
                   
                  </div>
                   
                  
              </div>
      </div>
                      
                 

    </div>
                <div className='flex justify-center  flex-col gap-3  h-auto w-full pl-5 pt-5 gap-5'>
                  <input
                    className='outline-none p-2 text-xl focus:drop-shadow-md rounded-md  border-gray-200 w-4/5 '
                    type='text'
                    value={title}
                    onChange={(e)=> settitle(e.target.value)}
                    placeholder='Naslov...'
                  >
                  
                  </input>
                  <input
                    
                    
                    className='outline-none p-5  text-lg focus:drop-shadow-md rounded-md  border-gray-200 w-4/5 '
                    type='text'
                    value={about}
                    onChange={(e)=> setabout(e.target.value)}
                    placeholder='Desktipcija...'

                    
                  >
                  
                  </input>
                  <input
                    className='outline-none p-2 text-xl focus:drop-shadow-md rounded-md  border-gray-200 w-4/5 '
                    type='url'
                    value={destination}
                    onChange={(e)=> setdestination(e.target.value)}
                    placeholder='Dodaj link ka stranici'
                  />
                  

                  <div className='p-3 '>
                      <select className='p-2'
                       onChange={(e)=> setcategory(e.target.value)}

                      >
                        <option value='ostalo'>
                            Izaberi kategoriju
                        </option>
                       { categories.map((x) => (
                         <option value={x.name}>
                           {x.name}
                         </option>
                       ))
                          
                       } 
                      </select>
                  </div>

                  
                </div>
    </div>
  </div>
};

export default CreatePin;
