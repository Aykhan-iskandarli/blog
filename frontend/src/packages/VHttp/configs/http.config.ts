import environment from "../../../core/layouts/public/configs/app.config";

export const HttpConfig = {
  SHOWEXCEPTIONSTACK: String(environment.env) === 'production',
}
