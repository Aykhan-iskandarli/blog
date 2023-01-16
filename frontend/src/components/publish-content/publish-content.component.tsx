import Cookies from 'js-cookie';
import Router from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUserData } from 'src/core/layouts/public/store/actions';

const PublishContentComponent = ({children}:any) => {
    const token = Cookies.get("token");
    const dispatch: any = useDispatch();
    token && dispatch(setUserData(token));

    useEffect(()=>{
        if (!token) {
            Router.push("/");
          }
    },[])
  return (
    <div>
        {children}
    </div>
  )
}

export default PublishContentComponent