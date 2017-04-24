//
//. 1 1分
//
import * as Types from '../constants';

import requestData from '../../common/queryData';

// symbol。商品类型。unit k线类型。endtime 结束时间戳

//添加即时数据
export const addRealTimeData = (realData, type) => {

    return ((dispatch) => {
        dispatch(addRealTimeTypeData(realData,type))
    })
}
const addRealTimeTypeData = (realData, type) => {
    switch(type) {
        case '1':
            return {
                type: Types.GET_REAL_DATA,
                realData
            }
            break;
        case '5':
            return {
                type: Types.GET_REAL_DATA_5,
                realData
            }
            break;
        case '15':
            return {
                type: Types.GET_REAL_DATA_15,
                realData
            }
            break;
        case '30':
            return {
                type: Types.GET_REAL_DATA_30,
                realData
            }
            break;
        case '60':
            return {
                type: Types.GET_REAL_DATA_60,
                realData
            }
            break;
        case '1440':
            return {
                type: Types.GET_REAL_DATA_DAY,
                realData
            }
            break;
        case 'time':
            return {
                type: Types.GET_TIME_REAL_DATA,
                realData
            }
            break;
        default:
            return {
                type: Types.GET_REAL_DATA,
                realData
            }
    }
}

//插入即时数据
export const insertRealTimeData = (realData, type) => {
    return ((dispatch) => {
        dispatch(insertRealTimeTypeData(realData,type))
    })
}
const insertRealTimeTypeData = (realData, type) => {
    switch(type) {
        case '1':
            return {
                type: Types.INSERT_REAL_DATA,
                realData
            }
            break;
        case '5':
            return {
                type: Types.INSERT_REAL_DATA_5,
                realData
            }
            break;
        case '15':
            return {
                type: Types.INSERT_REAL_DATA_15,
                realData
            }
            break;
        case '30':
            return {
                type: Types.INSERT_REAL_DATA_30,
                realData
            }
            break;
        case '60':
            return {
                type: Types.INSERT_REAL_DATA_60,
                realData
            }
            break;
        case '1440':
            return {
                type: Types.INSERT_REAL_DATA_DAY,
                realData
            }
            break;
        case 'time':
            return {
                type: Types.INSERT_TIME_REAL_DATA,
                realData
            }
            break;
        default:
            return {
                type: Types.INSERT_REAL_DATA,
                realData
            }
    }
}

//首次请求数据
export const queryK_LineData = (k_type, productCode) => {
    var url = '';
    //http://120.26.164.246:888/marketProfessional/market/getTodayHisMarketByMin?symbol=NYMEXCL
    if (k_type == 'time') {
        url = Types.baseUrl + 'marketProfessional/market/getTodayHisMarketByMin?symbol=' + productCode;
    }else {
        url = Types.baseUrl + 'marketProfessional/market/getHistryDataList?symbol=' + productCode + '&unit=' + k_type;
    }

    return ((dispatch) => {
        dispatch(startLoadingData());
        dispatch(getK_LineData(Types.K_LINE_DATA, k_type));
        
        // requestData(url)
        // .then((res) => {
        //     if (res.data.length > 0) {
        //         dispatch(getK_LineData(res.data, k_type));
        //     }else if (res.data.length == 0) {
        //         dispatch(getNullData());
        //     }
        // })
        // .catch(function (error) {
        //     console.log('error---',error);
        // });
    });

}
const getK_LineData = (k_min_hour_data, type) => {
    switch(type) {
        case '1': 
            return {
                type: Types.GET_K_LINE,
                k_min_hour_data
            }
            break;
        case '5': 
            return {
                type: Types.GET_K_LINE_5,
                k_min_hour_data
            }
            break;
        case '15': 
            return {
                type: Types.GET_K_LINE_15,
                k_min_hour_data
            }
            break;
        case '30': 
            return {
                type: Types.GET_K_LINE_30,
                k_min_hour_data
            }
            break;
        case '60': 
            return {
                type: Types.GET_K_LINE_60,
                k_min_hour_data
            }
            break;
        case '1440': 
            return {
                type: Types.GET_K_LINE_DAY,
                k_min_hour_data
            }
            break;
        case 'time':
            return {
                type: Types.GET_TIME_DATA,
                k_min_hour_data
            }
            break;
        default:
            return {
                type: Types.GET_K_LINE,
                k_min_hour_data
            }
    }

}

//请求更多数据
export const queryMoreK_lineData = (k_type, endtime, productCode) => {

    k_type = (k_type == 'time' ? 1 : k_type);
    var url = Types.baseUrl + 'marketProfessional/market/getHistryDataList?'  + 'endtime=' + endtime +'&symbol=' + productCode + '&unit=' + k_type;

    return ((dispatch) => {
        requestData(url)
            .then((res) => {
                if (res.data.length > 0) {
                    // dispatch(getMoreK_LineData(res, k_type));
                    dispatch(getMoreK_LineData(res.data, k_type));
                }

            });
    });

}

const getMoreK_LineData = (k_more_data, type) => {
    switch(type) {
        case '1': 
            return {
                type: Types.GET_MORE_K_LINE,
                k_more_data
            }
            break;
        case '5': 
            return {
                type: Types.GET_MORE_K_LINE_5,
                k_more_data
            }
            break;
        case '15': 
            return {
                type: Types.GET_MORE_K_LINE_15,
                k_more_data
            }
            break;
        case '30': 
            return {
                type: Types.GET_MORE_K_LINE_30,
                k_more_data
            }
            break;
        case '60': 
            return {
                type: Types.GET_MORE_K_LINE_60,
                k_more_data
            }
            break;
        case '1440': 
            return {
                type: Types.GET_MORE_K_LINE_DAY,
                k_more_data
            }
            break;
        default:
            return {
                type: Types.GET_MORE_K_LINE,
                k_more_data
            }
    }

}


//返回数据为空
const getNullData = () => {
    return {
        type: Types.GET_NULL_DATA
    }
}

//时间
const add0 = (m) => {return m<10?'0'+m:m }
export const getLocalTime = (nS) => {
    if (!nS) return '';
    let time = new Date(parseInt(nS));
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    return y+add0(m)+add0(d)+' '+add0(h)+':'+add0(mm);
}

const startLoadingData = () => {
    return {
        type: Types.K_LOADING
    };
}

const endLoadingData = () => {
    return {
        type: Types.K_UNLOADING
    };
}



