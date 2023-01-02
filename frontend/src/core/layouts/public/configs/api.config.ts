// import environment from './app.config';

export const environment = process.env.PUBLIC_URL;
console.log(environment,"environment")
const base = "/api/";

export const API = {
  register: environment + base + "register",
  login: environment + base + "login",
};
