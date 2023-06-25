import axios from 'axios'
import { storageService } from './storage.service.js'

export const bitcoinService = {
  getRate,
  getMarketPriceHistory,
  getAvgBlockSize,
}

const CACHE_DURATION = {
  rate: 5 * 60 * 1000,
  'prices-history': 5 * 60 * 1000,
  'block-size-avgs': 5 * 60 * 1000,
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
    setTimeout(() => {
      storageService.remove('rate')
    }, CACHE_DURATION.rate)
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
    setTimeout(() => {
      storageService.remove('prices-history')
    }, CACHE_DURATION['prices-history'])
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
    setTimeout(() => {
      storageService.remove('block-size-avgs')
    }, CACHE_DURATION['block-size-avgs'])
    return blockSizeAvgs
  } catch (err) {
    throw new Error('Error fetching average block size: ' + err.message)
  }
}
