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
    Tooltip,
    registerables
} from 'chart.js';

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

window.axios.get(`/api/parking-c/statistics`)
    .then(response => {
        const data = response.data.map(d => {
            return {
                x: d.hour,
                y: d.status,
                r: d.count
            }
        })
        renderBubblechart('#chart-bubble', data);
    });

function renderBubblechart(selector, data) {

    const config = {
        type: 'bubble',
        data: {
            datasets: [
                {
                    label: 'Dataset',
                    data: data,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false,
                axis: 'xy'
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
                    text: '時間帯毎の混雑度合い'
                },
                legend: {
                    align: 'center'
                }
            }
        }
    };

    new Chart(document.querySelector(selector), config);
}
