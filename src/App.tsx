import "./App.css";
import { useState, useEffect } from "react";
import Form from "./components/Form/Form";
import Profile from "./components/Profile/Profile";
import Newsline from "./components/Newsline/Newsline";
import { ProfileType, NewslineType, authorize, fetchProfile, fetchNewsline, logOut } from "./components/service";
import ProfileContext from "./contexts/ProfileContext";
import NewslineContext from "./contexts/NewsLineContext";

export default function App() {

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
      if (res.token) {
        setToken(res.token);
      }
      if (res.error) {
        if (res.error.message === "401") {
          logOut();
          clearStats();
        }
        console.log(res.error);
      }
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
        if (res.response) {
          setProfile(res.response);
        }
        if (res.error) {
          if (res.error.message === "401") {
            logOut();
            clearStats();
          }
          console.log(res.error);
        }
      });
      localStorage.setItem("auth_token", JSON.stringify(token));
    }
  }, [token]);

  useEffect(() => {
    if (profile) {
      fetchNewsline(token).then(res => {
        if (res.response) {
          setNewsline(res.response);
        }
        if (res.error) {
          if (res.error.message === "401") {
            logOut();
            clearStats();
          }
          console.log(res.error);
        }
      });
      localStorage.setItem("auth_profile", JSON.stringify(profile));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    clearStats();
    logOut();
  }

  const clearStats = () => {
    setNewsline([]);
    setProfile(undefined);
    setToken("");
  }

  return (
    <div className="page">
      {!profile && <Form handleSubmit={handleSubmit} />}
      <ProfileContext.Provider value={profile}>
        {profile && <Profile handleClick={handleClick} />}
      </ProfileContext.Provider>
      <NewslineContext.Provider value={newsline}>
        {newsline && <Newsline />}
      </NewslineContext.Provider>
    </div>
  )
}
