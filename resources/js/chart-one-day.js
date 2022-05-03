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
import { getDefaultFlags } from 'mysql/lib/ConnectionConfig';

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
                y: {
                    min: 1,
                    max: 3,
                    ticks: {
                        stepSize: 1,
                    }
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'C駐車場の１日の空車状況'
                }
            }
        }
    };
    
    new Chart(document.getElementById('myChart'), config);
})();

async function getData() {
    // APIからデータ取得
    let response = await window.axios.get('/api/parking-c');
    let responseXY = response.data.map(d => {
        return {
            x: d.scraped_at.slice(11).slice(0, -6)+':00', 
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
                x: `${('000' + i).slice(-2)}:00`,
                y: 0
            });
        }
        return result;
    }
}