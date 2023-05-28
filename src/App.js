import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



function App() {

  const [books, setBooks] = useState(null);
  const [toppers, setToppers] = useState(null);
  const [openModal,setOpenModal] = useState(false);
  const [id,setId]= useState(null);
  const [firstname,setFirstName]= useState(null);
  const [lastname,setLastName]= useState(null);
  const [dob, setDob] = useState(null);
  const [parentsName,setParentsName]= useState(null);
  const [address,setAddress]= useState(null);
  const [city,setCity]= useState(null);
  const [phone,setPhone]= useState(null);



  useEffect(() => {
    getData();
    getTopersData();

    async function getData() {
      const response = await fetch(
        "http://localhost:8080/Students", { method: 'GET', 
        mode: 'cors',
        headers: {
          "access-control-allow-origin" : "*",
           accept: 'application/json','Content-Type': 'application/json' }, }
      );
      const data = await response.json();

       setBooks(data);
    }

    async function getTopersData() {
      const response = await fetch(
        "http://localhost:8080/Marks", { method: 'GET', 
        mode: 'cors',
        headers: {
          "access-control-allow-origin" : "*",
           accept: 'application/json','Content-Type': 'application/json' }, }
      );

      const data = await response.json();
  
       setToppers(data);
    }
  }, []);
  async function postData(){
    const response = await fetch(
      "http://localhost:8080/Students",{method:'POST',
    body:JSON.stringify({
      id: id,
      firstname: firstname,
      lastname: lastname,
      dob: dob,
      parentsName: parentsName,
      address: address,
      city: city,
      phone: phone
  }),
  headers: {
    "access-control-allow-origin" : "*",
     accept: 'application/json','Content-Type': 'application/json' }, }
    )

    const data = await response.json();
  }
  const handleOpen= ()=>{
    setOpenModal(true);
  }
  const handleClose = ()=>{
    setOpenModal(false);
  }
  const handleSubmit= ()=>{
    postData();
    setOpenModal(false);
   
  }

  return (
    <div className="App">
     
      <div className='list-content'>

    
      <div style={{flexDirection:2,margin:'20px'}}>
        <div className='list-header'>
          <h2>Students List</h2>
          <button className='add-button' onClick={handleOpen} >Add New Student</button>
        </div>
        
        <div >
      {books && (
         <div>
         <table>
             <tr>
                 <th>Id</th>
                 <th>First Name</th>
                 <th>Last Name</th>
                 <th>DOB</th>
                 <th>Parents Name</th>
                 <th>Address</th>
                 <th>City</th>
                 <th>Phone</th>
             </tr>
             {books.map((student,index) => {
                    return (
            <tr key={index}  >
              <td>{student.id}</td>
              <td>{student.firstname}</td>
              <td>{student.lastname}</td>
              <td>{student.dob}</td>
              <td>{student.parentsName}</td>
              <td>{student.address}</td>
              <td>{student.city}</td>
              <td>{student.phone}</td>
            </tr>
                    )
         })}
         </table>
     </div>
      )}
      </div>
     
      </div>
      <div style={{flexDirection:1,margin:'20px'}}>
      <div className='list-header'>
          <h2>Toppers List</h2>
        </div>
        {
        toppers && (
          <div>
             <table>
                <tr>
                    <th>Name</th>
                </tr>
                {toppers.map((student,index) => {
                    return (
                        <tr key={index} className='list-content'>
                            <td>{student.student_fname}</td>
                            <td>{student.student_lname}</td>
                        </tr>
                    )
                })}
            </table>
    
          </div>
        )
      }
     
      </div>
    </div>
    <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Add Student Details</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Id"
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="text"
            fullWidth
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            variant="standard"
          />
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Basic date picker"  value={dob}  onChange={(e) => setDob(e)}/>
      </DemoContainer>
    </LocalizationProvider> */}
    <TextField
            autoFocus
            margin="dense"
            id="name"
            label="DOB fromat yyyy-mm-dd"
            type="text"
            fullWidth
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Parents Name"
            type="text"
            fullWidth
            value={parentsName}
            onChange={(e) => setParentsName(e.target.value)}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Address"
            type="text"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone Number"
            type="number"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Student</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default App;
