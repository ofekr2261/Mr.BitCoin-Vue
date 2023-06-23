<template>
  <div class="home-stats">
    <h2>Bitcoin Statistics for today</h2>
    <div v-if="bitcoinStats">
      <table>
        <tr>
          <td>Price in USD</td>
          <td>${{ bitcoinStats.current_price.toLocaleString() }}</td>
        </tr>
        <tr>
          <td>Market Cap in USD</td>
          <td>${{ bitcoinStats.market_cap.toLocaleString() }}</td>
        </tr>
        <tr>
          <td>Market Cap Rank</td>
          <td>{{ bitcoinStats.market_cap_rank }}</td>
        </tr>
        <tr>
          <td>Fully Diluted Valuation</td>
          <td>${{ bitcoinStats.fully_diluted_valuation.toLocaleString() }}</td>
        </tr>

        <tr>
          <td>High in 24h</td>
          <td>${{ bitcoinStats.high_24h.toLocaleString() }}</td>
        </tr>
        <tr>
          <td>Low in 24h</td>
          <td>${{ bitcoinStats.low_24h.toLocaleString() }}</td>
        </tr>

        <tr>
          <td>Price Change Percentage in 24h</td>
          <td>{{ bitcoinStats.price_change_percentage_24h }}%</td>
        </tr>

        <tr>
          <td>Market Cap Change Percentage in 24h</td>
          <td>{{ bitcoinStats.market_cap_change_percentage_24h }}%</td>
        </tr>

        <tr>
          <td>All Time High</td>
          <td>${{ bitcoinStats.ath.toLocaleString() }}</td>
        </tr>
        <tr>
          <td>All Time High Change Percentage</td>
          <td>{{ bitcoinStats.ath_change_percentage }}%</td>
        </tr>
        <tr>
          <td>All Time High Date</td>
          <td>{{ bitcoinStats.ath_date }}</td>
        </tr>
        <tr>
          <td>All Time Low</td>
          <td>${{ bitcoinStats.atl.toLocaleString() }}</td>
        </tr>
        <tr>
          <td>All Time Low Change Percentage</td>
          <td>{{ bitcoinStats.atl_change_percentage }}%</td>
        </tr>
        <tr>
          <td>All Time Low Date</td>
          <td>{{ bitcoinStats.atl_date }}</td>
        </tr>
        <tr>
          <td>Last Updated</td>
          <td>{{ bitcoinStats.last_updated }}</td>
        </tr>
      </table>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      bitcoinStats: null,
    }
  },
  mounted() {
    this.fetchStats()
  },
  methods: {
    fetchStats() {
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
        )
        .then((response) => {
          this.bitcoinStats = response.data[0]
        })
        .catch((error) => {
          console.error('Error fetching Bitcoin statistics:', error)
        })
    },
  },
}
</script>

<style>
table {
  padding: 10px;
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 5px;
  border: 1px solid #ddd;
}
</style>
