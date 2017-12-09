<template>
  <div id="app">
    <div v-if="temp" id="temp" v-text="temp"></div>
    <div @click="checkTemp()" class='emoji' :class='{rotate: loading}' v-text="emoji"></div>
    <div>
      <span class='emoji' @click="decreaseTemp()">❄️</span>
      <span class='emoji' @click="increaseTemp()">🔥</span>
    </div>
    <small v-if="loading">confirming transaction</small>
  </div>
</template>

<script>
import ContractManager from '../dapp-scratch-wrapper'
let contractManager = new ContractManager()
console.log(contractManager)
// let contractManager.FeverContract = contractManager.FeverContract
console.log(contractManager.FeverContract)
// contractManager.FeverContract.helloWorld()

export default {
  name: 'app',
  data () {
    return {
      hasFever: false,
      temp: null,
      loading: false
    }
  },
  computed: {
    emoji () {
      return this.temp && (this.temp > 110 || this.temp < 95) ? '💀' : (this.hasFever ? '🤒' : '😀')
    }
  },
  mounted () {
    setTimeout(this.checkTemp, 2500)
  },
  methods: {
    getAccount () {
      console.log(contractManager.FeverContract.account)
    },
    checkTemp () {
      return contractManager.FeverContract.hasFever().then((hasFever) => {
        this.hasFever = hasFever
        return contractManager.FeverContract.getTemperature().then((temp) => {
          this.temp = temp
        })
      })
    },
    increaseTemp () {
      this.loading = true
      return contractManager.FeverContract.increaseTemp().then((temp) => {
        this.loading = false
        return setTimeout(this.checkTemp, 2500)
      })
    },
    decreaseTemp () {
      this.loading = true
      return contractManager.FeverContract.decreaseTemp().then((temp) => {
        this.loading = true
        return setTimeout(this.checkTemp, 2500)
      })
    }
  }
}
</script>

<style>
body {
  background-color: white;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#temp {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size:50px;
}
#temp:after {
  content: 'º';
}
.emoji {
  font-size:120px;
  cursor: pointer;
}
.rotate {
    -webkit-animation:spin 4s linear infinite;
    -moz-animation:spin 4s linear infinite;
    animation:spin 4s linear infinite;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
</style>
