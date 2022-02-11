import React from 'react';
import {MutatingDots as Loader} from 'react-loader-spinner'


const Spinner = ({poruka}) => {
  return <div className='flex flex-col  justify-center items-center z-100 h-full'>
            <Loader
            color="#ff4d4d"
            height={200}
            widht={200}
            className="m-5"
             />
            <p>{poruka} </p>

  </div>;
};

export default Spinner;
