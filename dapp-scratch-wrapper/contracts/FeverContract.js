import FeverContractArtifacts from '../../build/contracts/FeverContract.json'
class FeverContract {
  constructor (contractManager, options) {

    this.contractManager = contractManager
    this.address = '0x4859336a9ecaf3a6fe0ca54f29c24016e3005232'
    this.options = {
      getPastEvents: false,
      watchFutureEvents: false
    }
    Object.assign(this.options, options)

    if (!this.address || this.address === 'REPLACE_WITH_CONTRACT_ADDRESS') return new Error('Please provide a contract address')
    this.FeverContract = new global.web3.eth.Contract(FeverContractArtifacts.abi, this.address)

  }

  // hello world : )
  helloWorld () {
    console.log('hello world!')
  }

  /*
   * Not Yet Implemented vvvv
   */

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
    return this.FeverContract.methods.hasFever().call()
      .then((resp) => {
      console.log(resp)
      return resp
    }).catch((err) => {
      console.error(err)
    })
  }
  getTemperature () {
    return this.FeverContract.methods.getTemperature().call()
      .then((resp) => {
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
    if (!this.contractManager.account) return new Error('Unlock Wallet')
    return this.FeverContract.methods.increaseTemp().send({from: this.contractManager.account})
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
    if (!this.contractManager.account) return new Error('Unlock Wallet')
    return this.FeverContract.methods.decreaseTemp().send({from: this.contractManager.account})
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
