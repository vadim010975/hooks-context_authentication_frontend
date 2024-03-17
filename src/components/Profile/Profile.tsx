import { FC, useContext } from "react";
import "./Profile.css";
import ProfileContext from "../../contexts/ProfileContext";
import { ProfileType } from "../service";

type ProfileProps = {
  handleClick: React.MouseEventHandler<HTMLButtonElement>,
}

const Profile: FC<ProfileProps> = ({ handleClick }) => {

  const { name, avatar } = useContext(ProfileContext) as ProfileType;

  return (
    <header className="profile">
      <h3 className="profile__title">Neto Social</h3>
      <div className="profile__greetings">Hello, {name}</div>
      <img src={avatar} alt="images" className="profile__img" />
      <button onClick={handleClick} className="profile__btn">Logout</button>
    </header>
  )
}

export default Profile;