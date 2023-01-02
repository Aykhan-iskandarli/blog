import { BehaviorSubject } from 'rxjs';

export const locale: BehaviorSubject<any> = new BehaviorSubject<any>(null)

export interface IContentHeader {
    about?: string
    info?: string
    faq?: string
    contact?: string
}


export interface IContentFooter {
    about?: string
    info?: string
    services?: string
    apps?: string
    faq?: string
    contact?: string
    subscription?: IContentSubscription
    copyright?:  string
}
export interface IContentSubscription {
    news?: string
    email?: string
    send?: string
}