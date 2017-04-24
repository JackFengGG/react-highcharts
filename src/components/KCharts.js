import React from 'react';
import echarts from 'echarts';
import {calculateMA, getLocalTime} from '../common/tool'
import '../styles/kchart.less'

const stickColor1 = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
  offset: 0, color: 'red' // 0% 处的颜色
}, {
  offset: 0.5, color: 'white' // 50% 处的颜色
}, {
    offset: 1, color: 'red' // 100% 处的颜色
}], false);
const stickColor2 = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
  offset: 0, color: 'blue' // 0% 处的颜色
},  {
  offset: 0.5, color: 'white' // 50% 处的颜色
}, {
  offset: 1, color: 'blue' // 100% 处的颜色
}], false);
const seriesLineColor = ['#0d6d11', '#c50a0a', '#166dc0'];            //系列线颜色
const seriesBarColor  = ['rgb(192, 231, 140)', 'rgb(246, 100, 70)'];  //系列柱颜色
const stickLineColor      = [stickColor1, stickColor2];    //阴阳线颜色
const stickBarColor      = ['red', 'blue'];    //阴阳柱颜色
const borderColor     = '#eee';                                       //边线颜色



export default class KChart extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            historyData: props.reducerData.data,
            time: props.reducerData.time,
            ma5: props.reducerData.ma5,
            ma10: props.reducerData.ma10,
            ma20: props.reducerData.ma20,

            currentLength: 0,
            chartType: props.chartType,

            selectedIndex: props.reducerData.time.length - 1
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.drawKChart = this.drawKChart.bind(this);
    }

    componentDidMount() {

        this.state.currentLength = this.props.reducerData.ma5.length;

        this.kchart = echarts.init(this.refs.kchart);

        window.onresize = function() {
            this.kchart.resize();
        }.bind(this);
        this.drawKChart();

        //绑定键盘事件
        window.addEventListener('keydown', this.handleKeyDown);
    }

    //第一个判断是否切换按钮。第二个判断是否是实时刷新
    componentWillReceiveProps(props) {
        if(this.state.chartType !== props.chartType) {

            // this.setState({
                this.state.historyData = props.reducerData.data,
                this.state.time = props.reducerData.time,
                this.state.ma5 = props.reducerData.ma5,
                this.state.ma10 = props.reducerData.ma10,
                this.state.ma20 = props.reducerData.ma20,

                this.state.chartType = props.chartType,
                this.state.selectedIndex = props.reducerData.time.length - 1
            // });
            this.kchart.clear();
            this.drawKChart();
        }
        if (props.isChangeRealData&&props.isChangeKRealData) {
            // var k_lineData = JSON.parse(JSON.stringify(props.reducerData.allData));
            var kSeriesData = JSON.parse(JSON.stringify(props.reducerData.data));
            var ma5SeriesData = JSON.parse(JSON.stringify(props.reducerData.ma5));
            var ma10SeriesData = JSON.parse(JSON.stringify(props.reducerData.ma10));
            var ma20SeriesData = JSON.parse(JSON.stringify(props.reducerData.ma20));
            var xAxisTime = JSON.parse(JSON.stringify(props.reducerData.time))


            if (kSeriesData.length<50) {
                for (var i = kSeriesData.length; i < 50; i++) {
                    kSeriesData.push(['-','-','-','-'])
                    ma5SeriesData.push('-')
                    ma10SeriesData.push('-')
                    ma20SeriesData.push('-')
                    xAxisTime.push('')
                }
            }
            if (this.kchart) {
            let option = this.kchart.getOption();
            option.series[0].data = kSeriesData;
            option.series[1].data = ma5SeriesData;
            option.series[2].data = ma10SeriesData;
            option.series[3].data = ma20SeriesData;
            option.xAxis[0].data = xAxisTime;

            this.kchart.setOption(option);
            this.props.changeRealDataAction();

            let option0 = this.kchart.getOption();
            let min_maxArr = this.kchart.getModel().getComponent('yAxis', 0).axis.scale.getExtent();
            option0.yAxis[0].interval = (min_maxArr[1]-min_maxArr[0])/5;
            this.kchart.setOption(option0);
            }
        }
    }

    handleKeyDown = (e) => {

        var option = this.kchart.getOption();

        var startValue = option.dataZoom[0].startValue
        var endValue = option.dataZoom[0].endValue

        var start = option.dataZoom[0].start
        var end = option.dataZoom[0].end

        // console.log(startValue, endValue, endValue - startValue);
        if (e.keyCode == 38) {
            if ((endValue - startValue) >= 15) {
                option.dataZoom[0].start += 2;
                let min_maxArr = this.kchart.getModel().getComponent('yAxis', 0).axis.scale.getExtent()
                option.yAxis[0].interval = (min_maxArr[1]-min_maxArr[0])/5;
                this.kchart.setOption(option)
            }
        }else if (e.keyCode == 40) {
            if ((endValue - startValue) <= 1000 && (option.dataZoom[0].start > 0)) {


                if (startValue <= 30 && this.props.reducerData.isGetMore) {
                    this.props.action(this.props.reducerData.endtime)
                }else if (startValue > 30) {
                    this.props.isFetch();
                }

                let min_maxArr = this.kchart.getModel().getComponent('yAxis', 0).axis.scale.getExtent()
                option.yAxis[0].interval = (min_maxArr[1]-min_maxArr[0])/5;
                // if ((this.props.reducerData.ma5.length>0)&&(this.props.reducerData.ma5.length !== this.state.currentLength)) {
                //
                //     option.series[0].data = this.props.reducerData.data;
                //     option.series[1].data = this.props.reducerData.ma5;
                //     option.series[2].data = this.props.reducerData.ma10;
                //     option.series[3].data = this.props.reducerData.ma20;
                //
                //     option.xAxis[0].data = this.props.reducerData.time;
                //     this.state.currentLength = this.props.reducerData.ma5.length;
                // }

                option.dataZoom[0].start = (option.dataZoom[0].start-2>0) ? option.dataZoom[0].start-2 : 0;
                this.kchart.setOption(option)
            }
        }
    }

    drawKChart() {
        var kSeriesData = JSON.parse(JSON.stringify(this.state.historyData));
        var ma5SeriesData = JSON.parse(JSON.stringify(this.state.ma5));
        var ma10SeriesData = JSON.parse(JSON.stringify(this.state.ma10));
        var ma20SeriesData = JSON.parse(JSON.stringify(this.state.ma20));
        var xAxisTime = JSON.parse(JSON.stringify(this.state.time))
        // console.log('kSeriesData0----',kSeriesData.length);

        if (kSeriesData.length<50) {
            for (var i = kSeriesData.length; i < 50; i++) {
                kSeriesData.push(['-','-','-','-'])
                ma5SeriesData.push('-')
                ma10SeriesData.push('-')
                ma20SeriesData.push('-')
                xAxisTime.push('')
            }
        }

        
        //K线数据系列
        let kSeries = [
            {
                name: 'kchart',
                type: 'candlestick',
                itemStyle: {
                    normal: {
                        color: stickLineColor[1],
                        color0: stickLineColor[0],
                        borderColor: stickBarColor[1],
                        borderColor0: stickBarColor[0],
                    }
                },
                markPoint: {
                    label: {normal:{show: true}}
                },
                data: kSeriesData.map(function(item) { return [item[0], item[1], item[2], item[3]]; })
            }
        ];

        //sma数据系列
        let smaSeries = [
            {
                type: 'line',
                data: ma5SeriesData,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: seriesLineColor[0]
                    }
                },
                symbolSize: 0
            },
            {
                type: 'line',
                data: ma10SeriesData,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: seriesLineColor[1]
                    }
                },
                symbolSize: 0
            },
            {
                type: 'line',
                data: ma20SeriesData,
                lineStyle: {
                    normal: {
                        width: 1,
                        color: seriesLineColor[2]
                    }
                },
                symbolSize: 0
            },
        ]

        //K线图配置
        let kchartOptions = {
            animation: false,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                    axis: 'x',
                },

                formatter: function(params) {
                    if (params[0].name) {
                        var time  = params[0].name;
                        var kd    = params[0].data;
                        this.setState({selectedIndex: params[0].dataIndex});

                        var html  = time + '<br/>' +
                            '开盘: ' + kd[0] + '<br/>' +
                            '最高: ' + kd[3] + '<br/>' +
                            '最低: ' + kd[2] + '<br/>' +
                            '收盘: ' + kd[1] + '<br/>';
                        return html;
                    }
                }.bind(this)
            },
            grid: {
                left: 0,
                right: '8px',
                bottom: '0px',
                top: '8px',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: xAxisTime,
                scale: true,
                boundaryGap : true,
                // minInterval: '10px',
                axisLabel: {//刻度标签设置
                    show: true,
                    margin: 6,
                    // interval: function(index, value) {
                    //     if (index%10 == 0) {
                    //         return true
                    //     }else return false
                    // },
                    // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
                    formatter: function (value, index) {
                        // 格式化成月/日，只在第一个刻度显示年份
                        return value
                    },
                    textStyle: {
                        color: function (val) {
                            // return val >= 0 ? 'green' : 'red';
                            return 'white'
                        },
                        align: 'left'
                    }
                },
                axisTick: {//刻度设置
                    show: true,
                    alignWithLabel: true,
                    // interval: function(index, value) {
                    //     if (index%10 == 0) {
                    //         return true
                    //     }else return false
                    // },
                    lineStyle: {
                        color: 'red',
                        width: 0.5
                    }
                },
                axisLine: {//轴线设置
                    show: true,
                    onZero: false,
                    lineStyle: {
                        color: 'red'
                    }
                }
            },
            yAxis: {
                type: 'value',
                scale: true,
                position: 'right',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'red'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'red'
                    }
                },
                axisLabel: {
                    show: true,
                    margin: 8,
                    formatter : function(value,index){
                        var yValue = value.toFixed(4)
                        return yValue;
                    }
                },
            },
            dataZoom: [
                {
                    type: 'inside',
                    startValue: kSeriesData.length > 50 ?  kSeriesData.length - 50 : 0,
                    endValue: kSeriesData.length,
                    zoomLock: true

                }
            ],
            series: kSeries.concat(smaSeries)
        };
        this.kchart.setOption(kchartOptions, true);

        var option0 = this.kchart.getOption();
        let min_maxArr = this.kchart.getModel().getComponent('yAxis', 0).axis.scale.getExtent()
        option0.yAxis[0].interval = (min_maxArr[1]-min_maxArr[0])/5;
        this.kchart.setOption(option0);

        this.kchart.on('dataZoom',(params) => {
            var option = this.kchart.getOption();
            let min_maxArr = this.kchart.getModel().getComponent('yAxis', 0).axis.scale.getExtent();
            option.yAxis[0].interval = (min_maxArr[1]-min_maxArr[0])/5;
            //是否请求更多数据
            if ((option.dataZoom[0].startValue <= 30)&&this.props.reducerData.isGetMore) {
                this.props.action(this.props.reducerData.endtime)
            }else if(option.dataZoom[0].startValue > 30) {
                this.props.isFetch();
            }

            if ((this.props.reducerData.ma5.length>0)&&(this.props.reducerData.ma5.length !== this.state.currentLength)) {

                var sex = this.props.reducerData.ma5.length - this.state.currentLength;

                option.series[0].data = this.props.reducerData.data;
                option.series[1].data = this.props.reducerData.ma5;
                option.series[2].data = this.props.reducerData.ma10;
                option.series[3].data = this.props.reducerData.ma20;

                option.xAxis[0].data = this.props.reducerData.time;

                option.dataZoom[0].start = (option.dataZoom[0].startValue + sex)/this.props.reducerData.data.length*100;
                option.dataZoom[0].end = (option.dataZoom[0].endValue + sex)/this.props.reducerData.data.length*100;

                this.kchart.setOption(option);

                this.state.currentLength = this.props.reducerData.ma5.length;
            }else {
                this.kchart.setOption(option);
            }

        })

        this.kchart.getZr().on('mousewheel',(params) => {
            // console.log(params);
        })
    }


    render() {

        // console.log('render----sub');

        return (
            <div className="kchart">
                <div className="indicator-vals">
                    <span>SMA5={this.props.reducerData.ma5[this.state.selectedIndex]}</span>
                    <span>SMA10={this.props.reducerData.ma10[this.state.selectedIndex]}</span>
                    <span>SMA20={this.props.reducerData.ma20[this.state.selectedIndex]}</span>
                </div>

                <div className="k-chart" ref="kchart"></div>
            </div>
        );
    }
}

