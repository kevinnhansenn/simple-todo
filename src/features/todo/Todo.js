import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  selectTasks,
  selectLoading,
  fetchRequest,
  selectTitle,
  selectTab,
} from "./todoSlice";
import { ListItem } from "../../components/ListItem/ListItem";

import { Input, List, Spin } from "antd";
import {
  CheckCircleOutlined,
  OrderedListOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import styles from "./Todo.module.css";

export function Todo() {
  const dispatch = useDispatch();

  const [titleToBeAdded, setTitleToBeAdded] = useState("");

  const tasks = useSelector(selectTasks);
  const loading = useSelector(selectLoading);

  const title = useSelector(selectTitle);
  const tab = useSelector(selectTab);

  const addButtonClicked = () => {
    const title = titleToBeAdded.trim();
    if (title) {
      dispatch(addTask(titleToBeAdded));
      setTitleToBeAdded("");
    }
  };

  useEffect(() => {
    dispatch(fetchRequest());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {title instanceof Object ? (
          <span>
            Tasks: &nbsp;
            <span style={{ color: "#FAAD14" }}>
              {title.notCompleted} <ClockCircleOutlined />
            </span>
            &nbsp;&nbsp;
            <span style={{ color: "#52C41A" }}>
              {title.completed} <CheckCircleOutlined />
            </span>
          </span>
        ) : (
          title
        )}
      </div>
      {tab !== "Completed" && (
        <Input.Search
          className={styles.input}
          prefix={<OrderedListOutlined />}
          placeholder="Add a task..."
          allowClear
          enterButton="Add Task"
          size="large"
          onSearch={addButtonClicked}
          onChange={(e) => setTitleToBeAdded(e.target.value)}
          value={titleToBeAdded}
        />
      )}
      <Spin spinning={loading}>
        <List
          size="large"
          dataSource={tasks}
          renderItem={(item) => <ListItem key={item.id} item={item} />}
        />
      </Spin>
    </div>
  );
}
