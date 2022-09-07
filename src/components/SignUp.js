import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'
import logoImg from '../assets/logoImg.png'
import workImg from '../assets/workImg.png'

function SignUp () {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = ({ email, nickname, password, password2 }) => {
    // console.log(email, nickname, password, password2)
    const data = { "user": { email, password, nickname } }
    console.log(data)
    const url = "https://todoo.5xcamp.us/users"
    axios.post(url, data)
      .then((res) => {
        // console.log(res)
        // console.log(res.data)
        // console.log(res.data.message)
        Swal.fire({
          title: res.data.message,
          // width: 600,
          // padding: '3em',
          color: '#FF0000'
        })
        navigate("/");
      })
      .catch((error) => {
        // console.log(error)
        // console.log(error.response)
        // console.log(error.response.data)
        // console.log(error.response.data.error)
        // console.log(error.response.data.error[0])
        Swal.fire({
          title: error.response.data.error[0],
          // width: 600,
          // padding: '3em',
          color: '#FF0000'
        })
        navigate("/");
      })
      .finally(() => { /* 不論失敗成功皆會執行 */ })
  }
  return (
    // < !--sign up-- >
    <div id="signUpPage" className="bg-yellow">
      <div className="conatiner signUpPage vhContainer">
        <div className="side">
          <a href="#"><img className="logoImg" src={logoImg} alt="" /></a>
          <img className="d-m-n" src={workImg} alt="workImg" />
        </div>
        <div>
          <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="formControls_txt">註冊帳號</h2>

            <label className="formControls_label" htmlFor="email">Email</label>
            <input className="formControls_input" value="test888@test.com" placeholder="請輸入 email" {...register("email", { required: { value: true, message: '此欄位不可留空' }, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '無效的郵件地址' } })} />
            <span>{errors.email?.message}</span>

            <label className="formControls_label" htmlFor="nickname">您的暱稱</label>
            <input className="formControls_input" value="TestName" placeholder="請輸入您的暱稱" {...register("nickname", { required: { value: true, message: '此欄位不可留空' }, minLength: { value: 6, message: '最小长度6' } })} />
            <span>{errors.name?.message}</span>

            <label className="formControls_label" htmlFor="password">密碼</label>
            <input className="formControls_input" value="222222" placeholder="請輸入密碼" {...register("password", { required: { value: true, message: '此欄位不可留空' }, minLength: { value: 6, message: '最小长度6' } })} />
            <span>{errors.pwd?.message}</span>

            <label className="formControls_label" htmlFor="password2">再次輸入密碼</label>
            <input className="formControls_input" value="222222" placeholder="請再次輸入密碼" {...register("password2", { required: { value: true, message: '此欄位不可留空' }, minLength: { value: 6, message: '最小长度6' } })} />
            <span>{errors.pwd2?.message}</span>


            {/* <label className="formControls_label" htmlFor="name">您的暱稱</label>
            <input className="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" />
            <label className="formControls_label" htmlFor="pwd">密碼</label>
            <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required />
            <label className="formControls_label" htmlFor="pwd">再次輸入密碼</label>
            <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請再次輸入密碼" required /> */}
            <input className="formControls_btnSubmit" type="submit" value="註冊帳號" />
            <nav className="formControls_btnLink">
              <Link to="/">登入</Link>
            </nav>
          </form>
        </div>
      </div>

    </div>
  )
}

export default SignUp