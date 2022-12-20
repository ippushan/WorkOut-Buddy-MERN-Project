import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmitHandler = async (e) => {
    e.preventDefault();

    await signup(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <form className="signup" onSubmit={handleSubmitHandler}>
      <h3>Signup</h3>
      <label>:Email</label>
      <input type="email" onChange={emailChangeHandler} value={email} />
      <label>:password</label>
      <input
        type="password"
        onChange={passwordChangeHandler}
        value={password}
      />
      <button disabled={isLoading}>Signup</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
