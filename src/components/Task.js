import { Button, Tile } from "@carbon/react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import styled from "styled-components";
import { useDatabaseTransaction } from "@react-query-firebase/database";
import { ref } from "firebase/database";
import { database } from "../config";
import update from "immutability-helper";
import { Close } from "@carbon/react/icons";

const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: #ddd;
  & label {
    display: flex;
    align-items: center;
    line-height: normal;
    font-size: 13px;
    cursor: pointer;
    & input {
      margin-left: 8px;
      margin-top: 0;
      margin-bottom: 0;
      cursor: pointer;
    }
  }
`;

const StyledTile = styled(Tile)`
  color: #fff;
  max-width: 320px;
  position: relative;
  & span {
    position: absolute;
    right: 12px;
    top: 12px;
  }
  & p {
    font-size: 13px;
  }
`;

const Task = ({ date, description, done, title, activeTab, user }) => {
  const dbRefCreateTask = ref(database, user.uid);
  const mutationHide = useDatabaseTransaction(dbRefCreateTask, (listValue) => {
    return update(listValue, {
      lists: {
        [activeTab]: {
          list: {
            [listValue.lists[activeTab].list.findIndex((item) => item.date === date)]: { done: { $set: !done } },
          },
        },
      },
    });
  });

  const mutationDelete = useDatabaseTransaction(dbRefCreateTask, (listValue) => {
    return update(listValue, {
      lists: {
        [activeTab]: {
          list: {
            $splice: [[listValue.lists[activeTab].list.findIndex((item) => item.date === date), 1]],
          },
        },
      },
    });
  });

  const hideTask = () => {
    mutationHide.mutate();
  };

  const deleteTask = () => {
    mutationDelete.mutate();
  };

  return (
    <StyledTile>
      <Button
        kind="secondary"
        renderIcon={Close}
        onClick={deleteTask}
        hasIconOnly
        size="sm"
        iconDescription="Delete value"
      />
      {title}
      <p style={{ marginTop: 24 }}>{description}</p>
      <br />
      <br />
      <BottomContainer>
        <p>Created: {format(parseISO(date), "HH:mm, dd MMMM yyyy")}</p>
        <label htmlFor={`is_done_${date}`}>
          Is done?{" "}
          <input type="checkbox" onChange={hideTask} checked={done} name={`is_done_${date}`} id={`is_done_${date}`} />
        </label>
      </BottomContainer>
    </StyledTile>
  );
};

export default Task;
