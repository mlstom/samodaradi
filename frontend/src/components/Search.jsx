import React,{useState,useEffect} from 'react';



import MasonytLayout from './MasonytLayout';
import { client } from '../client';
import { searchQuery,feedQuery } from '../utilis/data';
import Spinner from './Spinner';


const Search = ({searchTerm}) => {
  const [slike, setslike] = useState()
  const [ucitavanje, setucitavanje] = useState(false)

  useEffect(() => {
    if(searchTerm){
      setucitavanje(true)
      const query = searchQuery(searchTerm.toLowerCase())
      client.fetch(query).then((data)=>{
        setslike(data);
        setucitavanje(false)
      })

    }else{
      client.fetch(feedQuery).then((data)=>{
        setslike(data);
        setucitavanje(false)
      })
    }
  }, [searchTerm])



  return <div className='bg-transparent'>
        {ucitavanje && <Spinner poruka='Ucitavanje slika' /> }
        {slike?.lenght !==0 && <MasonytLayout pins={slike} />}
        {slike?.lenght ===0 && !ucitavanje && searchTerm !=="" (
            <div>
              <p> Nema trazenih slika</p>
            </div>
        ) }
      
  
  </div>;
};

export default Search;
