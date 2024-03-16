import { FC } from "react";
import "./Form.css";

const Form: FC<{ handleSubmit: React.FormEventHandler<HTMLFormElement> }> = ({ handleSubmit }) => {

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <h3 className="form__title">Neto Social</h3>
        <input type="text" name="userName" className="form__input user-name" required={true} placeholder="Username" />
        <input type="text" name="password" className="form__input password" required={true} placeholder="Password" />
        <button className="form__btn">Login</button>
      </form>
      <article className="lable">
        <h1 className="lable__title">Neto Social</h1>
        <h4 className="lable__slogan">Facebook and VK killer.</h4>
      </article>
    </>

  );
}

export default Form;