"use client"

import axios from "axios";
import { ChangeEvent, useState } from "react"

  export default function VideoUpload() {

    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if(!file) {
          console.log("No file selected");
          return;
        }
        console.log(file);
        try {
          const formData = new FormData();
          formData.append("video", file);
          const response = await axios.post(
            'http://localhost:3000/api/v1/videos/upload',
            formData, 
            {
              headers : {
                'Content-Type': 'multipart/form-data'
              }
            }
          );
          console.log(response.data);
        } catch (error) {
           console.log("Something went wrong", error);
        }
    }

      return (
          <div
            className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8 px-4"
          >
            <div
              className="max-w-md w-full bg-white shadow-lg rounded-lg p-6"
            >
              <h1>
                Upload your video here
              </h1>

              <input 
                  type="file"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-700 rounded-lg border border-gray-300 p-2 mt-2 cursor-pointer bg-gray-500 mb-4"
              />
            </div>
          </div>
      )
  }