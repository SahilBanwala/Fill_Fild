import React, { useEffect, useState } from "react";
import MainModel from "../Admin/MainModel";
import { Input, Message, Select } from "../MovieMain/UserInput";
import Uploader from "../user/Uploader";
import { useNotification } from "../../hooks";
import { ClipLoader } from "react-spinners";
import { HiPlusCircle } from "react-icons/hi";

export default function AddActor({ modalOpen, setModalOpen, cast,initialState,onSubmit,busy }) {

  const defaultActorInfo = {
    name: "",
    about: "",
    avatar: null,
    gender: "",
  };
  const [paths, setPaths] = useState(false);
  const [file, setFile] = useState([]);
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });

  const validateActor = ({ avatar, name, about, gender }) => {
    console.log("dsdsd",avatar)
    if (!name.trim()) return { error: "Actor name is missing!" };
    if (!about.trim()) return { error: "About section is empty!" };
    if (!gender.trim()) return { error: "Actor gender is missing!" };
    if (avatar && !avatar.type?.startsWith("image"))
      return { error: "Invalid image / avatar file!" };

    return { error: null };
  };

  const handleChange = ({ target }) => {
    console.log(actorInfo)
    const { value, files, name } = target;
    setActorInfo({ ...actorInfo, [name]: value });
  };
  const {updateNotification} = useNotification()

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateActor(actorInfo);
    if (error) return updateNotification("error", error);

    // submit form
    const formData = new FormData();
    for (let key in actorInfo) {
      if (key) formData.append(key, actorInfo[key]);
    }
    onSubmit(formData);
  };


  useEffect(() => {
    if (initialState) {
      setActorInfo({ ...initialState , avatar: null });
      setPaths(initialState.avatar)
      console.log(initialState)
    }
  }, [initialState]);

  useEffect(() => {
    actorInfo.avatar = file;
  }, [paths, file]);

  const { name, about, gender} = actorInfo;

  return (
    <MainModel modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">
          {initialState ? "Update Cast" : "Create Cast"}
        </h2>
        <form className="flex flex-col gap-6 text-left mt-6">
          <Input
            label="Name"
            placeholder="Enter Cast Name"
            bg={false}
            name="name"
            value={name}
            onChange={handleChange}
          />
          <Message
            label="Description"
            name="about"
            value={about}
            onChange={handleChange}
            placeholder="Enter Cast Description"
          />
          <div className="w-full grid md:grid-col-2 gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">Cast Image</p>
              <Uploader setPoster={setPaths} setFile={setFile} />
            </div>
          </div>
          {paths ? (
            <div className="flex flex-col gap-2">
              <p className="text-border font-semibold text-sm">
                Preview Cast Image
              </p>
              <img
                className="w-full h-full object-cover rounded-none"
                src={paths}
              ></img>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-2">
            <div className="text-sm w-full">
              <Select
                label="Gender"
                value={gender}
                onChange={handleChange}
                name="gender"
                options={[
                  { title: "Select Gender" },
                  { title: "Male" },
                  { title: "Female" },

                  { title: "Other" },
                ]}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full flex-rows gap-4 py-3 transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white "
          >
            { busy?<ClipLoader color="#36d7b7" />: initialState ?  " Update Cast" : "Add Cast"} 
          </button>
        </form>
      </div>
    </MainModel>
  );
}
