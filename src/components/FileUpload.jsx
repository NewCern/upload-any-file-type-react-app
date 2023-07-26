import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loading, notLoading } from '../store/loadingSlice';

const uploadButtonStyle = {
    color:'white',
    fontSize:'20px', 
    padding:'10px', 
    width:'120px',
    borderRadius:'25px', 
    backgroundColor:'#40c060',
    border:'3px solid green',
    boxShadow:'2px 2px rgba(10, 10, 10, .5)'
}
const chooseFile = {
    color:'white',
    fontSize:'20px', 
    padding:'10px', 
    // borderRadius:'15px', 
    backgroundColor:'#4773c4',
    border:'none',
    boxShadow:'2px 2px rgba(10, 10, 10, .5)'
}

function FileUpload(props) {
    const URL = process.env.REACT_APP_URL;

    const isLoading = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const [dataObject, setDataObject] = useState({});
    // const [loading, setLoading] = useState(false);
    const[input, setInput] = useState({
        path: "",
    })

    const handleChange = (e) => {
        console.log(isLoading)
        const{name, value} = e.target;
        setInput(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    ;}

    const uploadFile = async () => {
        try{
            if(input.path !== ""){
                dispatch(loading());
                await axios.post(URL, dataObject)
                .then((res) => {
                    console.log("Here is the response: ", res);
                    dispatch(notLoading());
                });
                setInput({
                    path: "",
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
        width:'40%', 
        minWidth:'550px',
        maxWidth:'800px',
        // height:'100vh',
        minHeight:'400px', 
        // maxHeight: '600px',
        margin:'30px',
        // border:'5px solid silver'
        }}>
        <div style={{
            display:'flex', 
            justifyContent:'space-between', 
            flexDirection:'column', 
            alignItems:'center',
            // maxHeight:'400px',
            height:'70%',
            width:'80%',
            // border:'1px solid silver',
            borderRadius: '15px',
            paddingBottom:'30px',
            // boxShadow: '5px 5px 5px rgba(200, 200, 200, .5)'
            }}>
            <h2 style={{color:'grey'}}>Upload file To S3 Bucket</h2>
            <span style={{fontWeight:'400', fontSize:'25px'}}>S3 Bucket URL: </span>
            <input style={{padding:'15px', fontSize:'16px', textAlign:'center', width:'85%'}} name='path' type='text' placeholder='upload path' value={input.path} onChange={handleChange}/>
            <div style={{
                display:'flex',
                justifyContent:'center',
                width:'90%'
            }}>
                <input type="file" style={{fontSize:'20px', padding:'10px'}} onChange={(e) => {
                    // current uploaded file
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    // when file is loaded
                    reader.onload = (e) => {
                        // get base64 encoded file
                        // example: "data:text/xml;base64,ESCKkilahe1"
                        const path = e.target.result;
                        // split into ["data:text/xml", "base64,EACASETXXAAET..."]
                        const segments = path.split(';');
                        // extract "text/xml"
                        const mime = segments[0].split(':')[1];
                        // extract the base64 encoded data ONLY. 
                        // splits into ["base64", "SEACSEiXAE..."] for example
                        const data = segments[1].split(',')[1];
                        // convert from base64 to string
                        // const xmlString = atob(data);
                        // remove white space
                        // const removeWhiteSpace = xmlString.replace(/\s/g, '');
                        // const removeBOM = removeWhiteSpace.replace('\ufeff', '');
                        // convert back to base64
                        // const base64String = btoa(removeBOM);

                        // get the file name
                        const name = file.name;
                        setDataObject({
                            mime,
                            name,
                            xml: data,
                        })
                    }
                    reader.readAsDataURL(file);
                    setInput({ path: URL })
                }} />
                <button style={uploadButtonStyle} onClick={uploadFile}>upload</button>
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

export default FileUpload;
