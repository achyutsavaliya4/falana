export const GET_USER_MASTER_LIST = "GET_USER_MASTER_LIST";
export const SET_USER_MASTER_LIST = "SET_USER_MASTER_LIST";
export const GET_USER_DETAILS = "GET_USER_DETAILS";
export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const INVITE_USER = "INVITE_USER";
export const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";
export const REINVITE_USER = "REINVITE_USER";

export const getUserMasterList = ({ query }: { query: string }) => {
  return {
    type: GET_USER_MASTER_LIST,
    payload: { query },
  };
};
export const getUserDetails = (userId: { userId: number | string }) => {
  return {
    type: GET_USER_DETAILS,
    payload: userId,
  };
};

export const inviteUser = (data: any) => {
  return {
    type: INVITE_USER,
    payload: data,
  };
};
export const updateUserDetails = (data: any) => {
  return {
    type: UPDATE_USER_DETAILS,
    payload: data,
  };
};
export const reInviteUser = (userId: number) => {
  return {
    type: REINVITE_USER,
    payload: userId,
  };
};
