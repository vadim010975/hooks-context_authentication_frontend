const _URL = "http://localhost:7070/";

export type ProfileType = {
  id: string;
  login: string;
  name: string;
  avatar: string;
};

export type NewslineType = {
  id: string;
  title: string;
  image: string;
  content: string;
}[];

export const authorize = async (data: { login: string, password: string }) => {
  const r = await fetch(_URL + "auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await r.json();
  return response.token;
}

export const fetchProfile = async (token: string) => {
  try {
    const r = await fetch(_URL + "private/me", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (r.status < 200 || r.status > 299) {
      throw new Error(r.statusText);
    }
    if (r.status === 401) {
      logOut();
    }
    const response = await r.json();
    return response;
  } catch (e) {
    console.log(e);
  }
}

export const fetchNewsline = async (token: string) => {
  const r = await fetch(_URL + "private/news", {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  const response = await r.json();
  return response;
}

export const logOut = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_profile");
}