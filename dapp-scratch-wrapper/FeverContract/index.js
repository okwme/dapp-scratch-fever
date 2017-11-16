
import FeverContractArtifacts from '../../build/contracts/FeverContract.json'

import Web3 from 'web3'
import BN from 'bignumber.js'
import ZeroClientProvider from 'web3-provider-engine/zero.js'
import IdManagerProvider from '@aeternity/id-manager-provider'

class FeverContract {
  constructor (options) {

    this.FeverContract = null

    this.pollingInterval = null
    this.account = null
    this.unlocked = false
    this.balanceWei = 0
    this.balance = 0
    this.address = '0x345ca3e014aaf5dca488057592ee47305d9b3e10'
    this.genesisBlock = 0
    this.loading = false
    this.options = {
      autoInit: true,
      getPastEvents: false,
      watchFutureEvents: false,
      connectionRetries: 3
    }
    Object.assign(this.options, options)
    if (this.options.autoInit) this.initWeb3()
  }

  // hello world : )
  helloWorld () {
    console.log('hello world!')
  }

  /*
   * Connect
   */

  initWeb3 () {
    return new Promise((resolve, reject) => {

      let web3Provider = false
      let idManager = new IdManagerProvider({
        rpcUrl: 'http://localhost:9545',
        skipSecurity: true
      })

      // check for aedentity app
      if (idManager.checkIdManager()) {
        web3Provider = idManager.web3.currentProvider

      // check for metamask
      } else if (global.web3) {
        web3Provider = web3.currentProvider

      // attempt to try again if no aedentity app or metamask
      } else if (this.options.connectionRetries > 0){
        this.options.connectionRetries -= 1
        setTimeout(() => {
          this.initWeb3().then(resolve).catch((error) => {
            reject(new Error(error))
          })
        }, 1000)
      // revert to a read only version using infura endpoint
      } else {
        this.readOnly = true
        web3Provider = ZeroClientProvider({
          getAccounts: function(){},
          rpcUrl: 'https://mainnet.infura.io',
          // rpcUrl: 'https://testnet.infura.io',
          // rpcUrl: 'https://rinkeby.infura.io',
          // rpcUrl: 'https://kovan.infura.io',
        })
      }

      if (web3Provider) {
        web3 = new Web3(web3Provider)
        this.startChecking()

        if (this.options.getPastEvents) this.getPastEvents()
        if (this.options.watchFutureEvents) this.watchFutureEvents()
      }
    })
  }

  /*
   * Check every second for switching network or wallet
   */

  startChecking () {
    if (this.pollingInterval) clearInterval(this.pollingInterval)
    this.getGenesisBlock()
    .then(() => {
      this.pollingInterval = setInterval(this.check.bind(this), 1000)
    })
    .catch((err) => {
      throw new Error(err)
    })
  }

  check () {
    this.checkNetwork()
    .then(this.checkAccount.bind(this))
    .catch((error) => {
      console.error(error)
      throw new Error(error)
    })
  }

  checkNetwork () {
    return web3.eth.net.getId((err, netId) => {
      if (err) console.error(err)
      if (!err && this.network !== netId) {
        this.network = netId
        return this.deployContract()
      }
    })
  }

  deployContract () {
    if (!this.address) return new Error('Please provide a contract address')
    this.FeverContract = new global.web3.eth.Contract(FeverContractArtifacts.abi, this.address)
  }

  checkAccount () {
    return web3.eth.getAccounts((error, accounts) => {
      if (error) throw new Error(error)
      if (accounts.length && this.account !== accounts[0]) {
        this.unlocked = true
        this.account = accounts[0]
      } else if (!accounts.length) {
        this.unlocked = false
        this.account = null
      }
    })
  }


  /*
   * Not Yet Implemented vvvv
   */

  getGenesisBlock () {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  getPastEvents () {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  watchFutureEvents () {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }




  /*
   *
   * Constant Functions
   *
   */

  hasFever () {
    return this.FeverContract.methods.hasFever().call()    .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  getTemperature () {
    return this.FeverContract.methods.getTemperature().call()    .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }

  /*
   *
   * Transaction Functions
   *
   */

  increaseTemp () {
    if (!this.account) return new Error('Unlock Wallet')
    return this.FeverContract.methods.increaseTemp().send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }
  decreaseTemp () {
    if (!this.account) return new Error('Unlock Wallet')
    return this.FeverContract.methods.decreaseTemp().send({from: this.account})
    .on('transactionHash', (hash) => {
      console.log(hash)
      this.loading = true
    })
    .then((resp) => {
      this.loading = false
      console.log(resp)
      return resp
    }).catch((err) => {
      this.loading = false
      console.error(err)
    })
  }

  /*
   *
   * Events
   *
   */




}

export default FeverContract
