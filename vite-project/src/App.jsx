import './App.css'

//  console.log(import.meta.env.VITE_GOOGLE_API_KEY)  

const App=()=> {
  return (
    <div className='codeGeneratorParentContainer'>
      <div className='inputSectionContainer'>
        <textarea className='textAreaInput' placeholder='Describe your react component...!'/>
        <button className='generateButton'>Generate</button>
      </div>
      <div className='PreviewSectionContainer'>
        <div className='emptMessage'>
          <p>Describe your component in the input field and click "Generate" to see the preview here.</p>
        </div>
      </div>
    </div>
  )
}

export default App
