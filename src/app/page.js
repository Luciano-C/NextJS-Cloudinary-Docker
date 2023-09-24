"use client"

import { useState } from "react";

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageurl] = useState(null);


  return (
    <div>
      <form onSubmit={async (e) => {
        e.preventDefault();
        
        
        // Para enviar el archivo
        const formData = new FormData()
        formData.append('image', file)
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        console.log(data);
        setImageurl(data.url);
      }}>
        <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
        <button>
          Enviar
        </button>
      </form>
      {
        imageUrl && (
          <img src={imageUrl} alt="..."/>
        )
      }
    </div>
  )
}

export default HomePage