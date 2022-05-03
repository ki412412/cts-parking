import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
} from 'chart.js';
import moment from 'moment';

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip
);

(async () => {

    const xy = await getData();
    
    const data = {
        // x軸
        labels: xy.map(item => item.x),
        // y軸
        datasets: [
            {
                label: 'Dataset',
                data: xy.map(item => item.y),
                borderColor: 'rgb(255, 99, 132, 0.8)',
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                fill: false,
                stepped: true,
                fill: true,
            }
        ]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            interaction: {
                intersect: false,
                axis: 'x'
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '時刻',
                    },
                    min: 0,
                    max: 23,
                    ticks: {
                        stepSize: 1,
                    }
                },
                y: {
                    min: 1,
                    max: 3,
                    ticks: {
                        stepSize: 1,
                        callback: function(value, index, ticks) {
                            if (value === 1) return '空';
                            if (value === 2) return '混雑';
                            if (value === 3) return '満車';
                            return '？';
                        }
                    }
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: '1日の混雑状況'
                }
            }
        }
    };
    
    new Chart(document.getElementById('myChart'), config);
})();

async function getData() {
    // クエリパラメータ
    const scrapeDate = new URLSearchParams(window.location.search).get('scrapeDate');


    // APIからデータ取得
    let response = await window.axios.get(`/api/parking-c?scrapeDate=${scrapeDate ?? moment().format('YYYY-MM-DD')}`);
    let responseXY = response.data.map(d => {
        return {
            x: Number(d.scraped_at.slice(11).slice(0, -6)), 
            y: d.status
        }
    });

    // Chart.jsのx,y軸データ(xy)を作成
    let xy = defaultXY();
    for (let r of responseXY) {
        for (let i=0; i<xy.length; i++) {
            if (xy[i].x === r.x) {
                xy[i].y = r.y;
            }
        }
    }

    return xy;

    function defaultXY() {
        let result = [];
        for (let i = 0; i < 24; i++) {
            result.push({
                x: i,
                y: 0
            });
        }
        return result;
    }
}