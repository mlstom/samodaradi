import React, {useState,useEffect} from 'react';
import {useParams} from 'react-router-dom'
import { searchQuery,feedQuery } from '../utilis/data';

import {client} from "../client"
import MasonytLayout from './MasonytLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [loading, setloading] = useState(false)
  const {categoryId} = useParams();
  const [pins, setpins] = useState(null)

  useEffect(() => {
    setloading(true)
    if(categoryId){
        const query = searchQuery(categoryId);
        client.fetch(query)
          .then((data)=>{
            setpins(data);
            setloading(false)
          })
    }else{
      client.fetch(feedQuery)
        .then((data)=>{
          setpins(data);
          setloading(false);
        })
    }
  }, [categoryId])

  if(loading) return <Spinner poruka="Ucitavanje slika..." />
  return <div className='hide-scrollbar pb-20 md:pb-3'>
      
      {pins && <MasonytLayout pins={pins}/>}
      
      </div>;
};

export default Feed;
