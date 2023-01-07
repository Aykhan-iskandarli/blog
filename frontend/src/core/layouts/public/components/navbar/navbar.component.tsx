import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import css from "./navbar.module.scss"
import {GiAbstract014} from "react-icons/gi"
import { useDispatch } from 'react-redux'
import { logOut, setUserData } from '../../store/actions'
import ButtonComponent from 'packages/RButton/button.component'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

const NavbarComponent = () => {
  const dispatch:any = useDispatch()
  const auth:any = useSelector((state: any) => state.publicState.auth)
  const user:any = useSelector((state: any) => state.publicState.user)
  const token =  Cookies.get("token")
  useEffect(() => {
    token && dispatch(setUserData(token));
  }, [dispatch, token]);
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
                <div className='row align-center'>
                  {
                    <span className='mr-15'>{user?.name}</span>
                  }
                <ButtonComponent click={()=>dispatch(logOut())}>Log out</ButtonComponent>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default NavbarComponent