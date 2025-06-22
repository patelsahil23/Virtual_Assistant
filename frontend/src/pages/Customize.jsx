import React, { useContext, useRef, useState } from 'react'
import Card from '../components/Card'
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
import image4 from "../assets/image4.jpeg"
import image5 from "../assets/image5.jpg"
import image6 from "../assets/image6.jpg"
import image7 from "../assets/image7.jpg"
import { RiImageAddFill } from "react-icons/ri";
import { userDataContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardBackspace } from "react-icons/md";


function customize() {
    const{  serverUrl,userData,setUserData,backendImage, setBackendImage,frontendImage, setFrontendImage,selectedImage, setSelectedImage}=useContext(userDataContext)
    const navigate = useNavigate()
    const inputImage = useRef()

    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }
    return (

        <div className='w-full relative h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-[20px] '>
                       <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer'onClick={()=>navigate("/")} />
           
            <h1 className='text-white text-[30px] mb-[40px] text-center'>Select your <span className='text-blue-300'>Assistant image</span></h1>
            <div className='w-full max-w-[900px] flex justify-center items-center flex-wrap gap-[15px]'>
                <Card image={image1} />
                <Card image={image2} />
                <Card image={image3} />
                <Card image={image4} />
                <Card image={image5} />
                <Card image={image6} />
                <Card image={image7} />
                <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-2 border-[#0000ff58] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex justify-center items-center ${selectedImage=="input"?"border-4 border-white shadow-2xl shadow-blue-950":null}`} onClick={() => {inputImage.current.click()
                    setSelectedImage("input")
                }}>
                
                    {!frontendImage &&      <RiImageAddFill className='text-white w-[25px] h-[25px]' />}

                    {frontendImage && <img src={frontendImage} className='h-full object-cover '/>}
                </div>
                <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage} />
            </div>
            {selectedImage && <button className='min-w-[150px] h-[60px] text-black font-semibold bg-white rounded-full cursor-pointer text-[19px] mt-[30px]'onClick={()=>navigate("/customize2")}>Next</button>
            }

        </div>
    )
}

export default customize
