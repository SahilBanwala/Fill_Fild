import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadMovie, uploadTrailer } from "../../api/movie";
import { useNotification } from "../../hooks";
import ModalContainer from "../models/ModalContainer";
import MovieForm from "./MovieForm";
import { FiUploadCloud } from "react-icons/fi";

export default function MovieUpload({ visible, onClose }) {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState({});
  const { updateNotification } = useNotification();

  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const handleUploadTrailer = async (data) => {
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );
    if (error) return updateNotification("error", error);

    setVideoUploaded(true);
    setVideoInfo({ url, public_id });
  };

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);

    setVideoSelected(true);
    handleUploadTrailer(formData);
  };

  const handleSubmit = async(data) => {
    if(!videoInfo.url || !videoInfo.public_id) return updateNotification("error","Trailer is missing")
    data.append('trailer',JSON.stringify(videoInfo))

    const res = await uploadMovie(data);
    console.log(res)
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }

    return `Upload progress ${uploadProgress}%`;
  };

  return (

    <ModalContainer visible={visible}>
      <UploadProgress
        visible={!videoUploaded && videoSelected}
        message={getUploadProgressValue()}
        width={uploadProgress}
      />
      {!videoSelected?(
      <TrailerSelector
        visible={!videoSelected}
        onTypeError={handleTypeError}
        handleChange={handleChange}
      />
      ):(
      <MovieForm onSubmit={handleSubmit} />
      )}
    </ModalContainer>
  );
}

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
       <div className="w-full text-center">
      <div
        
        className="px-6 py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
      >
       
        <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud/>
        </span>
        <p className="text-sm mt-2">Drag your image here</p>
        <em className="text-xs text-border">
        only .jpg and .png will be accepted
        </em>
      </div>
      {/* {console.log(paths)}*/}
      
    </div>
      </FileUploader>
  
  );
};

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;

  return (
    <div className="dark:bg-secondary bg-gray-900 drop-shadow-lg rounded p-3">
      <div className="relative h-3 text-white overflow-hidden">
        <div
          style={{ width: width + "%" }}
          className="h-full absolute left-0 bg-[#e2e8f0]"
        />
      </div>
      <p className="font-semibold text-white animate-pulse mt-1">
        {message}
      </p>
    </div>
  );
};
