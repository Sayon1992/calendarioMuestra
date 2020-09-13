import axios from "axios";

export const ApiGeneral = (token, data, url) => {
  return axios
    .create({
      baseURL: "http://localhost:5000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        "access-token": `${token}`,
      },
    })
    .post(`${url}`, data);
};
