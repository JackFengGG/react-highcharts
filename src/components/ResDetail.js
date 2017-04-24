import React from 'react';
import '../styles/resDetail.less'

export default class ResDetail extends React.Component {
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
            askPriceFontColor0: '',
            askPriceFontColor1: '',
            askPriceFontColor2: '',
            askPriceFontColor3: '',
            askPriceFontColor4: '',
            bidPriceFontColor0: '',
            bidPriceFontColor1: '',
            bidPriceFontColor2: '',
            bidPriceFontColor3: '',
            bidPriceFontColor4: '',
        }
    }
    componentWillReceiveProps(props) {
        if (props.realData.lastPrice > props.realData.preClosingPrice) {
            this.state.lastPriceFontColor = 'red'
        }else if (props.realData.lastPrice == props.realData.preClosingPrice) {
            this.state.lastPriceFontColor = 'white'
        }else {this.state.lastPriceFontColor = 'green'}

        if (props.realData.askPrice[0] > props.realData.preClosingPrice) {
            this.state.askPriceFontColor0 = 'red'
        }else if (props.realData.askPrice[0] == props.realData.preClosingPrice) {
            this.state.askPriceFontColor0 = 'white'
        }else {this.state.askPriceFontColor0 = 'green'}
        if (props.realData.askPrice[1] > props.realData.preClosingPrice) {
            this.state.askPriceFontColor1 = 'red'
        }else if (props.realData.askPrice[1] == props.realData.preClosingPrice) {
            this.state.askPriceFontColor1 = 'white'
        }else {this.state.askPriceFontColor1 = 'green'}
        if (props.realData.askPrice[2] > props.realData.preClosingPrice) {
            this.state.askPriceFontColor2 = 'red'
        }else if (props.realData.askPrice[2] == props.realData.preClosingPrice) {
            this.state.askPriceFontColor2 = 'white'
        }else {this.state.askPriceFontColor2 = 'green'}
        if (props.realData.askPrice[3] > props.realData.preClosingPrice) {
            this.state.askPriceFontColor3 = 'red'
        }else if (props.realData.askPrice[3] == props.realData.preClosingPrice) {
            this.state.askPriceFontColor3 = 'white'
        }else {this.state.askPriceFontColor3 = 'green'}
        if (props.realData.askPrice[4] > props.realData.preClosingPrice) {
            this.state.askPriceFontColor4 = 'red'
        }else if (props.realData.askPrice[4] == props.realData.preClosingPrice) {
            this.state.askPriceFontColor4 = 'white'
        }else {this.state.askPriceFontColor4 = 'green'}

        if (props.realData.bidPrice[0] > props.realData.preClosingPrice) {
            this.state.bidPriceFontColor0 = 'red'
        }else if (props.realData.bidPrice[0] == props.realData.preClosingPrice) {
            this.state.bidPriceFontColor0 = 'white'
        }else {this.state.bidPriceFontColor0 = 'green'}
        if (props.realData.bidPrice[1] > props.realData.preClosingPrice) {
            this.state.bidPriceFontColor1 = 'red'
        }else if (props.realData.bidPrice[1] == props.realData.preClosingPrice) {
            this.state.bidPriceFontColor1 = 'white'
        }else {this.state.bidPriceFontColor1 = 'green'}
        if (props.realData.bidPrice[2] > props.realData.preClosingPrice) {
            this.state.bidPriceFontColor2 = 'red'
        }else if (props.realData.bidPrice[2] == props.realData.preClosingPrice) {
            this.state.bidPriceFontColor2 = 'white'
        }else {this.state.bidPriceFontColor2 = 'green'}
        if (props.realData.bidPrice[3] > props.realData.preClosingPrice) {
            this.state.bidPriceFontColor3 = 'red'
        }else if (props.realData.bidPrice[3] == props.realData.preClosingPrice) {
            this.state.bidPriceFontColor3 = 'white'
        }else {this.state.bidPriceFontColor3 = 'green'}
        if (props.realData.bidPrice[4] > props.realData.preClosingPrice) {
            this.state.bidPriceFontColor4 = 'red'
        }else if (props.realData.bidPrice[4] == props.realData.preClosingPrice) {
            this.state.bidPriceFontColor4 = 'white'
        }else {this.state.bidPriceFontColor4 = 'green'}

        if (this.state.realData != props.realData) {
            this.state.realData = props.realData;
        }
    }

	render() {
        var upAndDown = '--', rate = '--';
        var askprice0 = '--', askprice1 = '--', askprice2 = '--', askprice3 = '--', askprice4 = '--';
        var bidprice0 = '--', bidprice1 = '--', bidprice2 = '--', bidprice3 = '--', bidprice4 = '--';
        var askQty0 = '--', askQty1 = '--', askQty2 = '--', askQty3 = '--', askQty4 = '--';
        var bidQty0 = '--', bidQty1 = '--', bidQty2 = '--', bidQty3 = '--', bidQty4 = '--';
        if ((this.state.realData.lastPrice != '--')&&(this.state.realData.preClosingPrice != '--')) {
            upAndDown = (this.state.realData.lastPrice - this.state.realData.preClosingPrice).toFixed(4);
            rate = (upAndDown/this.state.realData.preClosingPrice*100).toFixed(2) + '%';
            askprice0 = this.state.realData.askPrice[0];
            askprice1 = this.state.realData.askPrice[1];
            askprice2 = this.state.realData.askPrice[2];
            askprice3 = this.state.realData.askPrice[3];
            askprice4 = this.state.realData.askPrice[4];
            askQty0 = this.state.realData.askQty[0];
            askQty1 = this.state.realData.askQty[1];
            askQty2 = this.state.realData.askQty[2];
            askQty3 = this.state.realData.askQty[3];
            askQty4 = this.state.realData.askQty[4];

            bidprice0 = this.state.realData.bidPrice[0];
            bidprice1 = this.state.realData.bidPrice[1];
            bidprice2 = this.state.realData.bidPrice[2];
            bidprice3 = this.state.realData.bidPrice[3];
            bidprice4 = this.state.realData.bidPrice[4];
            bidQty0 = this.state.realData.bidQty[0];
            bidQty1 = this.state.realData.bidQty[1];
            bidQty2 = this.state.realData.bidQty[2];
            bidQty3 = this.state.realData.bidQty[3];
            bidQty4 = this.state.realData.bidQty[4];
        }

		return(
			<div className="resDetail-container">
                <div className="resDetail-subView">
                    <span className="resDetail-span">{this.props.productName}</span>
                    <span className="resDetail-span">{this.props.productCode}</span>
                </div>
                <div className="resDetail-subView">
                    <TeadeCell title="卖五" count={askprice4} num={askQty4} color={this.state.askPriceFontColor4}/>
                    <TeadeCell title="卖四" count={askprice3} num={askQty3} color={this.state.askPriceFontColor3}/>
                    <TeadeCell title="卖三" count={askprice2} num={askQty2} color={this.state.askPriceFontColor2}/>
                    <TeadeCell title="卖二" count={askprice1} num={askQty1} color={this.state.askPriceFontColor1}/>
                    <TeadeCell title="卖一" count={askprice0} num={askQty0} color={this.state.askPriceFontColor0}/>
                </div>
                <div className="resDetail-subView">
                    <TeadeCell title="买一" count={bidprice0} num={bidQty0} color={this.state.bidPriceFontColor0}/>
                    <TeadeCell title="买二" count={bidprice1} num={bidQty1} color={this.state.bidPriceFontColor1}/>
                    <TeadeCell title="买三" count={bidprice2} num={bidQty2} color={this.state.bidPriceFontColor2}/>
                    <TeadeCell title="买四" count={bidprice3} num={bidQty3} color={this.state.bidPriceFontColor3}/>
                    <TeadeCell title="买五" count={bidprice4} num={bidQty4} color={this.state.bidPriceFontColor4}/>
                </div>
                <div className="resDetail-subView-container">
                    <div className="resDetail-subView-container-sub">
                        <div className="resDetail-subView-container-sub-cell">
                            <span className="resDetail-tradeCell-span1">最新</span>
                            <span className="resDetail-tradeCell-span3" style={{color: this.state.lastPriceFontColor}}>{this.state.realData.lastPrice}</span>
                        </div>
                        <div className="resDetail-subView-container-sub-cell">
                            <span className="resDetail-tradeCell-span1">现手</span>
                            <span className="resDetail-tradeCell-span3">{this.state.realData.lastVolume}</span>
                        </div>
                        <div className="resDetail-subView-container-sub-cell">
                            <span className="resDetail-tradeCell-span1">持仓</span>
                            <span className="resDetail-tradeCell-span3">{this.state.realData.positionVolume}</span>
                        </div>
                        <div className="resDetail-subView-container-sub-cell">
                            <span className="resDetail-tradeCell-span1">日增</span>
                            <span className="resDetail-tradeCell-span3" style={{color: this.state.lastPriceFontColor}}>{upAndDown}</span>
                        </div>
                        <div className="resDetail-subView-container-sub-cell">
                            <span className="resDetail-tradeCell-span1">涨跌</span>
                            <span className="resDetail-tradeCell-span3" style={{color: this.state.lastPriceFontColor}}>{rate}</span>
                        </div>
                    </div>
                    <div className="resDetail-subView-container-sub">
                        <div className="resDetail-subView-container-sub-cell">
                            <span className="resDetail-tradeCell-span1">开盘</span>
                            <span className="resDetail-tradeCell-span3">{this.state.realData.openingPrice}</span>
                        </div>
                        <div className="resDetail-subView-container-sub-cell">
                            <span className="resDetail-tradeCell-span1">最高</span>
                            <span className="resDetail-tradeCell-span3">{this.state.realData.highPrice}</span>
                        </div>
                        <div className="resDetail-subView-container-sub-cell">
                            <span className="resDetail-tradeCell-span1">最低</span>
                            <span className="resDetail-tradeCell-span3">{this.state.realData.lowPrice}</span>
                        </div>
                        <div className="resDetail-subView-container-sub-cell">
                            <span className="resDetail-tradeCell-span1">昨收</span>
                            <span className="resDetail-tradeCell-span3">{this.state.realData.preClosingPrice}</span>
                        </div>
                        <div className="resDetail-subView-container-sub-cell">
                            <span className="resDetail-tradeCell-span1">昨结</span>
                            <span className="resDetail-tradeCell-span3">{this.state.realData.preSettlePrice}</span>
                        </div>
                    </div>
                </div>
			</div>
		)
	}
}

class TeadeCell extends React.Component {

	render() {
	    const {title, count, num} = this.props;
		return(
		    <div className="resDetail-tradeCell">
                <span className="resDetail-tradeCell-span1" style={{width:'20%'}}>{title}</span>
                <span className="resDetail-tradeCell-span2" style={{color: this.props.color,width:'50%'}}>{count}</span>
                <span className="resDetail-tradeCell-span3" style={{width:'20%'}}>{num}</span>
            </div>
		)
	}
}


const styles = {
	container: {
		height: '100%',
		border: '1px solid red'
	},
	titleFont: {
		color: 'white',
		fontSize: '20',
		textAlign: 'left',
		padding: '2px',
		margin: '0px',
		borderBottom: '1px solid red',
	},
	tradeCellView: {
		display: 'flex',
		borderBottom: '1px solid red',
		width: '100%',
		padding: '3px',
		color: 'white',
		flexDirection: 'row'
	},
	dateCell: {
		display: 'flex',
		borderBottom: '1px solid red',
		width: '100%',
		padding: '3px',
		color: 'white',
		flexDirection: 'row',
		textAlign: 'right',
	}



}