import { SET_USER_DETAILS, SET_USER_MASTER_LIST } from "@/redux/actions/userMasterAction/userMasterAction";
import { UserMasterReducerInterface } from "./userMasterReducerInterface";

const  initialState: UserMasterReducerInterface = {
    userMasterList: [],
    userMasterMetadata: {},
    userDetails: {}
}

const userMasterReducer = (
    state: UserMasterReducerInterface = initialState,
    action: { type: string; payload: any },
): UserMasterReducerInterface => {
    switch (action.type) {
        case SET_USER_MASTER_LIST:
            return {
                ...state,
                userMasterList: action.payload?.data?.users,
                userMasterMetadata: (action.payload as any)?.meta,
            };
        case SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload,
            };
        default:
            return state;
    }
}

export default userMasterReducer;