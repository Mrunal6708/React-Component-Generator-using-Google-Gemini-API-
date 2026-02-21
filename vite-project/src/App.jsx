import { useCallback, useState } from 'react'
import './App.css'
import { generateContent, purifyCode } from './helper/index';
import React from 'react';

console.log(import.meta.env.VITE_GOOGLE_API_KEY) // "123"

const  App = () => {
  const [info, setInfo] = useState({
    userQuery:"",
    error:"",
    generatedComponent:null,
    loading:false,
    
  });

  const handleChange = useCallback((e) => {
    setInfo((prev) => ({...prev, userQuery:e.target.value, error:""}))
  }, []);
  
  const handleGenerate = useCallback(async () => {
    if(info?.loading) return;
    if(!info?.userQuery?.length){
       return setInfo((prev) => 
      ({...prev, error:"Please Enter a valid Query"})
      )};

    setInfo((prev) => ({...prev, loading:true, error:"", generatedComponent:null}));

    try{
      const response = await generateContent(info?.userQuery)
  
   let componentCode = response?.candidates?.[0]?.content?.parts?.[0]?.text;
     componentCode = purifyCode(componentCode);

   let Component = new Function(
    "React",
    `
    try{
    ${componentCode};
    return GeneratedComponent;
    }catch(error){
    throw(error)
    }
    `
   )(React);

   setInfo((prev) => ({
    ...prev,
    generatedComponent:<Component />,
    error:"",
    userQuery:"",
   }))
    }
    catch(error){
      console.log("error :", error);
      setInfo((prev) => ({
        ...prev,
        error:error?.message || "Something went Wrong, please try again",
      }) )

    }
    finally{
      setInfo((prev) => ({...prev, loading:false}))
    }

  },[info?.userQuery, info?.loading])
  
  console.log(info)

  return (
    <>
    <div className="codeGeneratorParentContainer">
      <div className="inputSectionContainer">
        <textarea className="textAreaInput" 
        placeholder="Describe Your React Component..."
        value={info?.userQuery}
        onChange={handleChange} />
        <button className="generateButton"
        onClick={handleGenerate}
        >Generate Component</button>
      </div>
      <div className="previewSectionContainer">
        {info?.error && <div className="error-message">
          {info?.error}
        </div>}
        {
        info?.generatedComponent ? 
        ( 
          info?.generatedComponent
        ) : 
        (<div className="emptyMessage">
           {info?.loading ? (
             <div className="loading-container">
            <div className="loading-spinner">
            </div>
          <span>Generating Component...</span>
          </div>) : ( 
          <p>Describe your component in the input field and click Generate.</p>
          )}

         
        </div>)
        } 
      </div>

    </div>
    </>
  )
}

export default App;