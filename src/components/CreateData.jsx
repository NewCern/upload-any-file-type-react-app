import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loading, notLoading } from '../store/loadingSlice';
// import { uploadDocument } from './OpenSearch';

const submitButtonStyle = {
    color:'white',
    fontSize:'20px', 
    padding:'10px', 
    width:'120px',
    borderRadius:'25px', 
    backgroundColor:'#40c060',
    border:'3px solid green',
    boxShadow:'2px 2px rgba(10, 10, 10, .5)'
}

function CreateData() {
    const URL = process.env.REACT_APP_CREATE;
    const isLoading = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const[input, setInput] = useState({
        firstName: "",
        lastName: "",
        address: "",
    })

    const handleChange = (e) => {
        const{name, value} = e.target;
        setInput(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const submitPerson = async () => {
        try{
            const person = {
                firstName: input.firstName,
                lastName: input.lastName,
                address: input.address,
            };
            if(input.firstName !== "" && input.lastName !== ""){
                dispatch(loading());
                await axios.post(URL, person)
                .then((res) => {
                    dispatch(notLoading());
                    setInput({
                        firstName: "",
                        lastName: "",
                        address: "",
                    })
                })
            }
        } catch(error){
            console.log(error)
        }
    }

  return (
    <div style={{
        display:'flex', 
        flexDirection:'column',
        justifyContent:'center', 
        alignItems:'center', 
        width:'50%', 
        minWidth:'550px',
        maxWidth:'800px',
        // height:'40vh',
        minHeight:'400px', 
        // maxHeight: '600px',
        // border:'1px solid',
        margin:'30px',
        // border:'5px solid silver'
        }}>
        <div style={{
            display:'flex', 
            justifyContent:'space-between', 
            flexDirection:'column', 
            alignItems:'center',
            // maxHeight:'400px',
            // minHeight:'200px',
            height:'80%',
            width:'70%',
            // border:'1px solid silver',
            borderRadius:'25px',
            paddingBottom:'30px',
            // boxShadow:'4px 4px 4px rgba(200, 200, 200, .5)'
            }}>
            <h2 style={{color:'gray'}}>POST to DynamoDB</h2>
            <input style={{ fontSize:'25px', textAlign:'center'}} name='firstName' type='text' placeholder='firstName' value={input.firstName} onChange={(e) =>handleChange(e)}/>
            <input style={{ fontSize:'25px', textAlign:'center'}} name='lastName' type='text' placeholder='lastName' value={input.lastName} onChange={handleChange}/>
            <input style={{ fontSize:'25px', textAlign:'center'}} name='address' type='text' placeholder='address' value={input.address} onChange={handleChange}/>
            <div style={{
                display:'flex',
                justifyContent:'center',
                width:'60%'
            }}>
                <button style={submitButtonStyle} onClick={submitPerson}>submit</button>
            </div>
        </div>
        {/* <div style={{height:'20%'}}>
        {
        loading
        ? <h2>uploading.....</h2>
        : ""
        }
        </div> */}
    </div>
  );
}

export default CreateData;
