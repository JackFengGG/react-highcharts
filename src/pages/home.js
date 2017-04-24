import React , { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '../components/loading';
import ResDetail from "../components/ResDetail";
import KChart from '../components/KCharts';
import TimeChart from '../components/TimeChart';

import '../styles/home.less';
import *as klineActions from '../js/actions/k_lineAcion';
import {getLocalTimeSS} from '../common/tool'

class Home extends Component {
	constructor(props) {
	  super(props);
		this.state = {
			isFetchMoreData: true,
			chartType: '1',
			kcharts: null,
			timeCharts: null,
			error: null,
            nextRealDate: 0,
            nextRealDate_last: 0,
			realK_lineData: {
				datetime: 0,
				high: 0,
				low: 0,
				open: 0,
				close: 0
			},
            nextData: {
                datetime: 0,
                high: 0,
                low: 0,
                open: 0,
                close: 0
            },
			realData: {
		  		askPrice: ['--'],		//买档
		  		bidPrice: ['--'],		//卖档
			  	askQty: ['--'],			//买量
			  	bidQty: ['--'],			//卖量
		  		lastPrice: '--',		//最新价
		  		lastVolume: '--',		//现手
                highPrice: '--',		//最高价
		  		lowPrice: '--',		//最低价
		  		openingPrice: '--',	//开盘价
		  		positionVolume: '--',	//持仓量
		  		preClosingPrice: '--',	//昨收盘
		  		prePositionVolume: '--',//昨持仓
		  		preSettlePrice: '--',	//昨结算
		  	},
			isAddRealData: true,
			isChangeRealData: false,
			isChangeKRealData: false,
			websocket: null,
			productCode: props.location.query.productCode,
            productName: props.location.query.productName
		};
		this.fetchRealTimeData = this.fetchRealTimeData.bind(this);
		this.getRealtimeData = this.getRealtimeData.bind(this);
		this.onKChartTypeChange = this.onKChartTypeChange.bind(this);
		this.fetchMoreData = this.fetchMoreData.bind(this);
		this.changeFetchState = this.changeFetchState.bind(this);
		this.changeRealDataFalse = this.changeRealDataFalse.bind(this);
	}

	componentDidMount() {

		this.props.klineActions.queryK_LineData('1', this.state.productCode);

		this.fetchRealTimeData();
	}

	componentWillUnmount() {
	 	this.state.websocket.close();
	}
    //139.196.164.181:888/market_professionalV2.1/message/public
	fetchRealTimeData() {
		var that = this
        if ('WebSocket' in window) {
            if (window.location.protocol == 'http:') {
                this.state.websocket = new WebSocket("ws://139.196.164.181:888/market_professionalV2.1/message/public");
            } else {
                this.state.websocket = new WebSocket("wss://139.196.164.181:888/market_professionalV2.1/message/public");
            }
        } else if ('MozWebSocket' in window) {
            if (window.location.protocol == 'http:') {
                this.state.websocket = new MozWebSocket("ws://139.196.164.181:888/market_professionalV2.1/message/public");
            } else {
                this.state.websocket = new MozWebSocket("wss://139.196.164.181:888/market_professionalV2.1/message/public");
            }
        } else {
            this.state.this.state.websocket = new SockJS("139.196.164.181:888/market_professionalV2.1/sockjs/message/public");
        }
        this.state.websocket.onopen = function (event) {

        };
        this.state.websocket.onmessage = function (event) {
        	var realData_all = JSON.parse(event.data);
        	if (that.props.get_k_line_Reducer.k_min_hour_data.allData.length && (that.state.productCode == realData_all.productCode)) {
        		that.getRealtimeData(JSON.parse(event.data));
        	}
        };
        this.state.websocket.onerror = function (event) {
        };
        this.state.websocket.onclose = function (event) {
        };
	}

	//初始化时间---数据
    originalData = (realData,sexTime) => {
        this.state.realK_lineData.open = realData.lastPrice
        this.state.realK_lineData.close = realData.lastPrice
        this.state.realK_lineData.high = realData.lastPrice
        this.state.realK_lineData.low = realData.lastPrice
        this.state.realK_lineData.datetime = realData.timestamp + sexTime-60*1000

        this.state.realData = realData;

        var reducerData = {};
        switch(this.state.chartType) {
            case '1':
                this.state.nextRealDate = realData.timestamp + sexTime;
                reducerData = this.props.get_k_line_Reducer.k_min_hour_data
                break;
            case '5':
                this.state.nextRealDate = realData.timestamp + sexTime + 60*4*1000;
                reducerData = this.props.get_k_line_Reducer.k_min_hour_data_5
                break;
            case '15':
                this.state.nextRealDate = realData.timestamp + sexTime + 60*14*1000;
                reducerData = this.props.get_k_line_Reducer.k_min_hour_data_15
                break;
            case '30':
                this.state.nextRealDate = realData.timestamp + sexTime + 60*29*1000;
                reducerData = this.props.get_k_line_Reducer.k_min_hour_data_30
                break;
            case '60':
                this.state.nextRealDate = realData.timestamp + sexTime + 60*59*1000;
                reducerData = this.props.get_k_line_Reducer.k_min_hour_data_60
                break;
            case '1440':
                this.state.nextRealDate = realData.timestamp + sexTime + 60*1439*1000;
                reducerData = this.props.get_k_line_Reducer.k_min_hour_data_day
                break;
            default:
                this.state.nextRealDate = realData.timestamp + sexTime + 60*4*1000;
                reducerData = this.props.get_k_line_Reducer.k_min_hour_data
        }

        if (this.state.isAddRealData) {
            var k_lineData = JSON.parse(JSON.stringify(reducerData.allData));
            var lastArr =  k_lineData.pop();
            this.state.realK_lineData.open = lastArr.open;
            this.state.realK_lineData.high = (this.state.realK_lineData.high < lastArr.high) ? lastArr.high : this.state.realK_lineData.high;
            this.state.realK_lineData.low = (this.state.realK_lineData.low > lastArr.low) ? lastArr.low : this.state.realK_lineData.low;
        }
        this.state.isChangeRealData = true;
		this.state.isChangeKRealData = true;
    }

	getRealtimeData(data) {
		var realData = data.data;

		var sexTime = 60*1000 - realData.timestamp%60000;

		if (this.state.realK_lineData.open == 0) {
			this.originalData(realData,sexTime);
		}

		if ((this.state.realK_lineData.low > realData.lastPrice)||(this.state.realK_lineData.high < realData.lastPrice)||(this.state.realK_lineData.close != realData.lastPrice)) {

			if (this.state.realK_lineData.low > realData.lastPrice) { this.state.realK_lineData.low = realData.lastPrice }

			if (this.state.realK_lineData.high < realData.lastPrice) { this.state.realK_lineData.high = realData.lastPrice }

			if (this.state.realK_lineData.close != realData.lastPrice) { this.state.realK_lineData.close = realData.lastPrice }

			this.state.isChangeRealData = true
            this.state.isChangeKRealData = true;
		}else if (this.state.nextRealDate <= realData.timestamp) {
			this.state.isChangeRealData = true;
            this.state.isChangeKRealData = true;
		}else if(this.state.realData != realData) {
		    this.state.realData = realData;
            this.state.isChangeRealData = true;
            this.state.isChangeKRealData = false;
        }

		if (this.state.isChangeRealData) {
			if (this.state.nextRealDate < realData.timestamp) {
				this.state.isAddRealData = false;
				this.state.realK_lineData =  {
				    datetime: realData.timestamp,
					high: realData.lastPrice,
					low: realData.lastPrice,
					open: realData.lastPrice,
					close: realData.lastPrice
				}

                this.props.klineActions.addRealTimeData(this.state.realK_lineData, this.state.chartType);
                this.state.realK_lineData =  {
                    datetime: 0,
                    high: 0,
                    low: 0,
                    open: 0,
                    close: 0
                }
			}else {
                this.state.isAddRealData = true;
                this.props.klineActions.insertRealTimeData(this.state.realK_lineData, this.state.chartType);
			}
		}
	}

	onKChartTypeChange(type) {
		this.setState({chartType: type}, () => {
			this.props.klineActions.queryK_LineData(type, this.state.productCode);
		});
	}

	fetchMoreData(endtime) {
		this.state.isFetchMoreData&&this.props.klineActions.queryMoreK_lineData(this.state.chartType, endtime, this.state.productCode);
		this.state.isFetchMoreData = false;
	}

	changeRealDataFalse() {
		this.state.isChangeRealData = false;
	}

	changeFetchState() {
		this.state.isFetchMoreData = true;
	}

	render () {
		var content;

		//loading问题
		let loading = this.props.get_k_line_Reducer.loading

		if (loading) {
			content = <Loading />
		}else if (this.state.chartType == 'time') {
			content = <TimeChart reducerData = {this.props.get_k_line_Reducer.time_min_hour_data}/>;
		}else {
			var reducerData = {};

			switch(this.state.chartType) {
		        case '1': 
		        	reducerData = this.props.get_k_line_Reducer.k_min_hour_data
		            break;
		        case '5': 
		        	reducerData = this.props.get_k_line_Reducer.k_min_hour_data_5
		        	break;
		        case '15': 
		        	reducerData = this.props.get_k_line_Reducer.k_min_hour_data_15
		            break;
		        case '30': 
		        	reducerData = this.props.get_k_line_Reducer.k_min_hour_data_30
		            break;
		        case '60': 
		        	reducerData = this.props.get_k_line_Reducer.k_min_hour_data_60
		            break;
		        case '1440': 
		        	reducerData = this.props.get_k_line_Reducer.k_min_hour_data_day
		            break;
		        default:
		        	reducerData = this.props.get_k_line_Reducer.k_min_hour_data
			    }

			content = <KChart reducerData = {reducerData} chartType = {this.state.chartType} action = {this.fetchMoreData} isFetch = {this.changeFetchState} isChangeRealData = {this.state.isChangeRealData} isChangeKRealData = {
                this.state.isChangeKRealData} changeRealDataAction = {this.changeRealDataFalse} realK_lineData = {this.state.realK_lineData} isAddRealData = {this.state.isAddRealData}/>
		}

		return (
			<div className="k-chart-page" style= {{display: 'flex',flex: 1}}>
				<div className="k-line-container">
					<div className="k-line-page">
						<nav id="nav">
							<ul>
								<li
									className={this.state.chartType == 'time' ? "active" : ""}
									onClick={this.onKChartTypeChange.bind(this, 'time')}>
									分时
								</li>
								<li
									className={this.state.chartType == '1' ? "active" : ""}
									onClick={this.onKChartTypeChange.bind(this, '1')}>
									1分
								</li>
								<li
									className={this.state.chartType == '5' ? "active" : ""}
									onClick={this.onKChartTypeChange.bind(this, '5')}>
									5分
								</li>
								<li
									className={this.state.chartType == '15' ? "active" : ""}
									onClick={this.onKChartTypeChange.bind(this, '15')}>
									15分
								</li>
								<li
									className={this.state.chartType == '30' ? "active" : ""}
									onClick={this.onKChartTypeChange.bind(this, '30')}>
									30分
								</li>
								<li
									className={this.state.chartType == '60' ? "active" : ""}
									onClick={this.onKChartTypeChange.bind(this, '60')}>
									60分
								</li>
								<li
									className={this.state.chartType == '1440' ? "active" : ""}
									onClick={this.onKChartTypeChange.bind(this, '1440')}>
									日线
								</li>
							</ul>
						</nav>
						{content}
					</div>
					<div className="trade-page">
						<ResDetail realData = {this.state.realData} productCode = {this.state.productCode} productName = {this.state.productName}/>
					</div>
					
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const {get_k_line_Reducer, goodsReducer} = state;
	return {
		get_k_line_Reducer,
		goodsReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		klineActions: bindActionCreators(klineActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
