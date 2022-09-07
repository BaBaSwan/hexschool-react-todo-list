import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

function TextInput (props) {

  const { newcontent, setNewcontent, data, setData, getData } = props

  function addItem (e) {

    e.preventDefault();
    console.log("clicked")
    // console.log([...data, {
    //   content: newcontent,
    //   completed_at: false
    // }])
    // console.log(newcontent)
    const url = "https://todoo.5xcamp.us/todos"
    const newData = {
      "todo": {
        "content": newcontent
      }
    }
    axios.post(url, newData)
      .then((res) => {
        console.log(res)
        console.log(res.data)
        console.log(res.data.id)
        // setData(res.data.todos)
        // setData([...data, {
        //   id: res.data.id,
        //   content: res.data.content,
        //   completed_at: null
        // }])
        getData()
        setNewcontent("")
      })
      .catch((error) => {
        console.log(error)
        console.log(error.response)
        console.log(error.response.data)
        // console.log(error.response.data.message)
        // console.log(error.response.data.error[0])
        Swal.fire({
          title: error.response.data.message,
          // title: error.response.data.error[0],
          // width: 600,
          // padding: '3em',
          color: '#FF0000'
        })
      })
      .finally(() => { /* 不論失敗成功皆會執行 */ })

    // setData([...data, {
    //   id: crypto.randomUUID(),
    //   content: newcontent,
    //   completed_at: null
    // }])
  }

  return (
    <div className="inputBox">
      <input type="text" placeholder="請輸入待辦事項" value={newcontent}
        onChange={(e) => {
          setNewcontent(e.target.value)
        }}
      />
      <a href="#" onClick={addItem} >
        <i className="fa fa-plus"
        ></i>
      </a>
    </div>

  )
}

function ItemList (props) {
  const { activeTab, setActiveTab, data, setData, getData } = props


  //const filteredData = (activeTab == 1 ? data : (data ? activeTab == 2 ? data.filter(item => !item.completed_at) : data.filter(item => item.completed_at)))
  const filteredData = activeTab === 1 ? data : activeTab === 2 ? data.filter(item => !item.completed_at) : data.filter(item => item.completed_at)
  const completed_atCount = data.filter(item => item.completed_at).length

  async function deleteItem (id) {
    const url = `https://todoo.5xcamp.us/todos/${id}`

    await axios.delete(url)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
        console.log(error.response)
        console.log(error.response.data)
        // console.log(error.response.data.message)
        // console.log(error.response.data.error[0])
        // Swal.fire({
        //   title: error.response.data.message,
        //   // title: error.response.data.error[0],
        //   // width: 600,
        //   // padding: '3em',
        //   color: '#FF0000'
        // })
      })
      .finally(() => { /* 不論失敗成功皆會執行 */ })

  }

  async function removeItem (e, id) {
    e.preventDefault()

    await deleteItem(id)

    //let temp = data.filter(item => item.id !== id)
    //setData(temp)
    await getData()
  }

  // function removeItem (e, id) {
  //   e.preventDefault()

  //   const url = `https://todoo.5xcamp.us/todos/${id}`
  //   axios.delete(url)
  //     .then((res) => {
  //       console.log(res)
  //       // setData(res.data.todos)
  //       let temp = data.filter(item => item.id !== id)
  //       setData(temp)

  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       console.log(error.response)
  //       console.log(error.response.data)
  //       // console.log(error.response.data.message)
  //       // console.log(error.response.data.error[0])
  //       Swal.fire({
  //         title: error.response.data.message,
  //         // title: error.response.data.error[0],
  //         // width: 600,
  //         // padding: '3em',
  //         color: '#FF0000'
  //       })
  //     })
  //     .finally(() => { /* 不論失敗成功皆會執行 */ })


  // }

  async function toggleChecked (id) {
    const url = `https://todoo.5xcamp.us/todos/${id}/toggle`
    await axios.patch(url)
      .then((res) => {
        console.log(res)
        console.log(res.data)
        console.log(res.data.completed_at)
        // let temp = data.map(item => item.id === id ? { id: item.id, content: item.content, completed_at: res.data.completed_at } : item)
        // setData(temp)
        getData()
      })
      .catch((error) => {
        console.log(error)
        console.log(error.response)
        console.log(error.response.data)

        Swal.fire({
          title: error.response.data.message,
          // title: error.response.data.error[0],
          // width: 600,
          // padding: '3em',
          color: '#FF0000'
        })
      })
      .finally(() => { /* 不論失敗成功皆會執行 */ })

    //let temp = data.map(item => item.id === id ? { id: item.id, content: item.content, completed_at: !item.completed_at } : item)
    //setData(temp)
  }

  async function removeCompletedItem (e) {
    e.preventDefault()

    let temp = data.filter(item => item.completed_at)
    await Promise.all(temp.map(async element => {
      console.log(element)
      await deleteItem(element.id)
    }))

    await getData()
    // setData(temp)
  }

  function setTab (e, id) {
    // console.log("inputtext handleclick")
    e.preventDefault()
    setActiveTab(id)
  }

  return (
    <div className="todoList_list">
      <ul className="todoList_tab">
        <li><a href="#" className={activeTab == 1 ? "active" : ""} onClick={(e) => setTab(e, 1)}>全部</a></li>
        <li><a href="#" className={activeTab == 2 ? "active" : ""} onClick={(e) => setTab(e, 2)}>待完成</a></li>
        <li><a href="#" className={activeTab == 3 ? "active" : ""} onClick={(e) => setTab(e, 3)}>已完成</a></li>
      </ul>
      <div className="todoList_items">
        <ul className="todoList_item">
          {/* <li>abc</li> */}
          {filteredData.map((item, i) => {
            return (
              <li key={item.id}>
                <label className="todoList_label">
                  <input className="todoList_input" type="checkbox" value="true" checked={item.completed_at ? "checked" : ""} onChange={(e) => { toggleChecked(item.id) }} />
                  <span>{item.content}</span>
                </label>
                <a href="#">
                  <i className="fa fa-times" onClick={(e) => { console.log(item.id); removeItem(e, item.id) }}></i>
                </a>
              </li>
            )
          })
          }
        </ul>
        <div className="todoList_statistics">
          <p> {completed_atCount} 個已完成項目</p>
          <a href="#" onClick={(e) => { removeCompletedItem(e) }}>清除已完成項目</a>
        </div>
      </div>
    </div >
  )
}

function Todo () {

  async function getData () {
    const url = "https://todoo.5xcamp.us/todos"
    await axios.get(url, data)
      .then((res) => {
        console.log(res)
        console.log(res.data)
        console.log(res.data.todos)
        setData(res.data.todos)
      })
      .catch((error) => {
        // console.log(error)
        // console.log(error.response)
        // console.log(error.response.data)
        // console.log(error.response.data.message)
        // console.log(error.response.data.error[0])
        Swal.fire({
          title: error.response.data.message,
          // title: error.response.data.error[0],
          // width: 600,
          // padding: '3em',
          color: '#FF0000'
        })
      })
      .finally(() => { /* 不論失敗成功皆會執行 */ })
  }

  useEffect(() => {
    console.log('todo useEffect')
    getData()
  }, [])

  const [data, setData] = useState([
    { id: 1, content: "把冰箱發霉的檸檬拿去丟", completed_at: '2022-09-04T10:58:33.352+08:00' },
    { id: 2, content: "打電話叫媽媽匯款給我", completed_at: null },
    { id: 3, content: "整理電腦資料夾", completed_at: null },
    { id: 4, content: "繳電費水費瓦斯費", completed_at: null }
  ]);
  const [newcontent, setNewcontent] = useState("");
  const [activeTab, setActiveTab] = useState(1);

  let navigate = useNavigate();

  function signOut (e) {
    e.preventDefault()
    delete axios.defaults.headers.common['Authorization']
    navigate("/");
  }


  return (
    <div id="todoListPage" className="bg-half">
      <nav>
        <h1><a href="#">ONLINE TODO LIST</a></h1>
        <ul>
          <li className="todo_sm"><a href="#"><span>王小明的代辦</span></a></li>
          <li><a href="#loginPage" onClick={(e) => signOut(e)}>登出</a></li>
        </ul>
      </nav >
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <TextInput newcontent={newcontent} setNewcontent={setNewcontent} data={data} setData={setData} getData={getData} />
          <ItemList activeTab={activeTab} setActiveTab={setActiveTab} data={data} setData={setData} getData={getData} />
        </div>
      </div>
    </div >
  )
}


export default Todo