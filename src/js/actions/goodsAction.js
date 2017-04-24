import * as Types from '../constants';

import requestData from '../../common/queryData';

export const queryGoodsData = () => {

    // http://120.26.164.246:888/marketProfessional/common/product/query/canorder
    var url = Types.baseUrl + 'marketProfessional/common/product/query/canorder';
    
    return ((dispatch) => {
        dispatch(startLoadingData());

        dispatch(getGoodsData(Types.HOME_GOODS_DATA));
        // requestData(url)
        // .then((res) => {
        //     if (res.data.success == true) {
        //         dispatch(getGoodsData(res.data.results));
        //     }else {
        //         dispatch(getNullData());
        //     }
        // })
        // .catch(function (error) {
        //     console.log('error---',error);
        // });
    });
}

const getGoodsData = (goodsData) => {
	return {
        type: Types.GET_GOODS,
        goodsData
    }
}



//
// export const saveProductCode = (productCode) => {
//     return ((dispatch) => {
//         return {
//                 type: Types.SAVE_PRODUCTCODE,
//                 productCode
//             }
//     })
// }

const startLoadingData = () => {
    return {
        type: Types.GOODS_LOADING
    };
}

const endLoadingData = () => {
    return {
        type: Types.GOODS_UNLOADING
    };
}





