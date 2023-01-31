import type { AppProps } from "next/app";
import LayoutComponent from "src/core/layouts/public/layout.component";
import "../src/assets/styles/global.scss"
import "src/packages/RButton/button.component.scss"
import { Provider } from "react-redux";
import store from "src/root store";
import "src/packages/RLoading/loading.component.scss"
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import Router from "next/router";
import { useEffect } from "react";
import PrivateComponent from "components/private/private.component";
import Cookies from "js-cookie";
import PublishContentComponent from "components/publish-content/publish-content.component";
import '../src/core/shared/toast/toast.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
export default function App({ Component, pageProps }: AppProps) {
  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  const token = Cookies.get("token");
  useEffect(()=>{
    if(!token){
      Router.push("/login")
    }
  },[token])
  return (
    <Provider store={store}>
      {
        token ?
          <PrivateComponent>
            <LayoutComponent>
              <Component {...pageProps} />
            </LayoutComponent>
          </PrivateComponent> :
          <PublishContentComponent>
            <LayoutComponent>
              <Component {...pageProps} />
            </LayoutComponent>
          </PublishContentComponent>
      }
        <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </Provider>
  );
}
