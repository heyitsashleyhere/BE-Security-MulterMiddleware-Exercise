import { useState } from "react"
import axios from 'axios'
import "./App.css";


function App() {
  const [tags, setTags] = useState("")
  const [file, setFile] = useState(null)
  const [recentFive, setRecentFive] = useState([])

  function handleFileSelect(e) {
    console.log('e.target.files :>> ', e.target.files);
    setFile(e.target.files[0])
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    const formData = new FormData() //FormData is a WEB API and here we are making an instance of it
    formData.append( "file", file )
    formData.append( "tags", tags)

    axios({
      method: 'post',
      url: 'http://localhost:3099/api/uploadImage',
      data: formData
    }).then(console.log).catch(console.log)

    setTags("")
  }

  function handleGetRecent() {
    axios({
      method: 'get',
      url: 'http://localhost:3099/api/recentUploads',
      // responseType: 'stream'
    }).then( response => {
      console.log('response', response)
      setRecentFive(response.data)
    })
      .catch(error => console.log('error', error))
  }

  return (
    <div className="App">
      <h1>Upload an image</h1>

      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Image Tag" 
              value={tags}
              onChange={(e) => {setTags(e.target.value)}} />
        <input type="file" onChange={handleFileSelect}/>
        <button type="submit">Upload</button>
      </form>

      <section>
        <h3>Get recent uploads <button onClick={handleGetRecent}>Get</button></h3>
        {
          recentFive && (
            recentFive.map(f => {
              return (
                <div key={f.filename}>
                  <img src={`http://localhost:3099/api/${f._id}`} width={100} alt={f.path} />
                  <p>{f.createdAt}</p>
                </div>
              )
            })
          )
        }

      </section>
    </div>
  );
}

export default App;
