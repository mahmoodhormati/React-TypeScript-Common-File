import { Column, Row} from "react-table";

export interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  chidrenData?:Row,
  pageApiSize?:number,
  setPageApiSize?:React.Dispatch<React.SetStateAction<any>>;
  getDataBySearch?:any
  getData?: (item: any) => void;
  childrenOnClick?: (item:any) => any;
  bulkJob?: (item: any) => void;
  ClickableHeader?:(item:{})=>{};
  totalResult?:number;
  pageNumber?:number , 
  setPageNumber?:React.Dispatch<React.SetStateAction<any>>,
  HasPagination?:string,
  IsSelectable?:string,
  ComponentId:string,
  hasTotal?:boolean,
  columnSpanTitle?:number,
  columnSpanPrice?:number,
  myTotal?:number

}
