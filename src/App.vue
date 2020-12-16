<template>
  <div id="app">
    <div class="emoji" v-if="!accounts" @click="connect()">⚡️</div>
    <div v-else @click="accounts = null">{{accounts}}</div>
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

var ethereum = window.ethereum
export default {
  name: 'app',
  data () {
    return {
      connected: false,
      hasFever: false,
      temp: null,
      loading: false,
      accounts: null
    }
  },
  computed: {
    emoji () {
      return this.temp && (this.temp > 110 || this.temp < 95) ? '💀' : (this.hasFever ? '🤒' : '😀')
    }
  },
  mounted () {

  },
  methods: {
    async connect () {
      var accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      this.accounts = accounts
      console.log({accounts})
    },
    getAccount () {

    },
    checkTemp () {

    },
    increaseTemp () {
      console.log('increase clicked!')
    },
    decreaseTemp () {
      console.log('decreased clicked!')
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
