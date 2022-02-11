import React,{useEffect, useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import Spinner from './Spinner';
import { v4 as uuidv4 } from 'uuid';
import {MdDownloadForOffline} from 'react-icons/md'
import { client,urlFor } from '../client';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utilis/data';
import {RiChatDeleteLine, RiDeleteBinLine} from 'react-icons/ri'
import MasonytLayout from './MasonytLayout';

const PinDetail = ({user}) => {
  const {pinId} = useParams()
  const [komentiranje, setkomentiranje] = useState(false)
  const [pinDetail, setPinDetail] = useState()
  const [comment, setcomment] = useState('')

  const [pins, setpins] = useState()



  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(`${query}`).then((data) => {
        setPinDetail(data[0]);
        if (data[0]) {
          const query1 = pinDetailMorePinQuery(data[0]);
          client.fetch(query1).then((res) => {
            setpins(res);
          });
        }
      });
    }
  };
  useEffect(() =>{
    fetchPinDetails()
  },[pinId])

  const addComment = () => {
    
      setkomentiranje(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchPinDetails();
          setcomment('');
          setkomentiranje(false);
        });
  };
  const delComment = (x) =>{
    const del =[`comments[_key=="${x}"]`]
    client.patch(pinId).unset(del).commit().then(()=>{
      window.location.reload();
    })
  }


  return <div clasName="">

{pinDetail && (
        <div className="pb-20 flex  xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-3xl rounded-b-lg"
              src={(pinDetail?.image && urlFor(pinDetail?.image).url())}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <a
                  href={`${pinDetail.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <a href={pinDetail.destination} target="_blank" rel="noreferrer">
                {pinDetail.destination?.slice(8)}
              </a>
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetail.title}
              </h1>
              <p className="mt-3">{pinDetail.about}</p>
            </div>
            <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{pinDetail?.postedBy.userName}</p>
            </Link>
            <h2 className="mt-5 text-2xl">Komentari</h2>
            <div className="max-h-370 overflow-y-auto">
              {pinDetail?.comments?.map((item) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                  {item.postedBy._id === user._id  && ( <button
                    type='button'


                    onClick={()=> delComment(item._key)}
                    >
                    <RiDeleteBinLine />
                    </button>)
                    
                    }
                </div>
              ))}
             
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
              <Link to={`/user-profile/${user._id}`}>
                <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Komentar"
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                
              />
              <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                { komentiranje ? 'komentiranje' : 'uspesno'}
              </button>
            </div>
          </div>
        </div>
      )}
      {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          Slicni pinovi
        </h2>
      )}
      {pins ? (
        <MasonytLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    


  </div>;
};

export default PinDetail;
