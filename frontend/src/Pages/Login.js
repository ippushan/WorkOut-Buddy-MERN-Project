import { useState } from "react"

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const emailChangeHandler = (e) => {
  setEmail(e.target.value)
}
const passwordChangeHandler = (e) => {
  setPassword(e.target.value)
}
const handleSubmitHandler = async (e) => {
  e.preventDefault()
  console.log(email,password)
}

  return(
    <form className="login" onSubmit={handleSubmitHandler}>
    <h3>Login</h3>
    <label>:Email</label>
    <input type="email" onChange={emailChangeHandler} value={email} />
    <label>:password</label>
    <input type="password" onChange={passwordChangeHandler} value={password} />
    <button>Login</button>
    </form>
  )


}

export default Login;