import {combineReducers} from "redux"

import web3Status from "./web3StatusReducer"
import txStatus from "./txStatusReducer"

export default combineReducers({
  web3Status,
  txStatus
})