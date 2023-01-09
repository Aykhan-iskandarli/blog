import Cookies from "js-cookie";
import Router from "next/router";
import { userAgent } from "next/server";
import LoadingComponent from "packages/RLoading/loading.component";
import React, { useEffect } from "react";
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
  useEffect(() => {
    token && dispatch(setUserData(token));
    if (!token) {
      Router.push("/login");
    } else if (token && user.role === 1) {
      Router.push("/admin");
    } else if (token && user.role === 0) {
      Router.push("/user");
    }
  }, [token, dispatch, user.role]);
  return (
    <div>
      {loading && <LoadingComponent />}
      {children}
    </div>
  );
};

export default PrivateComponent;
