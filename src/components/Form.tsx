import { FC } from "react";

const Form: FC<{handlerSubmit: (event: React.FormEvent) => void}> = ({ handlerSubmit }) => {

  return (
    <form onSubmit={handlerSubmit} className="form">
      <h3>Neto Social</h3>
      <input type="text" name="userName" defaultValue="vasya" className="input user-name" required={true} />
      <input type="text" name="password" defaultValue="password" className="input password" required={true} />
      <button className="form_btn">Login</button>
    </form>
  );
}

export default Form;