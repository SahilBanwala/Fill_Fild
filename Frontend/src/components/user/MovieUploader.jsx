import React, { useState } from "react";
import { uploadMovie, uploadTrailer } from "../../api/movie";
import { useAuth, useNotification } from "../../hooks";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { FileUploader } from "react-drag-drop-files";
import { MdFileDownloadDone } from "react-icons/md"

export default function MovieUploader({ setPoster, setFile,setVideoInfo,admin }) {
  const [paths, setPaths] = useState([]);

  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { updateNotification } = useNotification();
  const {authInfo} = useAuth() 


  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const handleUploadTrailer = async (data) => {
    if(!admin){
      return  updateNotification("error",
      "You are Not An Admin Please Login From Admin Account to Perform Admin Operation"
    );
    }
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );
    if (error) return updateNotification("error", error);

    setVideoUploaded(true);
    updateNotification("success","Trailer Uploaded Successfully")
    setVideoInfo({ url, public_id });
  };

  const handleChange = (file) => {
    if(!admin){
      return  updateNotification("error",
      "You are Not An Admin Please Login From Admin Account to Perform Admin Operation"
    );
    }
    const formData = new FormData();
    formData.append("video", file);
    setVideoSelected(true);
    handleUploadTrailer(formData);
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }

    return `Upload progress ${uploadProgress}%`;
  };

  return (
    <TrailerSelector
      onTypeError={handleTypeError}
      handleChange={handleChange}
      videoUploaded={videoUploaded}
      videoSelected={videoSelected}
      getUploadProgressValue={getUploadProgressValue}
      uploadProgress={uploadProgress}
    />
  );
}

const TrailerSelector = ({
  visible,
  handleChange,
  onTypeError,
  videoUploaded,
  videoSelected,
  getUploadProgressValue,
  uploadProgress,
}) => {
  return (
    <FileUploader
      handleChange={handleChange}
      onTypeError={onTypeError}
      types={["mp4", "avi"]}
    >
      <div className="w-full text-center">
        <div className="px-6 py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer">
          <UploadProgress
            visible={!videoUploaded && videoSelected}
            message={getUploadProgressValue()}
            width={uploadProgress}
          />
          {!videoSelected && (
            <>
              {" "}
              <span className="mx-auto flex-colo text-subMain text-3xl">
                <FiUploadCloud />
              </span>
              <p className="text-sm mt-2">Drag your video here</p>
              <em className="text-xs text-border">
                only .mp4 will be accepted
              </em>
            </>
          )}
          {videoUploaded && (
            <>
              <span className="mx-auto flex-colo text-subMain text-3xl">
                <MdFileDownloadDone/>
              </span>
              <p className="text-sm mt-2">Trailer is Uploaded</p>
              <em className="text-xs text-border">
                Fill other details to continue
              </em>
            </>
          )}
        </div>
      </div>
    </FileUploader>
  );
};

const UploadProgress = ({ width, message, visible }) => {
  if (!visible) return null;

  return (
    <div className=" drop-shadow-lg rounded p-3">
      <div className="relative h-3 text-white overflow-hidden">
        <div
          style={{ width: width + "%" }}
          className="h-full absolute left-0 bg-[#e2e8f0]"
        />
      </div>
      <p className="font-semibold text-white animate-pulse mt-1">{message}</p>
    </div>
  );
};
