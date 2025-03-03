"use client"
import React, { useState } from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle'
import SelectDuration from './_components/SelectDuration'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import CustomLoading from './_components/CustomLoading'
import { v4 as uuidv4 } from 'uuid';

const scriptData ='Time is a river, and history its current... flowing with tales of power, ambition, and fate. But sometimes, history takes a different path. This is the story'
const FILEURL= 'https://firebasestorage.googleapis.com/v0/b/ai-video-generator-59d34.firebasestorage.app/o/ai-short-video-generator%2F49b94198-cf83-442e-9d50-06cf3e851632.mp3?alt=media&token=09858252-9895-4584-b4c1-7a541ec2aadc'
function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions , setCaptions] = useState();
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
      setVideoScript(resp.data.result);
      GenerateAudioFile(resp.data.result);
    })
    setLoading(false);
  }

  // Moved outside of onHandleInputChange
  const onCreateClickHandler = () => {
    //GetVideoScript()
    //GenerateAudioFile(scriptData);
    GenerateAudioCaption(FILEURL);
  }

  const GenerateAudioFile=async(videoScriptData)=>{
  setLoading(true);
   let script='';
   const id =uuidv4();
   //videoScriptData.forEach(item=>{
   // script = script+item.ContentText+' ';
   //})

   await axios.post('/api/generate-audio', {
     text:videoScriptData,
     id:id
   }).then(resp=>{
     setAudioFileUrl(resp.data.result);
     
   })

   setLoading(false);

  }

  const GenerateAudioCaption=async(fileUrl)=>{
    setLoading(true);
    await axios.post('/api/generate-caption', {
      audioFileUrl:fileUrl
    }).then(resp=>{
      console.log(resp.data.result);
      setCaptions(resp?.data?.result);
    })
    setLoading(false);
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