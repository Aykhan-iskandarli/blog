import type { AppProps } from "next/app";
import LayoutComponent from "src/core/layouts/public/layout.component";
import "../src/assets/styles/global.scss"
import "src/packages/RButton/button.component.scss"
import { Provider } from "react-redux";
import store from "src/root store";
import "src/packages/RLoading/loading.component.scss"
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import  Router  from "next/router";
import { useEffect } from "react";
import PrivateComponent from "components/private/private.component";
import { isAuth } from "src/core/layouts/public/store/actions";

export default function App({ Component, pageProps }: AppProps) {
 Router.events.on("routeChangeStart", () => NProgress.start());
 Router.events.on("routeChangeComplete", () => NProgress.done());
 Router.events.on("routeChangeError", () => NProgress.done());


//  useEffect(()=>{
//   isAuth() && Router.push("/")
//  },[])

  return (
 <Provider store={store}>
  <PrivateComponent>
  <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  </PrivateComponent>
 </Provider>
  );
}
