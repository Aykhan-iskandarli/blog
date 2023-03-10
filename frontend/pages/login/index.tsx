import  Router  from "next/router";
import ButtonComponent from "packages/RButton/button.component";
import InputComponent from "packages/RInput/input.component";
import LoadingComponent from "packages/RLoading/loading.component";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "src/core/layouts/public/store/actions";
import css from "./login.module.scss";

const LoginComponent = () => {
  const [inputValue,setInputValue] = useState({
    email:"",
    password:"",

  })
  const loading:any = useSelector((state: any) => state.publicState.loading)
  const {email,password} = inputValue

  const handleChange = (e:any) =>{
    const {name,value} = e.target
    setInputValue({...inputValue,[name]:value})
  }

  const dispatch:any = useDispatch()

  const handleSubmit = (e:any) =>{
    e.preventDefault()
   dispatch(login(inputValue))
 
  }

  return (
    <div className={css.login}>
      <div className={css.login_container}>
        <div className="container">
          <div className={css.login_title}>
            <div className="col-12">
              <h1>LOGIN</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className={css.login_form}>
                <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <InputComponent type="email" label="Email" name="email" value={email} onChange={handleChange}/>
                  </div>
                  <div className="col-12">
                    <InputComponent type='password' label="Password" name="password" value={password} onChange={handleChange}/>
                  </div>
                  <div className="col-12 mt-20">
                    <ButtonComponent type="submit" size={"xl"} className={css.login_btn}>
                      Submit
                    </ButtonComponent>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
