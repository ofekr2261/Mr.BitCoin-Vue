<template>
  <div class="chart-container">
    <Bar
      v-if="prices"
      id="my-chart-id"
      :options="chartOptions"
      :data="getChartData"
    />
  </div>
</template>

<script>
import { bitcoinService } from '../services/bitcoin.service.js'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  data() {
    return {
      prices: null,
      chartOptions: {
        responsive: true,
      },
    }
  },
  async created() {
    this.prices = await bitcoinService.getMarketPriceHistory()
  },
  computed: {
    getChartData() {
      return {
        labels: this.getDataLabels,
        datasets: [
          {
            label: 'Avarage block size (in MB)',
            backgroundColor: '#f7931a99',
            data: this.getDatasetData,
          },
        ],
      }
    },
    getDataLabels() {
      return this.prices.map((value) => {
        const date = new Date(value.x * 1000)
        return `${date.getDate() + 1}.${date.getMonth() + 1}`
      })
    },
    getDatasetData() {
      return this.prices.map((value) => value.y)
    },
  },
}
</script>
