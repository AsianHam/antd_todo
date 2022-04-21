import "./App.css";
import React, { useState } from "react";
import { Button, Typography, Checkbox } from "antd";
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";

export default function App() {
  const [list, setList] = useState([{ isChecked: false, text: "" }]);

  function strikeThrough(e, index) {
    const newList = [...list]
    newList[index].isChecked = e.target.checked
    setList(newList)
  }

  function addTask() {
    setList([...list, { isChecked: false, text: "" }])
  }

  function deleteTask(e, index) {
    console.log(index)
    const newList = [...list]
    newList.splice(index, 1)
    setList(newList)
  }

  function updateTask(newVal, index) {
    const newList = [...list]
    newList[index].text = newVal
    setList(newList)
  }

  return (
    <div style={{ width: 500, margin: "50px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "50px auto",
        }}
      >
        <h1>TO DO LIST</h1>
      </div>

      <div>
        <div className="scrollBar">
          {list.map((item, index) => 
            <div className={item.isChecked ? "Strike" : "Normal"} key={index}>
              <div className="delButton" key={index}>
                <Button icon={<DeleteOutlined/>} danger onClick={(e) => deleteTask(e, index)}></Button>
              </div>
              <Checkbox onChange={(e) => strikeThrough(e, index)} checked={item.isChecked}>
                <div className="taskWidth">
                  <Typography.Text
                    editable={{
                      onChange: (newVal) => updateTask(newVal, index),
                      maxLength: 100,
                      autoSize: false,
                    }}
                  >
                    {item.text}
                  </Typography.Text>
                </div>
              </Checkbox>
              <p/>
              <p/>
            </div>
          )}
        </div>
      <Button onClick={addTask}>
        Add Task
      </Button>

      </div>
    </div>
  );
}
