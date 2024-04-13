import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

export default function Uploader({setPoster,setFile}) {
    const [paths, setPaths] = useState([]); 
    
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    maxSize: 5000000,
    accept: {
        'image/jpg': ['.jpg'],
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg'],
      },
    onDrop: (acceptedFiles) => {
         console.log(acceptedFiles)
         const url = URL.createObjectURL(acceptedFiles[0]);
         setPoster(url)
         setFile(acceptedFiles[0])
    },
  });
  return (
    <div className="w-full text-center">
      <div
        {...getRootProps()}
        className="px-6 py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
      >
        <input {...getInputProps()}/>
        <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud/>
        </span>
        <p className="text-sm mt-2">Drag your image here</p>
        <em className="text-xs text-border">
        only .jpg and .png will be accepted
        </em>
      </div>
      {/* {console.log(paths)}*/}
      <img src={paths}></img> 
    </div>
  );
}
