import React , { Component } from 'react';
import '../styles/goodsCell.less'

export default class GoodsCell extends Component {
	constructor(props) {
	  super(props);
	
	 	this.state = {
	  	realData: {
	  		askPrice: props.realData.askPrice,		//买档
	  		bidPrice: props.realData.bidPrice,		//卖档
		  	askQty: props.realData.askQty,			//买量
		  	bidQty: props.realData.bidQty,			//卖量
	  		lastPrice: props.realData.lastPrice,		//最新价
	  		lastVolume: props.realData.lastVolume,		//现手
	  		lowPrice: props.realData.lowPrice,		//最低价
            highPrice: props.realData.highPrice,	//最高价
	  		openingPrice: props.realData.openingPrice,	//开盘价
	  		positionVolume: props.realData.positionVolume,	//持仓量
	  		preClosingPrice: props.realData.preClosingPrice,	//昨收盘
	  		prePositionVolume: props.realData.prePositionVolume,//昨持仓
	  		preSettlePrice: props.realData.preSettlePrice,	//昨结算
	  	},
	  	lastPriceFontColor: '',
	  	askPriceFontColor: '',
	  	bidPriceFontColor: '',

	  	// lastVolume
	  };

	}

	componentWillReceiveProps(props) {
		if (props.goodsData.productCode == props.realData_all.productCode) {
			if (props.realData_all.data.lastPrice > props.realData_all.data.preClosingPrice) {
				this.state.lastPriceFontColor = 'red'
			}else if (props.realData_all.data.lastPrice == props.realData_all.data.preClosingPrice) {
				this.state.lastPriceFontColor = 'white'
			}else {this.state.lastPriceFontColor = 'green'}

			if (props.realData_all.data.askPrice[0] > props.realData_all.data.preClosingPrice) {
				this.state.askPriceFontColor = 'red'
			}else if (props.realData_all.data.askPrice[0] == props.realData_all.data.preClosingPrice) {
				this.state.askPriceFontColor = 'white'
			}else {this.state.askPriceFontColor = 'green'}

			if (props.realData_all.data.bidPrice[0] > props.realData_all.data.preClosingPrice) {
				this.state.bidPriceFontColor = 'red'
			}else if (props.realData_all.data.bidPrice[0] == props.realData_all.data.preClosingPrice) {
				this.state.bidPriceFontColor = 'white'
			}else {this.state.bidPriceFontColor = 'green'}

			this.state.realData = {
		  		askPrice: props.realData_all.data.askPrice,		//买档
		  		bidPrice: props.realData_all.data.bidPrice,		//卖档
		  		askQty: props.realData_all.data.askQty,			//买量
		  		bidQty: props.realData_all.data.bidQty,			//卖量
		  		lastPrice: props.realData_all.data.lastPrice,		//最新价
		  		lastVolume: props.realData_all.data.lastVolume,		//现手
		  		lowPrice: props.realData_all.data.lowPrice,		//最低价
                highPrice: props.realData_all.data.highPrice,	//最高价
		  		openingPrice: props.realData_all.data.openingPrice,	//开盘价
		  		positionVolume: props.realData_all.data.positionVolume,	//持仓量
		  		preClosingPrice: props.realData_all.data.preClosingPrice,	//昨收盘
		  		prePositionVolume: props.realData_all.data.prePositionVolume,//昨持仓
		  		preSettlePrice: props.realData_all.data.preSettlePrice,	//昨结算
		  	}
		}
	}

	render () {

		const { goodsData } = this.props;
		
		var upAndDown = '--', rate = '--';
		if ((this.state.realData.lastPrice != '--')&&(this.state.realData.preClosingPrice != '--')) {
			upAndDown = (this.state.realData.lastPrice - this.state.realData.preClosingPrice).toFixed(4);
			rate = (upAndDown/this.state.realData.preClosingPrice*100).toFixed(2) + '%';
		}

		return (
			<nav id="cell-nav" onClick = {this.props.action}>
					<ul>
						<li>{goodsData.productName}</li>
						<li>{goodsData.productCode}</li>
						<li>{this.state.realData.lastVolume}</li>
						<li className = {this.state.lastPriceFontColor} >{this.state.realData.lastPrice}</li>
						<li className = {this.state.askPriceFontColor} >{this.state.realData.askPrice[0]}</li>
						<li className = {this.state.bidPriceFontColor} >{this.state.realData.bidPrice[0]}</li>
						<li>{this.state.realData.askQty[0]}</li>
						<li>{this.state.realData.bidQty[0]}</li>
						<li className = {this.state.lastPriceFontColor}>{upAndDown}</li>
						<li className = {this.state.lastPriceFontColor}>{rate}</li>
						<li>{this.state.realData.positionVolume}</li>
						<li>{this.state.realData.openingPrice}</li>
						<li>{this.state.realData.highPrice}</li>
						<li>{this.state.realData.lowPrice}</li>
						<li>{this.state.realData.preSettlePrice}</li>
						<li>{this.state.realData.preClosingPrice}</li>
					</ul>
				</nav>
		)
	}
}
