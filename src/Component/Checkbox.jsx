import React, { useEffect, useState } from 'react'

const userData = [{name:"Yogesh"},{name:"Kapil"},{name:"Sonu"},{name:"Pawan"},{name:"Manish"},{name:"Sourav"}]
const Checkbox = () => {

    const[user,setUser] = useState([]);
    console.log(user)

    useEffect(() => {
        setUser(userData)
    },[])

    const handleChange = (e) => {
        const{name, checked} = e.target;
        if(name === "AllCheck"){
            let tempUser = user.map(user => {return{...user,isChecked:checked}})
            setUser(tempUser)
        }else{

            let tempUser = user.map((user) => user.name === name ? {...user, isChecked: checked}: user);
            setUser(tempUser);
        }

    };

  return (
    <div className=' my-4' >
        <form className=''>
            <h3>User Data</h3>

            <div className=' form-check'>
                <input type='checkbox' className=' form-check-input'
                checked={user.filter(user => user?.isChecked !== true).length < 1} 
                name='AllCheck' onChange={handleChange}/>
                <label className='ms-2'>All Select</label>
            </div>  

            {
                user.map(user => (
                    <div className=' form-check'>
                    <input type='checkbox' className=' form-check-input' checked={user?.isChecked || false} name={user.name} onChange={handleChange}/>
                    <label className='ms-2'>{user.name}</label>
                </div>
                ))
            }





        </form>
    </div>
  )
}

export default Checkbox