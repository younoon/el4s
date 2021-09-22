// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var ctx = document.getElementById("day");
var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
    labels: ["７月１日", "７月２日", "７月３日", "７月４日", "７月５日", "７月６日", "７月７日", "７月８日", "７月９日", "７月１０日"],
        datasets: [{
            label: "￥",
            backgroundColor: "rgba(2,117,216,1)",
            borderColor: "rgba(2,117,216,1)",
            data: [421, 531, 325, 384, 482, 345, 334, 400, 277, 333, ],
        }],
    },
    options: {
        scales: {
            xAxes: [{
                time: {
            unit: 'month'
            },
        gridLines: {
            display: false
        },
        ticks: {
            maxTicksLimit: 10
        }
        }],
        yAxes: [{
        ticks: {
            min: 0,
            max: 1000,
            maxTicksLimit: 5
        },
        gridLines: {
            display: true
        }
        }],
    },
    legend: {
        display: false
    }

    }
});