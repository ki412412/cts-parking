const data = {
    // x軸
    labels: datetimeAxis(),
    // y軸
    datasets: [
        {
            label: 'Dataset',
            data: dummyData(),
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

function datetimeAxis() {
    let result = [];
    for (let i = 0; i < 24; i++) {
        result.push(`${i}:00`);
    }
    return result;
}
console.log(datetimeAxis())

function dummyData() {
    let result = [];
    for (let i = 0; i < 24; i++) {
        result.push(Math.floor(Math.random() * 4));
    }
    return result;
}
console.log(dummyData())

new Chart(document.getElementById('myChart'), config);