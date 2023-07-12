import * as React from "react";
import { useRef, useState } from 'react';
import './App.css';
import 'react-loading-skeleton/dist/skeleton.css'
import laodingicon from './Bars-1s-200px.gif'

const App = () => {
  const [info, setInfo] = useState();
  const fsong = useRef();
  const [islaoding , setloading] = useState(false)
  const [filename , setfilename] = useState("")
  const fetchSongData = async () => {
    if(!filename){
      document.querySelector('.alert-danger').style.display= "block"
    }
    
    const url = 'https://shazam-api7.p.rapidapi.com/songs/recognize-song';
    const data = new FormData();
    data.append('audio', fsong.current.files[0]);

    const options = {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': 'You api key',
        'X-RapidAPI-Host': 'shazam-api7.p.rapidapi.com',
      },
      body: data,
    };

    try {
      const container =  document.querySelector(".container")
      container.remove()
      setloading(true)
      const response = await fetch(url, options);
      const result = await response.json();
      setInfo(result);
      console.log(result);
      setloading(false)
    } catch (error) {
      console.error(error);
  
    }
   
  };
 
  const active =() =>{
    document.querySelector("input").click()
  }

  return (
    <>
<div class="alert alert-danger" role="alert">
  Please Upload your song file
</div>
      <div class="container">
          <div class="wrapper">
            <div class="image">
      
            </div>
            <div class="content">
                <div class="icon">
                  <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <div class="text">
                  {!filename &&(
                    <>No file chosen yet!</>
                  )}
                  {filename.name}
                </div>
            </div>
            <div id="cancel-btn">
                <i class="fas fa-times"></i>
            </div>
            <div class="file-name">
                File name here
            </div>
        </div>
        <input id="default-btn" ref={fsong} onChange={(event) => setfilename(event.target.files[0])} type="file"hidden/>
        <button onClick={active} id="custom-btn">Choose a file</button>
        <button onClick={fetchSongData} className="send-btn">Send</button>
      </div>
      {islaoding &&(
        <>
        <img id="laodingicon"src={laodingicon}/>
        
        </>
      )}
      {info && !islaoding &&(
        <>
        <div className="song-cover" style={{backgroundImage:`url(${info.track.images.coverart})`}}>
          <div className="song-datails">
          <div className="song-img">
            <img src={info.track.images.coverart}/>
          </div>
          <div className="song-info">
            <p id="song">Song</p>
            <h1>{info.track.title}</h1>
            <h2>{info.track.subtitle}</h2>
            <p>Released {info.track.sections[0].metadata[2].text}</p>
          </div>
          </div>
        </div>
        <div className="artist-lyrics">
        <div className="lyrics">
      {info.track.sections[1].text.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
        </div>
        <div className="artist">
          <img src={info.track.images.background}/>
          <div className="art-about">
          <h1>{info.track.subtitle}</h1>
          <h2>{info.track.genres.primary}</h2>

          </div>
        </div>
        </div>

        <div className='song-player'>
          <div className='song-images'>
            <img src={info.track.images.coverart}/>
            <p>{info.track.title}</p>
          </div>
          <audio controls className="gap-example" >
          <source src={info.track.hub.actions[1].uri}/>
        </audio>
        </div>
        </>
        )}

    </>
  );
};

export default App;
