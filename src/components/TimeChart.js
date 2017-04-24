import React from 'react';
import echarts from 'echarts';
import {ONE_DAT_MIN_TIME} from '../js/constants'
import '../styles/timechart.less';

const seriesLineColor = ['#fda729', '#a5a5a5', '#38b6fc'];

export default class TimeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.reducerData.data
        };
        this.drawTimeChart = this.drawTimeChart.bind(this);
    }

    componentDidMount() {
        this.tchart = echarts.init(this.refs.tchart);

        window.onresize = function() {
            this.tchart.resize();
        }.bind(this);

        this.drawTimeChart();
    }

    componentWillReceiveProps(props) {
        if(this.state.data !== props.reducerData.data) {
            this.state.data = props.reducerData.data;
            var option = this.tchart.getOption();
            option.series[0].data = this.state.data;
            this.tchart.setOption(option);
        }
    }

    drawTimeChart() {
        let data = this.state.data;
        for (var i = data.length; i <= ONE_DAT_MIN_TIME.length; i++) {
            data.push('-')
        }
        //分时线数据系列
        let series  = {
            type: 'line',
            label: {
                normal: {
                    show: true,
                }
            },
            lineStyle: {
                normal: {
                    width: 1,
                    color: seriesLineColor[0]
                }
            },
            symbolSize: 2
        };
        series.data = data.map((price)=>{
            return {
                value: price,
                label: {
                    normal: {show: false},
                    emphasis: {show: false}
                }
            };
        });

        //分时图配置
        var tchartOptions = {
            tooltip : {
                show: true,
                trigger: 'axis',
                axisPointer : {
                    type : 'line'
                },
                formatter: function(params) {
                    if (params[0].name){
                        var time  = params[0].name;
                        var val   = params[0].value;

                        var html  = time + '<br/>' + '价格: ' + val + '<br/>';
                        return html;
                    }
                }
            },
            grid: {
                left: '5px',
                right: '5px',
                top: '10px',
                bottom: '10px',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    axisTick : {show: true},
                    scale: true,
                    boundaryGap : true,
                    axisLabel: {
                        show: true,
                        margin: 8
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show:true,
                        onZero: true,
                        lineStyle: {
                            color: 'red',
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'red',
                            type: 'dashed'
                        }
                    },
                    splitNumber: 2,
                    data : ONE_DAT_MIN_TIME
                }
            ],
            yAxis : [
                {
                    type: 'value',
                    scale: true,
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        inside: true,
                        margin: 4
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: 'red',
                            type: 'solid'
                        }
                    },
                    splitNumber: 2,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'red'
                        }
                    }
                }
            ],
            dataZoom: [
                {
                    type: 'inside',
                    start: 0,
                    end: 100,
                    zoomLock: true
                }
            ],
            series : series
        };
        this.tchart.setOption(tchartOptions, true);
    }

    add0 = (m) => {return m<10?'0'+m:m }


    render() {

        return (
            <div className="time-chart">
                <div className="t-chart" ref="tchart"></div>
            </div>
        );
    }
}

