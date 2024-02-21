import React, { useEffect, useState } from 'react'
import axios from "axios";  

const Table = () => {
    const[data,setData] = useState([])

    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[editId, setEditId] = useState('')

    const[updateName,setUpdateName] = useState('')
    const[updateEmail,setUpdateEmail] = useState('')


    useEffect(() => {
        axios.get('http://localhost:3000/data')
        .then(res => setData(res.data))
        .catch(error => console.log(error));
}, []);

const handleSubmit = (e) => {
    e.preventDefault()
    const id = data.length+1
    axios.post('http://localhost:3000/data',{id:id, name: name ,email:email})
        .then(res => {
            console.log(res)
            window.location.reload()
        })
        .catch(error => console.log(error));
}

const handleEdit = (id) => {
    axios.get('http://localhost:3000/data/' + id)
        .then(res => {
            setEditId(id);
            setUpdateName(res.data.name);
            setUpdateEmail(res.data.email);
        })
        .catch(error => console.log(error));
}

const handleDelete = (id) => {
    console.log(id)
    axios.delete('http://localhost:3000/data/'+ id)
    .then(res => {
        console.log(res)
        window.location.reload()
    })
    .catch(error => console.log(error));
}

const handleUpdate = (id) => {
    axios.put('http://localhost:3000/data/'+ id ,{id: id, name: updateName, email: updateEmail})
    .then(res => {
        console.log(res)
        window.location.reload()
    })
    .catch(error => console.log(error));
}

  return (
    
    <div className=' bg-red-200 h-screen w-full p-6'>
        <div>
            <h1 className=' text-3xl mb-6'>Form Table</h1>
        </div>
        <div>
            <form onSubmit={handleSubmit} className=' mb-4'>
                <input className=' border rounded py-2 px-3 mr-2'
                 type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input  className=' border rounded py-2 px-3 mr-2' 
                 type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button className=' bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700'>Add</button>

            </form>
        </div>
        <table className='w-full'>
            <thead>
                <tr>
                    <td className='border px-4 py-2 text-2xl'>ID</td>
                    <td className='border px-4 py-2 text-2xl'>Name</td>
                    <td className='border px-4 py-2 text-2xl'>Email</td>
                    <td className='border px-4 py-2 text-2xl'>Action</td>
                </tr>
            </thead>
            <tbody>
            {
                data.map((user, index) => (
                    <tr key={index}>
                    {
                    user.id === editId ? <>
                        <td className='border px-4 py-2 text-2xl'>{user.id}</td>
                        <td className='border px-4 py-2 text-2xl'>
                        <input className="border rounded py-2 px-3"
                        type='text' value={updateName} onChange={(e) => setUpdateName(e.target.value)}/>
                        </td>
                        <td className=' border px-4 py-2 text-2xl'>
                        <input className='border rounded py-2 px-3'
                         type='email' value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)}/></td>
                        <td className=' border px-4 py-2 '>
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={() => handleUpdate(user.id)}>Update</button></td>
                    </>:
                    <>
                        <td  className='border px-4 py-2 text-2xl'>{user.id}</td>
                        <td  className='border px-4 py-2 text-2xl'>{user.name}</td>
                        <td  className='border px-4 py-2 text-2xl'>{user.email}</td>
                        <td  className='border px-4 py-2 text-2xl'>
                            <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700 mr-2"
                             onClick={() => handleEdit(user.id)}>Edit</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                             onClick={() => handleDelete(user.id)}>Delete</button>
                        </td>
                    </>}

                    </tr>      
                ))
                }
            </tbody>
        </table>

    </div>
  )
}

export default Table