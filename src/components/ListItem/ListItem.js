import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  editTask,
  toggleTask,
} from "../../features/todo/todoSlice";

import { List, Checkbox, Tooltip, Button, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import styles from "./ListItem.module.css";

export function ListItem({ item }) {
  const checked = item.completed;
  const dispatch = useDispatch();

  const input = useRef(null);
  const [editTitle, setEditTitle] = useState("");
  const [hovered, setHovered] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (editMode) {
      setEditTitle(item.title);
      input.current.focus();
    }
  }, [editMode, item.title]);

  const editItem = (e) => {
    const event = new Event("click");
    window.dispatchEvent(event);

    e.stopPropagation();
    setEditMode(true);

    const listener = (e) => {
      if (e.target.id !== "editForm") {
        setEditMode(false);
        setHovered(false);
        window.removeEventListener("click", listener);
      }
    };

    window.addEventListener("click", listener);
  };

  const confirmUpdate = (e) => {
    e && e.stopPropagation();
    dispatch(
      editTask({
        id: item.id,
        title: editTitle,
      })
    );
    setEditMode(false);
  };

  const cancelUpdate = (e) => {
    e.stopPropagation();
    setEditMode(false);
  };

  return (
    <List.Item
      className={editMode ? "" : styles.listItem}
      onClick={() => !editMode && dispatch(toggleTask(item.id))}
      onMouseOver={() => !editMode && setHovered(true)}
      onMouseLeave={() => !editMode && setHovered(false)}
    >
      <div className={styles.innerItem}>
        <Checkbox checked={checked} />
        {editMode ? (
          <Input
            id={"editForm"}
            ref={input}
            placeholder="Basic usage"
            value={editTitle}
            className={styles.editInput}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && confirmUpdate()}
          />
        ) : (
          <span
            style={hovered ? { maxWidth: "360px" } : {}}
            className={checked ? styles.strikeThrough : styles.normal}
          >
            {item.title}
          </span>
        )}
      </div>
      {hovered && !editMode && (
        <div className={styles.actions}>
          <Tooltip title="Edit">
            <Button
              style={{ marginRight: "8px" }}
              type="primary"
              size="small"
              ghost
              shape="circle"
              icon={<EditOutlined />}
              onClick={editItem}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="danger"
              size="small"
              ghost
              shape="circle"
              onClick={() => dispatch(deleteTask(item.id))}
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </div>
      )}
      {editMode && (
        <div className={styles.actions}>
          <Tooltip title="Update">
            <Button
              style={{ marginRight: "8px" }}
              type="primary"
              size="small"
              ghost
              shape="circle"
              icon={<CheckOutlined />}
              onClick={confirmUpdate}
            />
          </Tooltip>
          <Tooltip title="Cancel">
            <Button
              type="danger"
              size="small"
              ghost
              shape="circle"
              onClick={cancelUpdate}
              icon={<CloseOutlined />}
            />
          </Tooltip>
        </div>
      )}
    </List.Item>
  );
}
