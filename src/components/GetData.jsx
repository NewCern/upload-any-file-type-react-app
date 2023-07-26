import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loading, notLoading } from '../store/loadingSlice';

const rowStyle = {
    padding:'5px',
    fontSize:'20px'
};
const rowContainer = {
    display:'flex',
    flexDirection:'column',
    width:'25%'
}
const inputStyle = {
    padding:'5px',
    fontSize:'20px',
    height:'50%', 
    display:'none'
}
const buttonContainer = {
    display:'flex',
    flexDirection:'column',
    width:'10%'
}
const hiddenButtonContainer = {
    display:'none',
    flexDirection:'column',
    width:'10%',
}
const saveStyle = {
    backgroundColor:'green', 
    color:'white',
}
const cancelStyle = {
    backgroundColor:'red', 
    color:'white',
}
const updateStyle = {
    backgroundColor:'#7483f9', 
    color:'white',
    border:'1px solid white',
    boxShadow:'2px 2px rgba(10, 10, 10, .5)'

}
const deleteStyle = {
    backgroundColor:'#de6251', 
    color:'white',
    border:'1px solid white',
    // height:'100%'
    boxShadow:'2px 2px rgba(10, 10, 10, .5)'

}
const refreshStyle = {
    display:'flex',
    justifyContent:'center',
    // backgroundColor:'#7483f9',
    // color:'white',
    alignItems:'center',
    width:'150px',
    fontSize:'20px',
    padding:'5px',
    paddingTop:'8px',
    // borderRadius:'20px',
    border:'3px solid',
    boxShadow:'2px 2px rgba(10, 10, 10, .5)'
}
const searchContainerStyle = {
    display:'flex',
    justifyContent:'space-between',
    paddingBottom:'20px',
    // border:'1px solid',
    // maxWidth:'1000px',
    // width:'700px',

}
const searchInputStyle = {
    width:'40%',
    padding:'10px',
    fontSize:'20px',
}
const searchButtonStyle = {
    color:'white',
    fontSize:'20px',
    width:'25%',
    backgroundColor:'#7483f9',
    border:'3px solid blue',
    boxShadow:'2px 2px rgba(10, 10, 10, .5)',
    marginRight:'30px'


}

function GetData() {
    const GET_URL = process.env.REACT_APP_GET;
    const DELETE_URL = process.env.REACT_APP_DELETE;
    const UPDATE_MESSAGE_URL = process.env.REACT_APP_SEND_UPDATE_MESSAGE;
    const DELETE_MESSAGE_URL = process.env.REACT_APP_SEND_DELETE_MESSAGE;
    const QUERY_URL = process.env.REACT_APP_QUERY_DATA;
    const SEARCH_URL = process.env.REACT_APP_SEARCH_RESULTS;
    const QUERY_RESULT_DIRECT = process.env.REACT_APP_QUERY_DATA_DIRECT;
    

    const [ selected, setSelected ] = useState(false);
    const isLoading = useSelector(state => state.loading);
    const dispatch = useDispatch();
    const [ data, setData ] = useState([]);
    const [ searchInitiated, setSearchInitiated ] = useState(false);
    const [ searchResults, setSearchResults ] = useState([]);
    const[ input, setInput ] = useState({
        firstName: "",
        lastName: "",
        address: "",
    });
    const[ searchInput, setSearchInput ] = useState({
        search: "",
    });

    const fetchAllData = async () => {
        try{
            dispatch(loading());
            setSearchInitiated(false);
            setSearchResults([]);

            await axios.get(GET_URL)
            .then((res) => {
                setData(res.data);
            });
            
            setTimeout(() => { 
                dispatch(notLoading());
             }, 700)
        } catch(error){
            console.log(error)
        }
    }

    const queryData = async () => {
        try{
            if(searchInput.search === "") return;
            dispatch(loading());
            setSearchInitiated(true);
            const { data } = await axios.post(QUERY_RESULT_DIRECT, searchInput);
            const body = JSON.parse(data.body);
            setSearchResults(body);
            console.log(body)
            setTimeout(() => { 
                dispatch(notLoading());
             }, 700)
        } catch(error){
            dispatch(notLoading());
            console.log(error)
        }
    }

    function displayInputHideRow(e, index){
        const currentRow = e.target;
        const editButton = currentRow.getAttribute('editbutton');
        const cancelButtonDOM = document.getElementById(`cancelbutton-${index}`);
        const saveButton = document.getElementById(`savebutton-${index}`);
        console.log(cancelButtonDOM);
        if(editButton == index){
            const row = document.getElementsByClassName(`record-${index}`);
            const input = document.getElementsByClassName(`input-${index}`);
            const button = document.getElementsByClassName(`button-${index}`);
            const record = Array.from(row);
            record.forEach((row, i) => {
                row.style.display = 'none';
                input[i].style.display = 'block';
                // delete button
                button[0].style.display = 'none';
                // edit button
                button[1].style.display = 'none';
                // save button
                button[2].style.display = 'flex';
                button[2].style.width = '10%';
                button[2].style.flexDirection = 'column';
                // cancel button
                button[3].style.display = 'flex';
                button[3].style.width = '10%';
                button[3].style.flexDirection = 'column';
                // Save and cancel buttons
                cancelButtonDOM.style.fontSize = '20px';
                cancelButtonDOM.style.padding = '2px';
                cancelButtonDOM.style.border = '1px solid white';
                saveButton.style.fontSize = '20px';
                saveButton.style.padding = '2px';
                saveButton.style.border = '1px  solid white';
            })
        }
    }

    function hideInputDisplayRow(e, index){
        const currentRow = e.target;
        const saveButton = currentRow.getAttribute('savebutton');
        const cancelButton = currentRow.getAttribute('cancelbutton');
        if(saveButton == index || cancelButton == index){
            const row = document.getElementsByClassName(`record-${index}`);
            const input = document.getElementsByClassName(`input-${index}`);
            const button = document.getElementsByClassName(`button-${index}`);
            const record = Array.from(row);
            record.forEach((row, i) => {
                row.style.display = 'block';
                input[i].style.display = 'none';
                // delete button
                button[0].style.display = 'flex';
                button[0].style.width = '10%';
                button[0].style.flexDirection = 'column';
                // edit button
                button[1].style.display = 'flex';
                button[1].style.width = '10%';
                button[1].style.flexDirection = 'column';
                // save button
                button[2].style.display = 'none';
                // cancel button
                button[3].style.display = 'none';
            })
        }
    }

    const populateInputField = (e, index, record) => {
        const currentRow = e.target;
        const editButton = currentRow.getAttribute('editbutton');
        if(editButton == index){
            setInput({
                firstName: record.firstName,
                lastName: record.lastName,
                address: record.address,
            })
        }
    }

    const recordSelected = () => {
        setSelected(!selected);
    }

    const handleChange = (e) => {
        const {name, value } = e.target;
        setInput(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }
    const handleSearchChange = (e) => {
        const {name, value } = e.target;
        setSearchInput(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
        console.log(searchInput.search)
    }

    const updateData = async (id) => {
        const update = {
            personId: id,
            firstName: input.firstName,
            lastName: input.lastName,
            address: input.address,
        };
        try{
            dispatch(loading());
            await axios.post(UPDATE_MESSAGE_URL, update)
            .then((res) => {
                dispatch(notLoading());
                setInput({
                    personId: id,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    address: input.address,
                });
            });
        } catch(error){
            console.log(error)
        }
    }

    const deleteData = async (id, person) => {
        const update = {
            personId: id,
            firstName: person.firstName,
            lastName: person.lastName,
            address: person.address,
        };
        try{
            dispatch(loading());
            await axios.post(DELETE_MESSAGE_URL, update)
            .then((res) => {
                dispatch(notLoading());
                queryData()
                // fetchAllData();
            });
        } catch(error){
            console.log(error)
        }
    }

    const refreshPage = (index) => {
        let retry = 0;
        let attempts = 100;
        while(document.getElementById(`address-div-${index}`) !== input.address && retry < attempts){
            fetchAllData();
            retry++;
        }
    }

    useEffect(() => {
        // fetchAllData();
        // console.log(visibleInput);
        // console.log(searchResults)
    },[ data, displayInputHideRow, input]);

  return (
    <div style={{
        display:'flex', 
        flexDirection:'column',
        justifyContent:'center', 
        alignItems:'center', 
        width:'90%', 
        margin:'30px',
        }}>
            <div style={{ width:'90%'}}>
                <div style={searchContainerStyle}>
                    <button style={refreshStyle} onClick={refreshPage}>REFRESH</button>
                    <input style={searchInputStyle} name='search' value={searchInput.search} type="text" onChange={handleSearchChange}/>
                    <input style={searchButtonStyle} type="submit" value="SEARCH" onClick={queryData}/>
                </div>

                {/* TERNERY TO SHOW OR HIDE SEARCH RESULTS */}
                {!searchInitiated ?
                <div name="all records container">                
                {/* START VIEW ALL RECORDS DIV */}
                <div className='records' style={{
                    // border:'1px solid',
                }}>{data.map((item, index) => (
                    <div key={index}>
                        <div style={{display:'flex', justifyContent:'start', alignItems:'center'}}>
                            <div style={rowContainer}>
                                <div className={`record-${index}`} style={rowStyle}>{item.firstName}</div>
                                <input className={`input-${index}`} type="text" style={inputStyle} name="firstName" onChange={handleChange} value={input.firstName} />
                            </div>
                            <div style={rowContainer}>
                                <div className={`record-${index}`} style={rowStyle}>{item.lastName}</div>
                                <input className={`input-${index}`} type="text" style={inputStyle} name="lastName" onChange={handleChange} value={input.lastName} />
                            </div>
                            <div style={rowContainer}>
                                <div id={`address-div-${index}`} className={`record-${index}`} style={rowStyle}>{item.address}</div>
                                <input className={`input-${index}`} type="text" style={inputStyle} name="address" onChange={handleChange} value={input.address} />
                            </div>
                            <div className={`button-${index}`} style={buttonContainer}>
                                <button onClick={(e) => {
                                    deleteData(item.personId, item);
                                    refreshPage(index);
                                    }} style={deleteStyle}>
                                    DELETE</button>
                                </div>
                            <div className={`button-${index}`} style={buttonContainer} >
                                <button editbutton={index} style={updateStyle} onClick={(e) => {
                                    if(selected === false){
                                        populateInputField(e, index, item);
                                        displayInputHideRow(e, index);
                                        recordSelected();
                                    }
                                }}>UPDATE</button>
                            </div>
                            <div className={`button-${index}`} style={hiddenButtonContainer}>
                                <button id={`savebutton-${index}`} style={saveStyle} savebutton={index} onClick={(e) => {
                                        hideInputDisplayRow(e, index);
                                        recordSelected();
                                        updateData(item.personId);
                                        refreshPage(index);
                                    }}>save</button>
                            </div>
                            <div className={`button-${index}`} style={hiddenButtonContainer}>
                                <button id={`cancelbutton-${index}`} style={cancelStyle} cancelbutton={index} onClick={(e) => {
                                    hideInputDisplayRow(e, index);
                                    recordSelected();
                                    }}>cancel</button>
                            </div>
                        </div>
                    </div>
                ))}</div>
                {/* END VIEW ALL FIELD */}
                </div>

                :

                <div name="search results container">
                {/* START SEARCH RESULTS FIELD */}
                <div className='records' style={{
                    // border:'1px solid'
                }}>{searchResults.map((item, index) => (
                    <div key={index}>
                        <div style={{display:'flex', justifyContent:'start', alignItems:'center'}}>
                            <div style={rowContainer}>
                                <div className={`record-${index}`} style={rowStyle}>{item.firstName}</div>
                                <input className={`input-${index}`} type="text" style={inputStyle} name="firstName" onChange={handleChange} value={input.firstName} />
                            </div>
                            <div style={rowContainer}>
                                <div className={`record-${index}`} style={rowStyle}>{item.lastName}</div>
                                <input className={`input-${index}`} type="text" style={inputStyle} name="lastName" onChange={handleChange} value={input.lastName} />
                            </div>
                            <div style={rowContainer}>
                                <div id={`address-div-${index}`} className={`record-${index}`} style={rowStyle}>{item.address}</div>
                                <input className={`input-${index}`} type="text" style={inputStyle} name="address" onChange={handleChange} value={input.address} />
                            </div>
                            <div className={`button-${index}`} style={buttonContainer}>
                                <button onClick={(e) => {
                                    deleteData(item.personId, item);
                                    refreshPage(index);
                                    }} style={deleteStyle}>
                                    DELETE</button>
                                </div>
                            <div className={`button-${index}`} style={buttonContainer} >
                                <button editbutton={index} style={updateStyle} onClick={(e) => {
                                    if(selected === false){
                                        populateInputField(e, index, item);
                                        displayInputHideRow(e, index);
                                        recordSelected();
                                    }
                                }}>UPDATE</button>
                            </div>
                            <div className={`button-${index}`} style={hiddenButtonContainer}>
                                <button id={`savebutton-${index}`} style={saveStyle} savebutton={index} onClick={(e) => {
                                        hideInputDisplayRow(e, index);
                                        recordSelected();
                                        updateData(item.personId);
                                        refreshPage(index);
                                    }}>save</button>
                            </div>
                            <div className={`button-${index}`} style={hiddenButtonContainer}>
                                <button id={`cancelbutton-${index}`} style={cancelStyle} cancelbutton={index} onClick={(e) => {
                                    hideInputDisplayRow(e, index);
                                    recordSelected();
                                    }}>cancel</button>
                            </div>
                        </div>
                    </div>
                ))}</div>
                {/* END SEARCH RESULTS FIELD */}
                </div>

                }

                {/* NO RESULTS MATCH KEYWORDS DIV */}
                {/* <div style={{display:'flex',justifyContent:'center'}}>
                {searchResults.length < 1 && searchInitiated ? <div><h1>No Results Matched</h1></div> : ""}
                </div> */}
                
            </div>
    </div>
  );
}

export default GetData;
