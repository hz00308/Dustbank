<template>
  <div id="my-chart">
    <div id="chart-title">카테고리별 지출</div>
    <div id="chart-desc">어디에 가장 많이 썼을까요?</div>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { computed } from 'vue';
import { useTransactionStore } from '@/stores/transaction';

const transactionStore = useTransactionStore();
const categoryAmount = computed(() => transactionStore.categoryAmount);

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const chartData = computed(() => {
  return {
    labels: ['식사', '간식', '장난감', '취미', '준비물', '기타'],
    datasets: [
      {
        backgroundColor: [
          '#A5B4FC',
          '#93C5FD',
          '#86EFAC',
          '#FDE68A',
          '#FCA5A5',
          '#D1D5DB',
        ],
        data: categoryAmount.value,
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
          size: 14,
        },
      },
    },
    datalabels: {
      formatter: (value, ctx) => {
        if (value === 0) return ''; // 0.0%인 경우 표시하지 않도록
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
