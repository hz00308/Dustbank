<template>
  <div id="my-chart">
    <div id="chart-title">소비 균형 리포트</div>
    <div id="chart-desc">Need(필요) vs Want(욕구)</div>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { computed } from 'vue';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const chartData = computed(() => {
  return {
    labels: ['Need', 'Want'],
    datasets: [
      {
        backgroundColor: ['#4C77EF', '#ACB3B7'],
        data: [10, 7], // 여기를 Pinia에서 가져와야 함
        offset: 3,
        hoverOffset: 35,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 30,
  },
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      title: {
        // 그래프와 legend 사이 gap 추가하기 위한 부분
        display: true,
        padding: {
          bottom: 10,
        },
      },
      position: 'bottom',
      onClick: (e) => {
        return false;
      },
      labels: {
        usePointStyle: true,
        pointStyle: 'rect',
        font: {
          size: 16,
        },
      },
    },
    datalabels: {
      formatter: (value, ctx) => {
        let sum = 0;
        const dataArr = ctx.chart.data.datasets[0].data;
        for (const data of dataArr) {
          sum += data;
        }
        const percentage = ((value * 100) / sum).toFixed(1) + '%';
        return percentage;
      },
      color: 'white',
      font: {
        weight: 'bold',
        size: 20,
      },
    },
  },
};
</script>

<style scoped>
#my-chart {
  height: 478px;
  width: 536px;
  background-color: white;
  border-radius: 48px;
  padding: 40px;
}
#chart-title {
  font-size: 24px;
  font-weight: 500;
}
#chart-desc {
  color: gray;
}
</style>
