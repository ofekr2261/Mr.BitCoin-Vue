import axios from 'axios'
import { storageService } from './storage.service.js'

export const bitcoinService = {
  getRate,
  getMarketPriceHistory,
  getAvgBlockSize,
}

async function getRate() {
  let rate = storageService.load('rate')
  if (rate) {
    return rate
  }

  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    )
    rate = response.data.bitcoin.usd
    storageService.save('rate', rate)
    return rate
  } catch (err) {
    throw new Error('Error fetching rate: ' + err.message)
  }
}

async function getMarketPriceHistory() {
  let pricesHistory = storageService.load('prices-history')
  if (pricesHistory) {
    return pricesHistory
  }

  try {
    const response = await axios.get(
      'https://api.blockchain.info/charts/market-price?timespan=1months&format=json&cors=true'
    )
    pricesHistory = response.data.values
    storageService.save('prices-history', pricesHistory)
    return pricesHistory
  } catch (err) {
    throw new Error('Error fetching market price history: ' + err.message)
  }
}

async function getAvgBlockSize() {
  let blockSizeAvgs = storageService.load('block-size-avgs')
  if (blockSizeAvgs) {
    return blockSizeAvgs
  }

  try {
    const response = await axios.get(
      'https://api.blockchain.info/charts/avg-block-size?timespan=1months&format=json&cors=true'
    )
    blockSizeAvgs = response.data.values
    storageService.save('block-size-avgs', blockSizeAvgs)
    return blockSizeAvgs
  } catch (err) {
    throw new Error('Error fetching average block size: ' + err.message)
  }
}
