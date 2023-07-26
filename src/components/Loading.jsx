import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '350px',
    backgroundColor: '#637edf',
    color: 'white',
    border:'3px solid silver',
    position: 'fixed', // Change position to 'fixed' instead of 'absolute'
    top: '50%', // Set the top position to center vertically
    left: '50%', // Set the left position to center horizontally
    transform: 'translate(-50%, -50%)', // Center the element using transform
    // borderRadius:'20px',
    // border:'2px solid black',
    boxShadow: '3px 3px 3px rgba(10, 10, 10, .5)'
  };
  

function Loading(){
    const loading = useSelector(state => state.loading);
    return (
        <div>
            {
                loading.loading 
                ? <div style={loadingStyle} ><h1>PROCESSING.....</h1></div>
                : ""
            }
        </div>
    );
}

export default Loading;