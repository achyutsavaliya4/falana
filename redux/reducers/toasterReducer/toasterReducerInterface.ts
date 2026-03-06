export interface errorData {}
export interface toasterData {
    type?: any;
    message?:any;
}
export interface errorMsgData {
    key?: string;
    customData?:object;
}
export interface toasterState {
  toasterData: toasterData;
  errMsg: errorData;
  errorMsgData?: errorMsgData
}
