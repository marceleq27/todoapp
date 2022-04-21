import { useState } from 'react';
import CreateList from './components/CreateList';
import { ref } from 'firebase/database';
import { useDatabaseSnapshot, useDatabaseTransaction } from '@react-query-firebase/database';
import { database } from './config';
import Loader from './components/Loader';
import Task from './components/Task';
import { Tab, TabList, TabPanel, TabPanels, Tabs, Theme, Button } from '@carbon/react';
import AddTask from './components/AddTask';
import update from 'immutability-helper';

const List = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHiddenValues, setShowHiddenValues] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const dbRef = ref(database, user.uid);

  const mutationDeleteList = useDatabaseTransaction(dbRef, (listValue) => {
    return update(listValue, {
      lists: {
        $splice: [[activeTab, 1]],
      },
    });
  });

  const deleteList = () => {
    mutationDeleteList.mutate();
    setActiveTab(0);
  };

  const list = useDatabaseSnapshot(['lists'], dbRef, {
    subscribe: true,
  });

  if (list.isLoading) {
    return <Loader />;
  }
  let allLists = [];
  list?.data.forEach((childSnapshot) => allLists.push(...childSnapshot.val()));
  return allLists.length === 0 ? (
    <CreateList user={user} />
  ) : (
    <>
      <Theme theme="g90">
        <Tabs selectedIndex={activeTab} onChange={(e) => setActiveTab(e.selectedIndex)}>
          <TabList aria-label="Lists" contained>
            {allLists.map((list) => (
              <Tab key={list.name}>{list.name}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {allLists.map((el) => (
              <TabPanel key={el.list}>
                <div
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 320px)', gridGap: 16 }}
                >
                  {el?.list &&
                    el?.list.length > 0 &&
                    el?.list.map((item) =>
                      showHiddenValues ? (
                        <Task key={item.date} user={user} activeTab={activeTab} {...item} />
                      ) : (
                        !item?.done && (
                          <Task key={item.date} user={user} activeTab={activeTab} {...item} />
                        )
                      ),
                    )}
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
          <Button onClick={() => setIsModalOpen(true)} style={{ marginRight: 8 }}>
            Create task
          </Button>
          <Button
            kind="danger"
            onClick={deleteList}
            style={{ marginRight: 8 }}
            disabled={allLists.length <= 1}
          >
            Delete list
          </Button>
          <label htmlFor="hidden_values" style={{ marginLeft: 16, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showHiddenValues}
              onChange={(e) => setShowHiddenValues(e.target.checked)}
              name="hidden_values"
              id="hidden_values"
              style={{ marginRight: 8, cursor: 'pointer' }}
            />
            Show hidden tasks?
          </label>
        </div>
      </Theme>
      <CreateList user={user} newList activeTab={activeTab} />
      <AddTask
        activeTab={activeTab}
        user={user}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default List;
