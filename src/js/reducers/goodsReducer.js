import * as Types from '../constants';

const goodsState = {
	loading: true,
	goodsData: [],
	// productCode: '',
}

export const goodsReducer = (state = goodsState,action = {}) => {
	switch (action.type) {
		// case Types.SAVE_PRODUCTCODE:
		// 	return Object.assign({},state,{
		// 		productCode: action.productCode
		// 	})
		case Types.GET_GOODS:
			return Object.assign({},state,{
				loading: false,
				goodsData: action.goodsData
			})
			break;
		case Types.GOODS_LOADING: 
			return Object.assign({},state,{
				loading : true,
			})
			break;
		case Types.GOODS_UNLOADING: 
			return Object.assign({},state,{
				loading : false,
				goodsData: []
			})
			break;
		default:
			return state
	}
}