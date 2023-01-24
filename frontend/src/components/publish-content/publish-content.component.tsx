import Cookies from 'js-cookie';
import Router from 'next/router';
import LoadingComponent from 'packages/RLoading/loading.component';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from 'src/core/layouts/public/store/actions';

const PublishContentComponent = ({children}:any) => {
  const loading: any = useSelector((state: any) => state.publicState.loading);
    const token = Cookies.get("token");
    const dispatch: any = useDispatch();
    token && dispatch(setUserData(token));

    useEffect(()=>{
        if (!token) {
            Router.push("/");
          }
    },[token])
  return (
    <div>
    {loading && <LoadingComponent />}
    {children}
  </div>
  )
}

export default PublishContentComponent