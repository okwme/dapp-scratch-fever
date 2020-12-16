<template>
  <div id="app">
    <div class="emoji" v-if="!accounts" @click="connect()">⚡️</div>
    <div v-else @click="accounts = null">
        <li v-for="(account) in accounts" :key="account">
          <b>{{account}}</B>: {{balances[account]}}
        </li>
<!--
      <div v-for="accounts">{{accounts}}</div>
      <div>{{allBalances}}</div> -->


      </div>
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
var Web3 = require('web3');
var {abi, contractName, networks} = require("../build/contracts/FeverContract.json")

console.log({abi, contractName, networks})

var web3, contract
var ethereum = window.ethereum

export default {
  name: 'app',
  data () {
    return {
      connected: false,
      hasFever: false,
      temp: null,
      loading: false,
      accounts: null,
      network: null,
      chainId: null,
      balances: {}
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

      this.chainId = parseInt(ethereum.chainId, 16)
      this.network = parseInt(await ethereum.request({ method: 'net_version'}), 10)

      this.getBalances()

      web3 = new Web3(ethereum);
      console.log({networks})
      console.log({this_networ: this.network})
      if (!networks[this.network]) {
        alert("contract not deployed")
      }
      var address = networks[this.network].address
      console.log({address})
      contract = new web3.eth.Contract(abi, address)
      console.log({contract})
    },
    getBalances() {
      for (let i = 0; i < this.accounts.length; i++) {
        this.getBalance(i)
      }
    },
    getBalance(i) {
      let account = this.accounts[i]
      ethereum
      .request({
        method: 'eth_getBalance',
        params: [
        account,
        'latest'
      ],
      })
      .then((result) => {
        this.$set(this.balances, account, result)
        // this.balances[account] = result

        // The result varies by by RPC method.
        // For example, this method will return a transaction hash hexadecimal string on success.
      })
      .catch((error) => {
        console.error({error})
        // If the request fails, the Promise will reject with an error.
      });
    },
    getAccount () {

    },
    async checkTemp () {
      this.temp = await contract.methods.getTemperature().call()
    },
    async increaseTemp () {
      console.log('increase clicked!')
      var result = await contract.methods.increaseTemp().send({from: this.accounts[0]})
      console.log({result})
    },
    async decreaseTemp () {
      console.log('decreased clicked!')
      var result = await contract.methods.decreaseTemp().send({from: this.accounts[0]})
      console.log({result})
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
