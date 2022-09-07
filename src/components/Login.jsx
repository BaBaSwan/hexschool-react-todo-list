import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'
import logoImg from '../assets/logoImg.png'
import workImg from '../assets/workImg.png'

function Login () {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const onSubmit = (data) => {
  //   console.log(data);

  const onSubmit = ({ email, password }) => {
    // console.log(email, password);
    const data = { "user": { email, password } }
    const url = "https://todoo.5xcamp.us/users/sign_in"
    axios.post(url, data)
      .then((res) => {
        console.log(res)
        // console.log(res.headers)
        console.log(res.headers.authorization)
        axios.defaults.headers.common['Authorization'] = res.headers.authorization;
        // console.log(res.data)
        // console.log(res.data.message)
        // showError(res.data.message, navigate("/todo"))
        Swal.fire({
          title: res.data.message,
          // width: 600,
          // padding: '3em',
          color: '#FF0000'
        })
          .then((result) => {
            navigate("/todo");
          })

        // navigate("/todo");
        // navigate("/");
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

  return (
    // < !--login_page -- >
    <div id="loginPage" className="bg-yellow">
      <div className="conatiner loginPage vhContainer ">
        <div className="side">
          <a href="#"><img className="logoImg" src={logoImg} alt="" /></a>
          <img className="d-m-n" src={workImg} alt="workImg" />
        </div>
        <div>
          <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
            <label className="formControls_label" htmlFor="email">Email</label>
            <input className="formControls_input" value="test888@test.com" placeholder="請輸入 email" {...register("email", { required: { value: true, message: '此欄位不可留空' }, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '無效的郵件地址' } })} />
            <span>{errors.email?.message}</span>
            {/* <span>此欄位不可留空</span> */}
            <label className="formControls_label" htmlFor="password">密碼</label>
            <input className="formControls_input" value="222222" placeholder="請輸入密碼" {...register("password", { required: { value: true, message: '此欄位不可留空' }, minLength: { value: 6, message: '最小长度6' } })} />
            <span>{errors.pwd?.message}</span>
            {/* <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required /> */}
            <input type="submit" className="formControls_btnSubmit" value="登入" />
            <nav className="formControls_btnLink">
              <Link to="/signup">註冊帳號</Link>
            </nav>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login