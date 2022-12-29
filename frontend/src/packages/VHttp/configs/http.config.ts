import {environment} from '../../../core/configs/app.config';

export const HttpConfig = {
  SHOWEXCEPTIONSTACK: String(environment.env) === 'production',
}
