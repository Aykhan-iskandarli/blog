import { useDispatch } from 'react-redux';
import { injectable } from 'tsyringe';
import { RequestInterceptor } from '../../../../packages/VHttp/interceptors/request.interceptor';
import { ResponseInterceptor } from '../../../../packages/VHttp/interceptors/response.interceptor';
import history from "../configs/history.config";
import { GetLang, getToken } from '../helpers/common-functions/common-functions';

@injectable()
export class ApiInterceptor extends RequestInterceptor {
    constructor() {
        super();
        this.request();
    }

    request() {
        document.body.classList.add('loading-indicator');

        this.intercept().use((req:any) => {
            req.headers = {
                ...req.headers,
                Authorization: 'Bearer ' + getToken(),
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
        document.body.classList.remove('loading-indicator');
        this.interceptor().use((res:any) => {
            return res;
        }, (error:any) => {
            document.body.classList.remove('loading-indicator');
            if (error.response) {
                document.body.classList.remove('loading-indicator');
                switch (error.response.status) {
                    case 401:
                        history.replace('/auth/login')
                        localStorage.removeItem('authToken');
                        break;
                    case 404:
                        history.replace('/error/not-found')
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

