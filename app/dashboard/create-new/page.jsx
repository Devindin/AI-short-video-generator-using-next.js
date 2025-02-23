"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import CustomLoading from './_components/CustomLoading'

function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }))
  }

  // Moved outside of onHandleInputChange
  const GetVideoScript = async() => {
    setLoading(true)
    const prompt = `Write a script to generate ${formData.duration} seconds video on topic: ${formData.topic} along with AI image prompt in ${formData.imageStyle} format for each scence and give me result in JSON format with imagePrompt and ContentText as field`
    console.log(prompt)
    const result = await axios.post('/api/get-video-script', {
    prompt: prompt
    }).then(resp => {
      console.log(resp.data.result);
      setVideoScript(resp.data.result);
    })
    setLoading(false);
  }

  // Moved outside of onHandleInputChange
  const onCreateClickHandler = () => {
    GetVideoScript()
  }

  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'>create new</h2>
      <div className='mt-10 shadow-md p-10'>
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />
        <Button className='mt-10 w-full' onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading}/>
    </div>
  )
}

export default CreateNew