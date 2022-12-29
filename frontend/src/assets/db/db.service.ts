import * as db from './db.json';
import { locale } from './db.config';

export type langType = 'az' | 'en' | 'ru' | string;

export class DbService {
    private lang: langType = 'az';
    constructor() {
        this.setLang()
        this.populateDB();
    }
    public setNewLang(lang: langType) {
        this.lang = lang;
        this.populateDB();
    }
    private populateDB() {
        const dbData = JSON.parse(JSON.stringify(db))
        locale.next(dbData.default[this.lang]);
    }

    private setLang() {
        const lang = sessionStorage.getItem('lang');
        this.lang = lang ? lang : this.lang;
    }
}
