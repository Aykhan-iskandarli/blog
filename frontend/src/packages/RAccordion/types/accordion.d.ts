export interface IAccordion{
    logoColor?: string | undefined,
    logoName?: string | undefined,
    name?: string | undefined,
    isEditBtn: boolean,
    editText: string | undefined,
    editIcon: string | undefined,
    isDeleteBtn: boolean,
    deleteText: string | undefined,
    deleteIcon: string | undefined,
    children: any
}