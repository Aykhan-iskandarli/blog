import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import css from "./navbar.module.scss"
import {GiAbstract014} from "react-icons/gi"
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/actions'
import ButtonComponent from 'packages/RButton/button.component'
import { isAuth } from '../../helpers/common-functions/common-functions'

const NavbarComponent = () => {
  const dispatch:any = useDispatch()
 const [auth,setAuth] = useState("")
 const token:any = isAuth();

  useEffect(()=>{
    setAuth(token? token :"")
  },[token])
  return (
    <div className={css.navbar}>
      <div className="container">
        <nav className={css.navbar_container}>
          <div className="row justify-between align-center">
            <div className={css.navbar_left}>
              <Link href="/">
                <a>
                  <GiAbstract014 />
                </a>
              </Link>
            </div>
            <div className={css.navbar_right}>
              {!auth ? (
                <>
                  <Link href="/login">
                    <a>Log in</a>
                  </Link>
                  <Link href="/signup">
                    <a>Sign up</a>
                  </Link>
                </>
              ) : (
                <ButtonComponent click={()=>dispatch(logOut())}>Log out</ButtonComponent>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavbarComponent