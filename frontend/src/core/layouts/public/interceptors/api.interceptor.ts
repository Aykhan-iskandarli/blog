import  Router  from 'next/router';
import { useDispatch } from 'react-redux';
import store from 'src/root store';
import { injectable } from 'tsyringe';
import { RequestInterceptor } from '../../../../packages/VHttp/interceptors/request.interceptor';
import { ResponseInterceptor } from '../../../../packages/VHttp/interceptors/response.interceptor';
import { GetLang } from '../helpers/common-functions/common-functions';
import { toggleLoading } from '../store/actions';

@injectable()
export class ApiInterceptor extends RequestInterceptor {
    constructor() {
        super();
        this.request();
    }

    request() {
        store.dispatch(toggleLoading(true));
        this.intercept().use((req:any) => {
            req.headers = {
                ...req.headers,
                // Authorization: 'Bearer ' + getToken(),
                "Accept-Language": GetLang()
            };


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
                        Router.push('/auth/login')
                        localStorage.removeItem('token');
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