import React, { useEffect, useState, useRef } from 'react'
import {useFormik} from 'formik'
import {API_URL} from '../../../util/API_URL'
import {NavLink, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
const Destination = () => {

  let param = useParams();
  let file = useRef();
  
  let [newDesti, setNewDesti] = useState({
    title : "",
    category : "",
    detail : "",
    image : ""
  })

  useEffect(()=>{
    getDestinationById();
  },[])

  let getDestinationById = async ()=>
  {
    if(param.id){
      let response = await axios.get(`${API_URL}/destination/`+param.id);
      // console.log(response.data);
      setNewDesti(response.data);
    }
  }


  let navigate = useNavigate();
  let addForm = useFormik({
    enableReinitialize : true,
    initialValues : newDesti,
    onSubmit : async (formdata)=>{
      if(param.id)
      {
          await axios.put(`${API_URL}/destination/${param.id}`, formdata)
          navigate("/admin/destination/list");
      }
      else{
        let myform = new FormData();
        myform.append("title", formdata.title);
        myform.append("category", formdata.category);
        myform.append("detail", formdata.detail);
        myform.append("image", file.current.files[0]);
        await axios.post(`${API_URL}/destination`, myform)
        navigate("/admin/destination/list");
        
      }
    }
  })

  return (
    <div className="container my-4">
      {
        param.id ? '' : <NavLink to="/admin/destination/list" className="btn btn-info">View All Destination</NavLink>
      }
        <form onSubmit={addForm.handleSubmit}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h3 className='text-center'>{param.id ? 'Update' : 'Add New'} Destination to Visit</h3>
          <div className='my-3'>
            <label>Destination Title</label>
            <input type='text' value={addForm.values.title} name='title' onChange={addForm.handleChange} className='form-control' />
          </div>
          <div className='my-3'>
            <label>Destination Image</label>
            <input type='file' ref={file} value={addForm.values.image} name='image' onChange={addForm.handleChange} className='form-control' />
          </div>
          <div className='my-3'>
            <label>Destination Category</label>
            <select name='category' value={addForm.values.category} onChange={addForm.handleChange} className='form-control' >
              <option>Select</option>
              <option>Arunachal Pradesh</option>
              <option>Assam</option>
              <option>Manipur</option>
              <option>Meghalaya</option>
              <option>Mizoram</option>
              <option>Nagaland</option>
              <option>Tripura</option>
            </select>
                     
          </div>
          <div className='my-3'>
            <label>Destination Detail</label>
            <textarea name='detail' value={addForm.values.detail} onChange={addForm.handleChange} className='form-control' rows="10"></textarea>
          </div>
          <br />
          <button type='submit' className='btn btn-primary'>{param.id ? 'Update' : 'Add'}</button>
        </div>
      </div>
        </form>
    </div>
  )
}

export default Destination