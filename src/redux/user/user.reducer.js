import { UserActionTypes } from "./user.types";

const ININITAL_STATE = {
    currentUser: null
}

const userReducer = (state = ININITAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default: 
            return state;
    }
}

export default userReducer;