import Cookies from 'js-cookie';
import  Router  from 'next/router';
import { useDispatch } from 'react-redux';
import store from 'src/root store';
import { injectable } from 'tsyringe';
import { RequestInterceptor } from '../../../../packages/VHttp/interceptors/request.interceptor';
import { ResponseInterceptor } from '../../../../packages/VHttp/interceptors/response.interceptor';
import { GetLang } from '../helpers/common-functions/common-functions';
import { removeCookie, toggleLoading } from '../store/actions';

@injectable()
export class ApiInterceptor extends RequestInterceptor {
    constructor() {
        super();
        this.request();
    }
    request() {
    const token = Cookies.get("token");
        this.intercept().use((req:any) => {
            req.headers = {
                ...req.headers,
                Authorization: 'Bearer ' + token,
                "Accept-Language": GetLang()
            };

            store.dispatch(toggleLoading(true));
            return req;
        })
    }
}
export class ApiInterceptorResponse extends ResponseInterceptor {
    constructor() {
        super();
        this.response();
    }

    response() {
        this.interceptor().use((res:any) => {
            store.dispatch(toggleLoading(false));
            return res;
        }, (error:any) => {
            store.dispatch(toggleLoading(false));
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        Router.push('/login')
                        removeCookie("token");
                        break;
                    case 404:
                        Router.push('/error/not-found')
                        break;
                    case 500:
                        break;
                    case 400:
                        break;
                    default:
                        break;
                }
            }
            return Promise.reject(error);
        });
    }
}