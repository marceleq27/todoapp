import { Modal, TextInput } from "@carbon/react";
import { useState } from "react";
import update from "immutability-helper";
import { useDatabaseTransaction } from "@react-query-firebase/database";
import { ref } from "firebase/database";
import { database } from "../config";

const AddTask = ({ isModalOpen, setIsModalOpen, user, activeTab }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dbRefCreateTask = ref(database, user.uid);
  const mutation = useDatabaseTransaction(dbRefCreateTask, (listValue) => {
    if (!listValue.lists[activeTab]?.list || listValue.lists[activeTab].list.length === 0) {
      return update(listValue, {
        lists: {
          [activeTab]: {
            list: {
              $set: [
                {
                  title,
                  description,
                  date: new Date().toISOString(),
                  done: false,
                },
              ],
            },
          },
        },
      });
    }
    return update(listValue, {
      lists: {
        [activeTab]: { list: { $push: [{ title, description, date: new Date().toISOString(), done: false }] } },
      },
    });
  });

  const addTask = () => {
    mutation.mutate();
    setDescription("");
    setTitle("");
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      modalHeading="Add task"
      modalLabel="Tasks"
      primaryButtonText="Add"
      secondaryButtonText="Cancel"
      onSecondarySubmit={() => setIsModalOpen(false)}
      onRequestSubmit={addTask}
      onRequestClose={() => setIsModalOpen(false)}
      primaryButtonDisabled={title === "" || description === ""}
    >
      <p style={{ marginBottom: "1rem" }}>Add task to your list</p>
      <TextInput
        data-modal-primary-focus
        id="text-input-1"
        labelText="Task title"
        placeholder="e.g. Do the shopping"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <TextInput
        id="text-input-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        labelText="Task description"
        placeholder="e.g. Buy an apples"
        style={{ marginBottom: "1rem" }}
      />
    </Modal>
  );
};

export default AddTask;
