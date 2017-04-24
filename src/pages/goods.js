import React , { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Link, hashHistory} from 'react-router';


import *as goodsActions from '../js/actions/goodsAction';
import GoodsCell from '../components/goodsCell';
import Loading from '../components/loading';
import '../styles/goods.less';



class Goods extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	websocket: null,
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
	  	realData_all: {},
		  isPushNext: false
	  };
	  this.pushGoodsLineView = this.pushGoodsLineView.bind(this);
	  this.fetchRealTimeData = this.fetchRealTimeData.bind(this);
	  this.setRealData_all = this.setRealData_all.bind(this);
	  this.rednerGoodsCell = this.rednerGoodsCell.bind(this);
	}

	componentDidMount() {
	  this.props.goodsActions.queryGoodsData();

	  this.fetchRealTimeData();
	}

	pushGoodsLineView(data){

		this.state.isPushNext = true;
		this.state.websocket.close();
		// this.props.goodsActions.saveProductCode(data.productCode);

		hashHistory.push({
			pathname : '/home',
			query:{
				productCode: data.productCode,
                productName: data.productName
			}
		});
	}

	fetchRealTimeData() {
		var that = this
        if ('WebSocket' in window) {
            if (window.location.protocol == 'http:') {
                this.state.websocket = new WebSocket("ws://120.26.164.246:888/marketProfessional/message/public");
            } else {
                this.state.websocket = new WebSocket("wss://120.26.164.246:888/marketProfessional/message/public");
            }
        } else if ('MozWebSocket' in window) {
            if (window.location.protocol == 'http:') {
                this.state.websocket = new MozWebSocket("ws://120.26.164.246:888/marketProfessional/message/public");
            } else {
                this.state.websocket = new MozWebSocket("wss://120.26.164.246:888/marketProfessional/message/public");
            }
        } else {
            this.state.websocket = new SockJS("120.26.164.246:888/marketProfessional/sockjs/message/public");
        }
        this.state.websocket.onopen = function (event) {
        	console.log('websocket.onopen')
        };
        this.state.websocket.onmessage = function (event) {
        	that.props.goodsReducer.goodsData.length&&that.setRealData_all(JSON.parse(event.data));
        };
        this.state.websocket.onerror = function (event) {
        	console.log('websocket.onerror')
        };
        this.state.websocket.onclose = function (event) {
        	console.log('websocket.onclose')
			!(that.state.isPushNext)&&that.fetchRealTimeData();
        };
	}

	setRealData_all(realData_all) {
		if (this.state.realData_all != realData_all) {
			this.setState({
				realData_all: realData_all
			});
		}
	}

	rednerGoodsCell() {
		return this.props.goodsReducer.goodsData.results.map((data, index) => {
			// var realData = '';
			// if (data.productCode == this.state.realData.productCode) {
			// 	console.log('---',this.state.realData);
			// 	// this.state.realData = data
			// }

			return <GoodsCell key = {index} goodsData = {data} action = {this.pushGoodsLineView.bind(this, data)} realData = {this.state.realData} realData_all = {this.state.realData_all}/>
		})
	}

	render() {

		var content;
		let loading = this.props.goodsReducer.loading

		if (loading) {
			content = <Loading />
		}else{
			content = this.rednerGoodsCell()
		}

		return(
			<div className="">
				<nav id="nav">
					<ul>
						<li>品种名称</li>
						<li>合约代码</li>
						<li>现手</li>
						<li>最新</li>
						<li>买价</li>
						<li>卖价</li>
						<li>买量</li>
						<li>卖量</li>
						<li>涨跌</li>
						<li>涨幅</li>
						<li>持仓量</li>
						<li>开盘</li>
						<li>最高</li>
						<li>最低</li>
						<li>昨结算</li>
						<li>昨收</li>
					</ul>
				</nav>
				
				{content}
			</div>
		)
	}
}

function mapStateToProps(state) {
	const {goodsReducer} = state;
	console.log('mapStateToProps-----',goodsReducer);
	return {
		goodsReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		goodsActions: bindActionCreators(goodsActions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Goods);