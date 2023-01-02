import { IDropdown } from "../types/types";

export class MenuModel {
    public list: IDropdown[] = [];

    constructor(item: any) {
        this._setItems(item);
    }

    /**
     * Set Items
     * @param items
     * @private
     */

    private _setItems(menu: IDropdown[]): void {
            this.list = menu
    }

}
