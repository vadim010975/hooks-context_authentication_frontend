import { FC } from "react";
import "./Profile.css"

type ProfileType = {
  id: string,
  login: string,
  name: string,
  avatar: string,
}

type ProfileProps = {
  profile: ProfileType | undefined,
  handleClick: React.MouseEventHandler<HTMLButtonElement>,
}

const Profile: FC<ProfileProps> = ({ profile, handleClick }) => {

  return (
    <header className="profile">
      <h3 className="profile__title">Neto Social</h3>
      <div className="profile__greetings">Hello, {profile?.name}</div>
      <img src={profile?.avatar} alt="images" className="profile__img" />
      <button onClick={handleClick} className="profile__btn">Logout</button>
    </header>
  )
}

export default Profile;