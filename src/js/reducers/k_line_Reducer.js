//
//
//
import * as Types from '../constants';
import {getLocalTimeDay} from '../../common/tool';


const k_lineState = {
	loading: true,		//正在加载 true表示加载中
	chartType: '1',
    time_min_hour_data: {	//每分钟数据
        data: [],
        time:[],		//时间
    },
    //1
  	k_min_hour_data: {	//每分钟数据
  		allData: {},
  		data: [],
  		time:[],		//时间
  		endtime: '',
  		ma5: [],
  		ma10: [],
  		ma20: [],
  		isGetMore: true
  	}, 
  	k_min_hour_data_5: {	//每分钟数据
  		allData: {},
  		data: [],
  		time:[],		//时间
  		endtime: '',
  		ma5: [],
  		ma10: [],
  		ma20: [],
  		isGetMore: true
  	}, 
  	k_min_hour_data_15: {	//每分钟数据
  		allData: {},
  		data: [],
  		time:[],		//时间
  		endtime: '',
  		ma5: [],
  		ma10: [],
  		ma20: [],
  		isGetMore: true
  	}, 
  	k_min_hour_data_30: {	//每分钟数据
  		allData: {},
  		data: [],
  		time:[],		//时间
  		endtime: '',
  		ma5: [],
  		ma10: [],
  		ma20: [],
  		isGetMore: true
  	}, 
  	k_min_hour_data_60: {	//每分钟数据
  		allData: {},
  		data: [],
  		time:[],		//时间
  		endtime: '',
  		ma5: [],
  		ma10: [],
  		ma20: [],
  		isGetMore: true
  	}, 
  	k_min_hour_data_day: {	//每分钟数据
  		allData: {},
  		data: [],
  		time:[],		//时间
  		endtime: '',
  		ma5: [],
  		ma10: [],
  		ma20: [],
  		isGetMore: true
  	}, 
  	
}

export const get_k_line_Reducer = (state = k_lineState,action = {}) => {
	switch (action.type) {

        case Types.GET_TIME_DATA:
            var time = [];
            var data = [];
            var newData = action.k_min_hour_data;
            for (var i = 0; i < newData.length; i++) {
                data[i] = newData[i].close;
                time.push(getLocalTime(newData[i].datetime))
            }
            return Object.assign({},state,{
                loading: false,
                chartType: 'time',
                time_min_hour_data: {
                    data: data,
                    time: time,		//时间
                }
            })
            break;

		case Types.GET_K_LINE:
			var time = [];
			var data = [];
			var newData = action.k_min_hour_data;
			var isGetMore = (newData.length >= Types.firstDataLength) ? true : false;
			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}
			var endtime = newData[0].datetime;
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);
			return Object.assign({},state,{
				loading: false,
  				chartType: '1',	
  				k_min_hour_data: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
			  		isGetMore: isGetMore
  				}
			})
			break;
		case Types.GET_MORE_K_LINE: 
			var time = [];
			var data = [];

			var oldData = state.k_min_hour_data.allData;
			var moreData = action.k_more_data;

			var isGetMore = (moreData.length >= Types.firstDataLength) ? true : false;

			var newData = moreData.concat(oldData);

			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}

			var endtime = newData[0].datetime
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);

			return Object.assign({},state,{
				loading: false,	
  				chartType: '1',		
  				k_min_hour_data: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
			  		isGetMore: isGetMore
  				}
			})
			break;

		case Types.GET_K_LINE_5:
			var time = [];
			var data = [];
			var newData = action.k_min_hour_data;
			var isGetMore = (newData.length >= Types.firstDataLength) ? true : false;
			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}
			var endtime = newData[0].datetime;
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);
			return Object.assign({},state,{
				loading: false,
  				chartType: '1',	
  				k_min_hour_data_5: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
			  		isGetMore: isGetMore
  				}
			})
			break;
		case Types.GET_MORE_K_LINE_5: 
			var time = [];
			var data = [];

			var oldData = state.k_min_hour_data_5.allData;
			var moreData = action.k_more_data;
			var isGetMore = (moreData.length >= Types.firstDataLength) ? true : false;

			var newData = moreData.concat(oldData);

			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}

			var endtime = newData[0].datetime
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);

			return Object.assign({},state,{
				loading: false,	
  				chartType: '1',		
  				k_min_hour_data_5: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
			  		isGetMore: isGetMore
  				}
			})
			break;

		case Types.GET_K_LINE_15:
			var time = [];
			var data = [];
			var newData = action.k_min_hour_data;
			var isGetMore = (newData.length >= Types.firstDataLength) ? true : false;
			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}
			var endtime = newData[0].datetime;
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);
			return Object.assign({},state,{
				loading: false,
  				chartType: '1',	
  				k_min_hour_data_15: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
			  		isGetMore: isGetMore
  				}
			})
			break;
		case Types.GET_MORE_K_LINE_15: 
			var time = [];
			var data = [];

			var oldData = state.k_min_hour_data_15.allData;
			var moreData = action.k_more_data;

			var isGetMore = (moreData.length >= Types.firstDataLength) ? true : false;

			var newData = moreData.concat(oldData);

			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}

			var endtime = newData[0].datetime
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);

			return Object.assign({},state,{
				loading: false,	
  				chartType: '1',		
  				k_min_hour_data_15: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
			  		isGetMore: isGetMore
  				}
			})
			break;

		case Types.GET_K_LINE_30:
			var time = [];
			var data = [];
			var newData = action.k_min_hour_data;
			var isGetMore = (newData.length >= Types.firstDataLength) ? true : false;
			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}
			var endtime = newData[0].datetime;
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);
			return Object.assign({},state,{
				loading: false,
  				chartType: '1',	
  				k_min_hour_data_30: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
			  		isGetMore: isGetMore
  				}
			})
			break;
		case Types.GET_MORE_K_LINE_30: 
			var time = [];
			var data = [];

			var oldData = state.k_min_hour_data_30.allData;
			var moreData = action.k_more_data;

			var isGetMore = (moreData.length >= Types.firstDataLength) ? true : false;

			var newData = moreData.concat(oldData);

			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}

			var endtime = newData[0].datetime
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);

			return Object.assign({},state,{
				loading: false,	
  				chartType: '1',		
  				k_min_hour_data_30: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
			  		isGetMore: isGetMore
  				}
			})
			break;

		case Types.GET_K_LINE_60:
			var time = [];
			var data = [];
			var newData = action.k_min_hour_data;
			var isGetMore = (newData.length >= Types.firstDataLength) ? true : false;
			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}
			var endtime = newData[0].datetime;
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);
			return Object.assign({},state,{
				loading: false,
  				chartType: '1',	
  				k_min_hour_data_60: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
			  		isGetMore: isGetMore
  				}
			})
			break;
		case Types.GET_MORE_K_LINE_60: 
			var time = [];
			var data = [];

			var oldData = state.k_min_hour_data_60.allData;
			var moreData = action.k_more_data;
			var isGetMore = (moreData.length >= Types.firstDataLength) ? true : false;

			var newData = moreData.concat(oldData);
			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}

			var endtime = newData[0].datetime
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);

			return Object.assign({},state,{
				loading: false,	
  				chartType: '1',		
  				k_min_hour_data_60: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
			  		isGetMore: isGetMore
  				}
			})
			break;

		case Types.GET_K_LINE_DAY:
			var time = [];
			var data = [];
			var newData = action.k_min_hour_data;
			var isGetMore = (newData.length >= Types.firstDataLength) ? true : false;
			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTimeDay(newData[i].datetime))
			}
			var endtime = newData[0].datetime;
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);
			return Object.assign({},state,{
				loading: false,
  				chartType: '1',	
  				k_min_hour_data_day: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
			  		isGetMore: isGetMore
  				}
			})
			break;
		case Types.GET_MORE_K_LINE_DAY: 
			var time = [];
			var data = [];

			var oldData = state.k_min_hour_data_day.allData;
			var moreData = action.k_more_data;
			var newData = moreData.concat(oldData);

			var isGetMore = (moreData.length >= Types.firstDataLength) ? true : false;

			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTimeDay(newData[i].datetime))
			}

			var endtime = newData[0].datetime
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);

			return Object.assign({},state,{
				loading: false,	
  				chartType: '1',		
  				k_min_hour_data_day: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
			  		isGetMore: isGetMore
  				}
			})
			break;

        case Types.GET_TIME_REAL_DATA:
            var realData = action.realData;
            var oldData = state.time_min_hour_data.data;
            var oldTime = state.time_min_hour_data.time;
            var time = oldTime.concat(getLocalTime(realData.datetime));
            var data = oldData.concat(realData.close);
            return Object.assign({},state,{
                loading: false,
                chartType: 'time',
                time_min_hour_data: {
                    data: data,
                    time: time,		//时间
                }
            })
		case Types.GET_REAL_DATA:
			var realData = action.realData;
			var oldData = state.k_min_hour_data.allData;
			var newData = oldData.concat(realData);
			var time = [];
			var data = [];

			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}

			var endtime = newData[0].datetime
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);
			return Object.assign({},state,{
				loading: false,	
  				chartType: '1',		
  				k_min_hour_data: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
                    isGetMore: state.k_min_hour_data.isGetMore
  				}
			})
			break;
		case Types.GET_REAL_DATA_5:
			var realData = action.realData;
			var oldData = state.k_min_hour_data_5.allData;
			var newData = oldData.concat(realData);
			var time = [];
			var data = [];

			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}

			var endtime = newData[0].datetime
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);
			return Object.assign({},state,{
				loading: false,	
  				chartType: '1',		
  				k_min_hour_data_5: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
                    isGetMore: state.k_min_hour_data_5.isGetMore
  				}
			})
			break;
		case Types.GET_REAL_DATA_15:
			var realData = action.realData;
			var oldData = state.k_min_hour_data_15.allData;
			var newData = oldData.concat(realData);
			var time = [];
			var data = [];

			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}

			var endtime = newData[0].datetime
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);
			return Object.assign({},state,{
				loading: false,	
  				chartType: '1',		
  				k_min_hour_data_15: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
                    isGetMore: state.k_min_hour_data_15.isGetMore
  				}
			})
			break;
		case Types.GET_REAL_DATA_30:
			var realData = action.realData;
			var oldData = state.k_min_hour_data_30.allData;
			var newData = oldData.concat(realData);
			var time = [];
			var data = [];

			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];

				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}

			var endtime = newData[0].datetime
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);
			return Object.assign({},state,{
				loading: false,	
  				chartType: '1',		
  				k_min_hour_data_30: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
                    isGetMore: state.k_min_hour_data_30.isGetMore
  				}
			})
			break;
		case Types.GET_REAL_DATA_60:
			var realData = action.realData;
			var oldData = state.k_min_hour_data_60.allData;
			var newData = oldData.concat(realData);
			var time = [];
			var data = [];
			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];
				data[i] = arr;
				time.push(getLocalTime(newData[i].datetime))
			}
			var endtime = newData[0].datetime
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);
			return Object.assign({},state,{
				loading: false,	
  				chartType: '1',		
  				k_min_hour_data_60: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
                    isGetMore: state.k_min_hour_data_60.isGetMore
  				}
			})
			break;
		case Types.GET_REAL_DATA_DAY:
			var realData = action.realData;
			var oldData = state.k_min_hour_data_day.allData;
			var newData = oldData.concat(realData);
			var time = [];
			var data = [];
			for (var i = 0; i < newData.length; i++) {
				let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];
				data[i] = arr;
				time.push(getLocalTimeDay(newData[i].datetime))
			}
			var endtime = newData[0].datetime
			var ma5 = calculateMA(newData, 5);
			var ma10 = calculateMA(newData, 10);
			var ma20 = calculateMA(newData, 20);
			return Object.assign({},state,{
				loading: false,	
  				chartType: '1',		
  				k_min_hour_data_day: {
  					allData: newData,
  					data: data,
			  		time: time,		//时间
			  		endtime: endtime,
			  		ma5: ma5,
			  		ma10: ma10,
			  		ma20: ma20,
                    isGetMore: state.k_min_hour_data_day.isGetMore
  				}
			})
			break;

        case Types.INSERT_TIME_REAL_DATA:
            var realData = action.realData;
            var oldData = state.time_min_hour_data.data;
            var oldTime = state.time_min_hour_data.time;
            if (!oldData.length) {
                return state
                break;
            }
            oldData.pop();
            var time = oldTime.concat(getLocalTime(realData.datetime));
            var data = oldData.concat(realData.close);
            return Object.assign({},state,{
                loading: false,
                chartType: 'time',
                time_min_hour_data: {
                    data: data,
                    time: time,		//时间
                }
            })
            break;
        case Types.INSERT_REAL_DATA:
            var realData = action.realData;
            var oldData = state.k_min_hour_data.allData;
            if (!oldData.length) {
                return state
                break;
			}
            oldData.pop();
            var newData = oldData.concat(realData);
            var time = [];
            var data = [];
            for (var i = 0; i < newData.length; i++) {
                let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];
                data[i] = arr;
                time.push(getLocalTime(newData[i].datetime))
            }
            var endtime = newData[0].datetime
            var ma5 = calculateMA(newData, 5);
            var ma10 = calculateMA(newData, 10);
            var ma20 = calculateMA(newData, 20);
            return Object.assign({},state,{
                loading: false,
                chartType: '1',
                k_min_hour_data: {
                    allData: newData,
                    data: data,
                    time: time,		//时间
                    endtime: endtime,
                    ma5: ma5,
                    ma10: ma10,
                    ma20: ma20,
                    isGetMore: state.k_min_hour_data.isGetMore
                }
            })
            break;
        case Types.INSERT_REAL_DATA_5:
            var realData = action.realData;
            var oldData = state.k_min_hour_data_5.allData;
            if (!oldData.length) {
                return state
                break;
            }
            oldData.pop();
            var newData = oldData.concat(realData);
            var time = [];
            var data = [];
            for (var i = 0; i < newData.length; i++) {
                let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];
                data[i] = arr;
                time.push(getLocalTime(newData[i].datetime))
            }
            var endtime = newData[0].datetime
            var ma5 = calculateMA(newData, 5);
            var ma10 = calculateMA(newData, 10);
            var ma20 = calculateMA(newData, 20);
            return Object.assign({},state,{
                loading: false,
                chartType: '1',
                k_min_hour_data_5: {
                    allData: newData,
                    data: data,
                    time: time,		//时间
                    endtime: endtime,
                    ma5: ma5,
                    ma10: ma10,
                    ma20: ma20,
                    isGetMore: state.k_min_hour_data_5.isGetMore
                }
            })
            break;
        case Types.INSERT_REAL_DATA_15:
            var realData = action.realData;
            var oldData = state.k_min_hour_data_15.allData;
            if (!oldData.length) {
                return state
                break;
            }
            oldData.pop();
            var newData = oldData.concat(realData);
            var time = [];
            var data = [];
            for (var i = 0; i < newData.length; i++) {
                let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];
                data[i] = arr;
                time.push(getLocalTime(newData[i].datetime))
            }
            var endtime = newData[0].datetime
            var ma5 = calculateMA(newData, 5);
            var ma10 = calculateMA(newData, 10);
            var ma20 = calculateMA(newData, 20);
            return Object.assign({},state,{
                loading: false,
                chartType: '1',
                k_min_hour_data_15: {
                    allData: newData,
                    data: data,
                    time: time,		//时间
                    endtime: endtime,
                    ma5: ma5,
                    ma10: ma10,
                    ma20: ma20,
                    isGetMore: state.k_min_hour_data_15.isGetMore
                }
            })
            break;
        case Types.INSERT_REAL_DATA_30:
            var realData = action.realData;
            var oldData = state.k_min_hour_data_30.allData;
            if (!oldData.length) {
                return state
                break;
            }
            oldData.pop();
            var newData = oldData.concat(realData);
            var time = [];
            var data = [];
            for (var i = 0; i < newData.length; i++) {
                let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];
                data[i] = arr;
                time.push(getLocalTime(newData[i].datetime))
            }
            var endtime = newData[0].datetime
            var ma5 = calculateMA(newData, 5);
            var ma10 = calculateMA(newData, 10);
            var ma20 = calculateMA(newData, 20);
            return Object.assign({},state,{
                loading: false,
                chartType: '1',
                k_min_hour_data_30: {
                    allData: newData,
                    data: data,
                    time: time,		//时间
                    endtime: endtime,
                    ma5: ma5,
                    ma10: ma10,
                    ma20: ma20,
                    isGetMore: state.k_min_hour_data_30.isGetMore
                }
            })
            break;
        case Types.INSERT_REAL_DATA_60:
            var realData = action.realData;
            var oldData = state.k_min_hour_data_60.allData;
            if (!oldData.length) {
                return state
                break;
            }
            oldData.pop();
            var newData = oldData.concat(realData);
            var time = [];
            var data = [];
            for (var i = 0; i < newData.length; i++) {
                let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];
                data[i] = arr;
                time.push(getLocalTime(newData[i].datetime))
            }
            var endtime = newData[0].datetime
            var ma5 = calculateMA(newData, 5);
            var ma10 = calculateMA(newData, 10);
            var ma20 = calculateMA(newData, 20);
            return Object.assign({},state,{
                loading: false,
                chartType: '1',
                k_min_hour_data_60: {
                    allData: newData,
                    data: data,
                    time: time,		//时间
                    endtime: endtime,
                    ma5: ma5,
                    ma10: ma10,
                    ma20: ma20,
                    isGetMore: state.k_min_hour_data_60.isGetMore
                }
            })
            break;
        case Types.INSERT_REAL_DATA_DAY:
            var realData = action.realData;
            var oldData = state.k_min_hour_data_day.allData;
            if (!oldData.length) {
                return state
                break;
            }
            oldData.pop();
            var newData = oldData.concat(realData);
            var time = [];
            var data = [];
            for (var i = 0; i < newData.length; i++) {
                let arr = [newData[i].open, newData[i].close, newData[i].low, newData[i].high];
                data[i] = arr;
                time.push(getLocalTimeDay(newData[i].datetime))
            }
            var endtime = newData[0].datetime
            var ma5 = calculateMA(newData, 5);
            var ma10 = calculateMA(newData, 10);
            var ma20 = calculateMA(newData, 20);
            return Object.assign({},state,{
                loading: false,
                chartType: '1',
                k_min_hour_data_day: {
                    allData: newData,
                    data: data,
                    time: time,		//时间
                    endtime: endtime,
                    ma5: ma5,
                    ma10: ma10,
                    ma20: ma20,
                    isGetMore: state.k_min_hour_data.isGetMore
                }
            })
            break;
		case Types.GET_NULL_DATA:
			return Object.assign({},state,{
				loading: false
			})
			break;
		case Types.K_LOADING: 
			return Object.assign({},state,{
				loading : true,
			})
			break;
		case Types.K_UNLOADING: 
			return Object.assign({},state,{
				loading : false
			})
			break;
		default:
			return state
	}
}


// MA
const calculateMA = (data, dayCount) => {
	var result = [];
	for (var i = 0; i < data.length; i++) {
		if (i<dayCount) {
			result.push('-');
			continue;
		}
		var sum = 0;
		for (var j = 0; j < dayCount; j++) {
			sum += data[i-j].close;
		}
		var res = (sum/dayCount).toFixed(4);
		result.push(res);
	}
	return result;
}

//时间
const add0 = (m) => {return m<10?'0'+m:m }
const getLocalTime = (nS) => {
    if (!nS) return '-';
    let time = new Date(parseInt(nS));
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    let dateStr = y+''+add0(m)+''+add0(d)+' '+add0(h)+':'+add0(mm)
    return dateStr;
  }