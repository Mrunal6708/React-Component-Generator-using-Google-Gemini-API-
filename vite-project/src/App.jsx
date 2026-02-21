import React, { useCallback, useState } from 'react'
import './App.css'
import { generateContent } from './helper';

//  console.log(import.meta.env.VITE_GOOGLE_API_KEY)  

const App=()=> {
  const [info,setInfo]=useState({
    userQuery:"",
    error:"",
    generatedComponent:null,
    loading:false,
    
  });

  const handaleChange= useCallback((e) => {
    setInfo((prev)=>({...prev,userQuery:e.target.value, error:""}));
  },[]);

  const handleGenerate= useCallback(()=>{
    if(!info.userQuery?.length){
      return setInfo((prev)=>({...prev,error:"please enter a valid query..!"}));
    }
    setInfo((prev)=>({...prev,loading:true,error:""}));
    //api call to generate the component
    generateContent();
  },
  [info?.userQuery]);


  return (
    <div className='codeGeneratorParentContainer'>
      <div className='inputSectionContainer'>
        <textarea 
        className='textAreaInput'
         placeholder='Describe your react component...!'
         value={info.userQuery}
         onChange={handaleChange}
         />
        <button className='generateButton' onClick={handleGenerate}>Generate</button>
      </div>
      <div className='PreviewSectionContainer'>
       { info?.error &&<div className='error-message'>{info?.error}</div>}
        {info?.generatedComponent? (
          info?.generatedComponent
        ) : (
        <div className='emptMessage'>
           {info?.loading ?(
             <div className='loading-container'>
            <div className='loading-spinner'></div>
            <span>Generating Component</span>
          </div>
           ):(
          <p>
            Describe your component in the input field and click "Generate" to see the preview here.
          </p>
        )}
         </div>
        )}
      </div>
    </div>
  )
}

export default App
