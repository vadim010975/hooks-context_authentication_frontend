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

export const authorize = async (data: { login: string; password: string }) => {
  try {
    const r = await fetch(_URL + "auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (r.status < 200 || r.status > 299) {
      throw new Error(r.status.toString());
    }
    const response = await r.json();
    return {token: response.token};
  } catch (e) {
    const error = e as Error;
    return {error};
  }
};

export const fetchProfile = async (token: string) => {
  try {
    const r = await fetch(_URL + "private/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (r.status < 200 || r.status > 299) {
      throw new Error(r.status.toString());
    }
    const response = await r.json();
    return {response};
  } catch (e) {
    const error = e as Error;
    return {error};
  }
};

export const fetchNewsline = async (token: string) => {
  try {
    const r = await fetch(_URL + "private/news", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (r.status < 200 || r.status > 299) {
      throw new Error(r.status.toString());
    }
    const response = await r.json();
    return {response};
  } catch (e) {
    const error = e as Error;
    return {error};
  }
};

export const logOut = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_profile");
};
