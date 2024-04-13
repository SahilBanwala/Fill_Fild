import React, { useState } from "react";
import { updateActor } from "../../api/actor";
import { useNotification } from "../../hooks";
import ActorForm from "../form/ActorForm";
import ModalContainer from "./ModalContainer";
import AddActor from "./AddActor";

export default function UpdateActor({
  initialState,
  onSuccess,
  modalOpen,
  setModalOpen
}) {
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, actor } = await updateActor(initialState.id, data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    console.log(actor)
    onSuccess(actor);
    updateNotification("success", "Actor updated successfully.");
    setModalOpen();
  };
  return (
      <AddActor
        onSubmit={!busy ? handleSubmit : null}
        title="Update Actor"
        btnTitle="Update"
        busy={busy}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        initialState={initialState}
      />
  );
}
