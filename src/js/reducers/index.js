//
//
//

import { goodsReducer } from './goodsReducer';
import { get_k_line_Reducer } from './k_line_Reducer';
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
	routing: routerReducer,
	get_k_line_Reducer,
	goodsReducer
});

export default rootReducer