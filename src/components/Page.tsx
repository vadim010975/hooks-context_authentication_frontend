import { useState, useEffect } from "react";
import Form from "./Form";
const _URL = "http://localhost:7070/";

const Page = () => {

  const [token, setToken] = useState<string>("");
  const [profile, setProfile] = useState();
  
  const authorize = async (data: {login: string, password: string}) => {
    const r = await fetch(_URL + "auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await r.json();
    setToken(response.token);
  }

  const handlerSubmit = (event: any) => {
    event.preventDefault();
    const { target } = event;
    const userName = target.elements.userName.value;
    const password = target.elements.password.value;
    target.reset();
    authorize({ login: userName, password })
  }

  const requestProfile = async () => {
    const r = await fetch(_URL + "private/me", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,  
      }
    });

  }



  useEffect(() => {
    requestProfile();
  }, [token]);

  return (
    <div>
      <Form handlerSubmit={handlerSubmit} />
      <div>{token}</div>
    </div>
  )
}

export default Page;