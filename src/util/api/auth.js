import { signUpUrl, logInUrl } from "../../config";
export const signUp = async (email, password, phoneNumber) => {
  const data = {
    email,
    phoneNumber,
    password,
  };
  return await (
    await fetch(signUpUrl, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  ).json();
};
export const login = async (email, password) => {
  const data = {
    email,
    password,
  };

  return await (
    await fetch(logInUrl, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  ).json();
};
