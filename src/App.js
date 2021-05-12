import React from "react";
import "./App.css";
import { Card } from "antd";
import { Todo } from "./features/todo/Todo";
import { CardFooter } from "./components/CardFooter/CardFooter";
import { useDispatch, useSelector } from "react-redux";
import { selectTab, setTab } from "./features/todo/todoSlice";

const tabList = [
  {
    key: "All",
    tab: "All",
  },
  {
    key: "Active",
    tab: "Active",
  },
  {
    key: "Completed",
    tab: "Completed",
  },
];

function App() {
  const tab = useSelector(selectTab);
  const dispatch = useDispatch();

  const onTabChange = (key) => {
    dispatch(setTab(key));
  };

  return (
    <div className="App">
      <header className="App-header">
        <Card
          style={{ width: "500px" }}
          tabList={tabList}
          activeTabKey={tab}
          onTabChange={(key) => {
            onTabChange(key);
          }}
          actions={[<CardFooter />]}
        >
          <Todo />
        </Card>
      </header>
    </div>
  );
}

export default App;
