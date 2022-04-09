import { Button, TextInput, Theme } from "@carbon/react";
import { useState } from "react";
import { useDatabaseTransaction, useDatabaseUpdateMutation } from "@react-query-firebase/database";
import { ref } from "firebase/database";
import { database } from "../config";
import update from "immutability-helper";

const exampleTask = {
  title: "Example task",
  description: "This is your first task!",
  date: new Date().toISOString(),
  done: false,
};

const CreateList = ({ user, newList }) => {
  const [name, setName] = useState("");

  const dbRef = ref(database, `${user.uid}`);
  const mutation = useDatabaseUpdateMutation(dbRef);

  const mutationCreateList = useDatabaseTransaction(dbRef, (listValue) => {
    return update(listValue, {
      lists: {
        $push: [
          {
            name,
            list: [exampleTask],
          },
        ],
      },
    });
  });

  const createFirstList = (e) => {
    e.preventDefault();
    mutation.mutate({
      lists: [
        {
          name,
          list: [exampleTask],
        },
      ],
    });
  };

  const createNewList = (e) => {
    e.preventDefault();
    mutationCreateList.mutate();
  };

  return (
    <Theme theme="g10">
      <form onSubmit={newList ? createNewList : createFirstList}>
        <TextInput
          onChange={(e) => setName(e.target.value)}
          value={name}
          id="list-name"
          labelText="List name"
          required
          type="text"
          style={{ maxWidth: 300 }}
        />
        <Button type="submit" style={{ marginTop: 24 }}>
          Create new list
        </Button>
      </form>
    </Theme>
  );
};

export default CreateList;
