export interface IModalProps {
  size: string;
  position?: string;
  title: string;
  right_title?:string,
  children: React.ReactNode;
  show: boolean;
  setShow?: any;
  custom_class?:any,
  hideHeader?:boolean,
  closeIcon? : any,
  loading? : boolean,
  classes? : string,
  color?:string,
  modal_img?:string
}

export interface IProps {
  children: React.ReactNode;
}
