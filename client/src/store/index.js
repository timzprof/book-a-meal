import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "../actions";

const initialState = {
    userAuthenticated: false,
    catererAuthenticated: false,
    overlay: false
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;
