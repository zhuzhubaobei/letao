$(function(){
    var myChart_l = echarts.init(document.querySelector('.echarts_left'));
    var myChart_r = echarts.init(document.querySelector('.echarts_right'));

        // 指定图表的配置项和数据
        var option1 = {
            title: {
                text: '2019年注册人数'
            },
            tooltip: {},
            legend: {
                data:['销量','人数']
            },
            xAxis: {
                data: ["1月","2月","3月","4月","5月","6月"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [100, 200, 400, 200, 400, 300]
            },{
                name: '人数',
                type: 'bar',
                data: [302, 220, 600, 100, 500, 200]
            }]
        };

     
        option2 = {
            title : {
                text: '热门品牌销售',
                subtext: '2019年1月',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
                {
                    name: '品牌热卖',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'耐克'},
                        {value:310, name:'阿迪'},
                        {value:234, name:'犀牛'},
                        {value:135, name:'安踏'},
                        {value:1548, name:'特步'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 100,
                            shadowOffsetX: 0,
                            shadowColor: 'yellow'
                        }
                    }
                }
            ]
        };
           // 使用刚指定的配置项和数据显示图表。
           myChart_l.setOption(option1);
           myChart_r.setOption(option2);

})