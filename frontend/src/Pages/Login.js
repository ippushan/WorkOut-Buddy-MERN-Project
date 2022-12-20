import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    await login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <form className="login" onSubmit={handleSubmitHandler}>
      <h3>Login</h3>
      <label>:Email</label>
      <input type="email" onChange={emailChangeHandler} value={email} />
      <label>:password</label>
      <input
        type="password"
        onChange={passwordChangeHandler}
        value={password}
      />
      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
