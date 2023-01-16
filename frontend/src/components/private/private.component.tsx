import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";
import { userAgent } from "next/server";
import LoadingComponent from "packages/RLoading/loading.component";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  ApiInterceptor,
  ApiInterceptorResponse,
} from "src/core/layouts/public/interceptors/api.interceptor";
import { setUserData } from "src/core/layouts/public/store/actions";
import { container } from "tsyringe";

const PrivateComponent = ({ children }: any) => {
  const loading: any = useSelector((state: any) => state.publicState.loading);
  const user: any = useSelector((state: any) => state.publicState.user);
  const interceptor: any = container.resolve(ApiInterceptor);
  const interceptorRes: any = container.resolve(ApiInterceptorResponse);
  const token = Cookies.get("token");
  const dispatch: any = useDispatch();
  const [showContent,setShowContent] = useState(false)
  const {pathname} = useRouter()
  const AccessUrl = {
    admin:[
      "/admin",
      "/",
      "/admin/crud/category-tag",
      "/admin/crud/blog"
    ],
    user:[
      "/user",
      "/",
      "/user/blog",
    ]
  }
  
  useEffect(()=>{
    token && dispatch(setUserData(token))
  },[dispatch])

  useEffect(() => {
    if (!token) {
      Router.push("/login");
    } else {
      switch (user.role) {
        case 1:
          if (!AccessUrl.admin.includes(pathname)) {
            Router.push("/admin");
          } else {
            setShowContent(true);
          }
          break;
        case 0:
          if (!AccessUrl.user.includes(pathname)) {
            Router.push("/user");
          } else {
            setShowContent(true);
          }
          break;
        default:
          break;
      }
    }
  }, [token,user,pathname]);


  return (
    <div>
      {loading && <LoadingComponent />}
      {children}
    </div>
  );
};

export default PrivateComponent;
