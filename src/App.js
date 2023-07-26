import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import CreateData from './components/CreateData';
import FileUpload from './components/FileUpload';
import GetData from './components/GetData';
import Loading from './components/Loading';
import { useEffect, useState } from 'react';

const searchComponentStyle = {
  display:'flex',
  justifyContent:'center',
  borderTop:'1px solid silver',
  width:'80%',
  // maxWidth:'1100px'
}

function App() {
  const isLoading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div style={{display:'flex'}}>
        <FileUpload/>
        <CreateData/>
        <Loading/>
      </div>
      <div style={searchComponentStyle}>
        <GetData/>
      </div>
    </div>
  );
}

export default App;
