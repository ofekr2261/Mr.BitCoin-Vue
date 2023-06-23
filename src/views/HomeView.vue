<template>
  <section class="home main-layout full">
    <div class="home-hero full main-layout">
      <h1 class="title">Bitcoin for Individuals</h1>
      <h3 class="subtitle">
        Unlock seamless transactions with Bitcoin's unrivaled affordability and
        convenience.
      </h3>
      <RouterLink class="add-link" to="/signup"
        ><button class="primary">Start now</button></RouterLink
      >
      <svg
        class="full"
        id="wave"
        style="transform: rotate(0deg); transition: 0.3s"
        viewBox="0 0 1440 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stop-color="rgba(255, 255, 255, 1)" offset="0%"></stop>
            <stop stop-color="rgba(255, 255, 255, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          style="transform: translate(0, 0px); opacity: 1"
          fill="url(#sw-gradient-0)"
          d="M0,80L120,80C240,80,480,80,720,68.3C960,57,1200,33,1440,21.7C1680,10,1920,10,2160,11.7C2400,13,2640,17,2880,20C3120,23,3360,27,3600,36.7C3840,47,4080,63,4320,71.7C4560,80,4800,80,5040,68.3C5280,57,5520,33,5760,33.3C6000,33,6240,57,6480,55C6720,53,6960,27,7200,15C7440,3,7680,7,7920,6.7C8160,7,8400,3,8640,6.7C8880,10,9120,20,9360,20C9600,20,9840,10,10080,13.3C10320,17,10560,33,10800,41.7C11040,50,11280,50,11520,56.7C11760,63,12000,77,12240,78.3C12480,80,12720,70,12960,58.3C13200,47,13440,33,13680,23.3C13920,13,14160,7,14400,13.3C14640,20,14880,40,15120,50C15360,60,15600,60,15840,61.7C16080,63,16320,67,16560,58.3C16800,50,17040,30,17160,20L17280,10L17280,100L17160,100C17040,100,16800,100,16560,100C16320,100,16080,100,15840,100C15600,100,15360,100,15120,100C14880,100,14640,100,14400,100C14160,100,13920,100,13680,100C13440,100,13200,100,12960,100C12720,100,12480,100,12240,100C12000,100,11760,100,11520,100C11280,100,11040,100,10800,100C10560,100,10320,100,10080,100C9840,100,9600,100,9360,100C9120,100,8880,100,8640,100C8400,100,8160,100,7920,100C7680,100,7440,100,7200,100C6960,100,6720,100,6480,100C6240,100,6000,100,5760,100C5520,100,5280,100,5040,100C4800,100,4560,100,4320,100C4080,100,3840,100,3600,100C3360,100,3120,100,2880,100C2640,100,2400,100,2160,100C1920,100,1680,100,1440,100C1200,100,960,100,720,100C480,100,240,100,120,100L0,100Z"
        ></path>
      </svg>
    </div>
    <p class="large">
      Welcome to Mr.BitCoin, the premier destination for the future of finance
      and investment. Bitcoin, a decentralized digital currency, has emerged as
      a global phenomenon, reshaping the landscape of money management. In this
      era of exponential growth, it is crucial to grasp the significance and
      possibilities that Bitcoin offers within the modern economy. Our website
      endeavors to provide you with extensive insights into the realm of
      Bitcoin, encompassing its historical background, technological
      foundations, and practical applications. Embark on a captivating journey
      as we delve into the exhilarating universe of this digital currency and
      unlock its boundless potential.
    </p>
    <prices />
  </section>
</template>

<script>
import Prices from '../cmps/stats.vue'

export default {
  components: {
    Prices,
  },
}
</script>
