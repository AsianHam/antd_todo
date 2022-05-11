import "./App.css";
import React, { useState } from "react";
import { Button, Checkbox, Input } from "antd";
import "antd/dist/antd.css";
import { DeleteOutlined } from "@ant-design/icons";
export default function App() {
  const [list, setList] = useState([{ isChecked: false, text: "" }]);
  const { TextArea } = Input;

  function strikeThrough(e, index) {
    const newList = [...list]
    newList[index].isChecked = e.target.checked
    setList(newList)
  }

  function addTask() {
    setList([...list, { isChecked: false, text: "" }])
    const index = list.length
    const observer = new MutationObserver((mutations, obs) => {
      const task = document.getElementById(index);
      if (task) {
        document.getElementById(index).focus()
        obs.disconnect();
        return;
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true
    });
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

  function enterPress(index) {
    document.getElementById(index).blur()
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
            <div className="Tasks" key={index}>
              <div className="checkBox">
                <Checkbox onChange={(e) => strikeThrough(e, index)} checked={item.isChecked}/>
              </div>
              <div className="taskWidth">
                <TextArea 
                  placeholder="New Task" 
                  bordered={false}
                  autoSize
                  id={index} 
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      {enterPress(index)}
                    }
                  }}
                />
              </div>
              <div className="delButton">
                <Button icon={<DeleteOutlined/>} danger onClick={(e) => deleteTask(e, index)}></Button>
              </div>
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
