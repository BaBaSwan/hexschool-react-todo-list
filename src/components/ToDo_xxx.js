import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'

// < !--ToDo List-- >
const ToDoXXX = () => {
  let navigate = useNavigate();

  const [data, setData] = useState([
    { id: 1, task: "把冰箱發霉的檸檬拿去丟", completed: false },
    { id: 2, task: "打電話叫媽媽匯款給我", completed: false },
    { id: 3, task: "整理電腦資料夾", completed: false },
    { id: 4, task: "繳電費水費瓦斯費", completed: true }
  ]);
  const [newTask, setNewTask] = useState("");
  const [activeTab, setActiveTab] = useState(1);


  function TextInput (props) {
    const { newTask, setNewTask, data, setData } = props
    return (
      <div className="inputBox">
        <input type="text" placeholder="請輸入待辦事項" value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value)
          }}
        />
        <a href="#">
          <i className="fa fa-plus"
            onClick={(e) => {
              // console.log([...data, {
              //   task: newTask,
              //   completed: false
              // }])
              // console.log(newTask)
              setData([...data, {
                id: crypto.randomUUID(),
                task: newTask,
                completed: false
              }])
            }}
          ></i>
        </a>
      </div>

    )
  }

  useEffect(
    () => {
      const url = "https://todoo.5xcamp.us/todos"
      axios.get(url)
        .then((res) => {
          console.log(res)
          // console.log(res.data)
          // console.log(res.data.message)
          // Swal.fire({
          //   title: res.data.message,
          //   // width: 600,
          //   // padding: '3em',
          //   color: '#FF0000'
          // })
        })
        .catch((error) => {
          // console.log(error)
          // console.log(error.response)
          // console.log(error.response.data)
          // console.log(error.response.data.error)
          // console.log(error.response.data.error[0])
          // Swal.fire({
          //   title: error.response.data.error[0],
          //   // width: 600,
          //   // padding: '3em',
          //   color: '#FF0000'
          // })
          // navigate("/");
        })
        .finally(() => { /* 不論失敗成功皆會執行 */ })
    }, [])

  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1><a href="#">ONLINE TODO LIST</a></h1>
        <ul>
          <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
          <li><a href="#loginPage">登出</a></li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input type="text" placeholder="請輸入待辦事項" />
            <a href="#">
              <i className="fa fa-plus"></i>
            </a>
          </div>
          <div className="todoList_list">
            <ul className="todoList_tab">
              <li><a href="#" className="active">全部</a></li>
              <li><a href="#">待完成</a></li>
              <li><a href="#">已完成</a></li>
            </ul>
            <div className="todoList_items">
              <ul className="todoList_item">
                <li>
                  <label className="todoList_label">
                    <input className="todoList_input" type="checkbox" value="true" />
                    <span>把冰箱發霉的檸檬拿去丟</span>
                  </label>
                  <a href="#">
                    <i className="fa fa-times"></i>
                  </a>
                </li>
                <li>
                  <label className="todoList_label">
                    <input className="todoList_input" type="checkbox" value="true" />
                    <span>打電話叫媽媽匯款給我</span>
                  </label>
                  <a href="#">
                    <i className="fa fa-times"></i>
                  </a>
                </li>
                <li>
                  <label className="todoList_label">
                    <input className="todoList_input" type="checkbox" value="true" />
                    <span>整理電腦資料夾</span>
                  </label>
                  <a href="#">
                    <i className="fa fa-times"></i>
                  </a>
                </li>
                <li>
                  <label className="todoList_label">
                    <input className="todoList_input" type="checkbox" value="true" />
                    <span>繳電費水費瓦斯費</span>
                  </label>
                  <a href="#">
                    <i className="fa fa-times"></i>
                  </a>
                </li>
                <li>
                  <label className="todoList_label">
                    <input className="todoList_input" type="checkbox" value="true" />
                    <span>約vicky禮拜三泡溫泉</span>
                  </label>
                  <a href="#">
                    <i className="fa fa-times"></i>
                  </a>
                </li>
                <li>
                  <label className="todoList_label">
                    <input className="todoList_input" type="checkbox" value="true" />
                    <span>約ada禮拜四吃晚餐</span>
                  </label>
                  <a href="#">
                    <i className="fa fa-times"></i>
                  </a>
                </li>
              </ul>
              <div className="todoList_statistics">
                <p> 5 個已完成項目</p>
                <a href="#">清除已完成項目</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToDoXXX