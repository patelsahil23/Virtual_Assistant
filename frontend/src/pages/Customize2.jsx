import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userDataContext } from '../context/userContext'
import { MdKeyboardBackspace } from "react-icons/md";




function Customize2() {
    
    const{userData,backendImage,selectedImage,serverUrl,setUserData}=useContext(userDataContext)
        const navigate = useNavigate()
    
    const [assistantName,setAssistantName]=useState(userData?.assistantName || "")
    const [loading,setLoading]=useState(false)

    const handleUpdateAssistant=async ()=>{
        setLoading(true)
        try {

            let formData=new FormData()
            formData.append("assistantName",assistantName)
            if(backendImage){
                formData.append("assistantImage",backendImage)
            }else{
                formData.append("imageUrl",selectedImage)
            }
           
          
            const result = await axios.post(`${serverUrl}/api/user/update`,formData,{withCredentials:true})
           setLoading(false)
            console.log(result.data)
            setUserData(result.data)
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoading(false)

            if (!navigator.onLine) {
                console.error("You are offline. Please check your internet connection.");
            } else {
                console.error("Something went wrong:", error);
            }
        }
    }
    return (
        <div>
            <div className='w-full relative h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] '>
            <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer'onClick={()=>navigate("/customize")} />

            <h1 className='text-white text-[30px] mb-[40px] text-center'>Enter your <span className='text-blue-300'>Assistant Name</span></h1>
            <input type="text" placeholder='eg. Jarvis' className='px-[20px] py-[20px] rounded-full text-[18px] w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300' required onChange={(e)=>setAssistantName(e.target.value)}value={assistantName} />
            {assistantName && <button className='min-w-[300px] h-[60px] text-black font-semibold bg-white rounded-full cursor-pointer text-[19px] mt-[30px]'disabled={loading} onClick={()=>{ handleUpdateAssistant()
            }}>{!loading?"Finally Creat Your Assistant":"loading..."}</button>
        }
            </div>
        </div>
    )
}

export default Customize2
