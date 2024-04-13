import React, { useState } from "react";
import { createActor } from "../../api/actor";
import { useNotification } from "../../hooks";
import AddActor from "./AddActor";
import SideBar from "../Admin/SideBar";
import { BsFillPlusSquareFill, BsPlusSquare } from "react-icons/bs";
import { HiPlusCircle } from "react-icons/hi";

export default function ActorUpload({ visible, onClose }) {
  const { updateNotification } = useNotification(); 
  const [busy, setBusy] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handle = async (data) => {
    setBusy(true)
    const { error, actor } = await createActor(data);
    setBusy(false)
    if (error) return updateNotification("error", error);

    updateNotification("success", "Actor created successfully.");
    onClose();
  };

  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <SideBar> 
      <button
              className="bg-subMain w-full flex-rows gap-6 my-6 font-medium trasnsitions hover:bg-dry border border-subMain text-white py-4  rounded "
              onClick={()=>setShowUpdateModal(true)}
            >
              <HiPlusCircle/> 
              ADD MOVIE
            </button>
      <AddActor
        onSubmit={handle}
        title="Create New Actor"
        btnTitle="Create"
        busy={busy}
        modalOpen={showUpdateModal}
        setModalOpen={hideUpdateModal}
      />
      </SideBar>
  );
}
