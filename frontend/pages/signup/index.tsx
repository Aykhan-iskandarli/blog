import  Router  from 'next/router'
import ButtonComponent from 'packages/RButton/button.component'
import InputComponent from 'packages/RInput/input.component'
import LoadingComponent from 'packages/RLoading/loading.component'
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { isAuth } from 'src/core/layouts/public/helpers/common-functions/common-functions'
import { register } from 'src/core/layouts/public/store/actions'
import css from "./singup.module.scss"

const SignUpComponent = () => {
  const [inputValue,setInputValue] = useState({
    name:"",
    email:"",
    password:"",
  })
  const loading:any = useSelector((state: any) => state.publicState.loading)
  const {name,email,password} = inputValue

  const handleChange = (e:any) =>{
    const {name,value} = e.target
    setInputValue({...inputValue,[name]:value})
  }

  const dispatch:any = useDispatch()

  const handleSubmit = (e:any) =>{
    e.preventDefault()
    if(name !== "" || email !=="" || password !== ""){
      dispatch(register(inputValue))
    }
  setInputValue({
    name:"",
    email:"",
    password:""
  })

  }

  useEffect(()=>{
    isAuth() && Router.push("/")
  },[])

  return (
    <div className={css.signin}>
      {loading && <LoadingComponent/>}
      <div className={css.signin_container}>
        <div className="container">
          <div className={css.signin_title}>
            <div className="col-12">
              <h1>Sign in</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className={css.signin_form}>
                <form onSubmit={handleSubmit}>
                <div className="col-12">
                    <InputComponent label="Name" name="name" value={name} onChange={handleChange}/>
                  </div>
                  <div className="col-12">
                    <InputComponent type="email" label="Email" name="email" value={email} onChange={handleChange}/>
                  </div>
                  <div className="col-12">
                    <InputComponent type='password' label="Password" name="password" value={password} onChange={handleChange}/>
                  </div>
                  {/* <div className="col-12">
                    <InputComponent label="Confirm Password" onChange={handleChange}/>
                  </div> */}
                  <div className="col-12 mt-20">
                    <ButtonComponent type='submit' size={"xl"} className={css.signin_btn}>
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
  )
}

export default SignUpComponent