<template>
  <div id="app">
    <div v-if="temp" id="temp" v-text="temp"></div>
    <div @click="checkTemp()" class='emoji' v-text="emoji"></div>
    <div>
      <span class='emoji' @click="decreaseTemp()">❄️</span>
      <span class='emoji' @click="increaseTemp()">🔥</span>
    </div>
  </div>
</template>

<script>
import FeverContract from '../dapp-scratch-wrapper/FeverContract'
let feverContract = new FeverContract()
feverContract.helloWorld()

export default {
  name: 'app',
  data () {
    return {
      hasFever: false,
      temp: null
    }
  },
  computed: {
    emoji () {
      return this.temp && (this.temp > 110 || this.temp < 95) ? '💀' : (this.hasFever ? '🤒' : '😀')
    }
  },
  methods: {
    getAccount () {
      console.log(feverContract.account)
    },
    checkTemp () {
      return feverContract.hasFever().then((hasFever) => {
        this.hasFever = hasFever

        return feverContract.getTemperature().then((temp) => {
          this.temp = temp
        })
      })
    },
    increaseTemp () {
      return feverContract.increaseTemp().then((temp) => {
        return this.checkTemp()
      })
    },
    decreaseTemp () {
      return feverContract.decreaseTemp().then((temp) => {
        return this.checkTemp()
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
</style>
