import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Form, Modal, message} from "antd";
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';


function AdminExperience() {
    const dispatch=useDispatch();
    const {portfolioData}= useSelector((state)=>state.root);
    const {experiences} = portfolioData; 
    const [showAddEditModal, setShowAddEditModal ] = React.useState(false);
    const [selectedItemForEdit , setselectedItemForEdit]= React.useState(null);
    const onFinish=async(values)=>{

      try{
        dispatch(ShowLoading())
        const response= await axios.post("/api/portfolio/add-experience",
      values);
  
          dispatch(HideLoading())
          if(response.data.success){
            message.success(response.data.message);
            setShowAddEditModal(false);
            dispatch(HideLoading());
            dispatch(ReloadData(true));
          }
          else {
            message.error(response.data.message)
          }
  
      } catch(error){
        dispatch(HideLoading());
          message.error(error.message)
      }
    }  
  

  return (
    <div>
      <div className="flex justify-end">
        <button className="bg-primary px-5 py-2 text-white" 
        onClick={()=>{
          setselectedItemForEdit(null);
          setShowAddEditModal(true);
        }}
        >Add Experience</button>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {experiences.map((experience)=>(
            <div className="shadow border border-gray-400 p-5 font-semibold flex flex-col">
                <h1 className="text-primary text-xl font-extrabold">{experience.period}</h1>
                <h1>Company : {experience.company}</h1>
                <h1>Role : {experience.title}</h1>
                <h1>{experience.description}</h1>
                <div className="flex justify-end gap-5 mt-5">
                <button className="bg-red-500 text-white px-5 py-2 ">Delete</button>
                <button className="bg-primary text-white px-5 py-2 ">Edit</button>

                </div>

            </div>
        ))}
      </div>

      <Modal visible={showAddEditModal}
      title= {selectedItemForEdit ? "Edit Experience" : "Add Experience"}
      footer={null}
      onCancel={()=>setShowAddEditModal(false)}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name='period' label='Period'>
            <input placeholder="Period" />
          </Form.Item>
          <Form.Item name='company' label='Company'>
            <input placeholder="Company" />
          </Form.Item>
          <Form.Item name='title' label='Title'>
            <input placeholder="Title" />
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <input placeholder="Description" />
          </Form.Item>
          <div className="flex justify-end">
            <button className="border-primary text-primary px-5 py-2" onClick={()=>{
              setShowAddEditModal(false);
            }}>Cancel</button>
            <button className="bg-primary text-white px-5 py-2">
              {selectedItemForEdit ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default AdminExperience
