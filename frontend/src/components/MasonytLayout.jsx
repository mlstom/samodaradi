import React from 'react';
import Masonry from 'react-masonry-css';
import Pin from './Pin';

const breakpointObj ={
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
}


const MasonytLayout = ({pins}) => {
  return <div className='hide-scrolbar'>
      <Masonry className='flex animate-slide-fwd z-50 overflow-scroll max-h-full hide-scrollbar' breakpointCols={breakpointObj}>
            {
                pins?.map((pin)=> <Pin key={pin._id} pin={pin} className="w-max" />)
                

            }
            
      </Masonry>
  </div>;
};

export default MasonytLayout;
