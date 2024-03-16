import { useState, useEffect } from "react";
import Form from "./Form/Form";
import Profile from "./Profile/Profile";
import Newsline from "./Newsline/Newsline";
import { ProfileType, NewslineType, authorize, fetchProfile, fetchNewsline, logOut } from "./service";

const Page = () => {

  const [token, setToken] = useState<string>("");
  const [profile, setProfile] = useState<ProfileType>();
  const [newsline, setNewsline] = useState<NewslineType>([]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);
    const userName = data.userName as string;
    const password = data.password as string;
    target.reset();
    authorize({ login: userName, password }).then(res => {
      setToken(res);
    });
  }

  useEffect(() => {
    const JSONtoken = localStorage.getItem("auth_token");
    if (!JSONtoken) {
      return;
    }
    setToken(JSON.parse(JSONtoken));
    const JSONprofile = localStorage.getItem("auth_profile");
    if (!JSONprofile) {
      return;
    }
    setProfile(JSON.parse(JSONprofile));
  }, []);

  useEffect(() => {
    if (token && !localStorage.getItem("auth_token")) {
      fetchProfile(token).then(res => {
        setProfile(res);
      });
      localStorage.setItem("auth_token", JSON.stringify(token));
    }
  }, [token]);

  useEffect(() => {
    if (profile) {
      fetchNewsline(token).then(res => {
        setNewsline(res);
      });
      localStorage.setItem("auth_profile", JSON.stringify(profile));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setNewsline([]);
    setProfile(undefined);
    setToken("");
    logOut();
  }

  return (
    <div className="page">
      {!profile && <Form handleSubmit={handleSubmit} />}
      {profile && <Profile profile={profile} handleClick={handleClick} />}
      {newsline && <Newsline newsline={newsline} />}
    </div>
  )
}

export default Page;