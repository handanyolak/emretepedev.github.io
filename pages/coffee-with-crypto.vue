<template>
  <div>
    <div class="mt-12 flex justify-center">
      <v-container>
        <div v-if="provider">
          <div v-if="Boolean(isConnected)">
            <v-row
              align="center"
              :class="`my-5 ${
                !$vuetify.breakpoint.smAndDown
                  ? 'space-x-6'
                  : 'mx-2 grid grid-cols-1 gap-y-5 space-x-0'
              }`"
              justify="center"
            >
              <v-tooltip bottom content-class="text-xs">
                <template #activator="{ on, attrs }">
                  <span
                    v-ripple="{ center: true }"
                    v-bind="attrs"
                    class="app-title border-gradient-br-blue-green-gray-900 my-auto cursor-pointer rounded-md border-2 border-solid border-transparent p-3 text-center text-gray-100 shadow-xl"
                    v-on="on"
                    @click="copyText(address)"
                  >
                    Address:
                    {{ formatAddressToDisplay(address) }}
                  </span>
                </template>
                <span>
                  {{ address }}
                </span>
              </v-tooltip>
              <span
                class="app-title border-gradient-br-blue-green-gray-900 my-auto rounded-md border-2 border-solid border-transparent p-3 text-center text-gray-100"
              >
                Balance: {{ formatBalanceToDisplay(balance) }}
              </span>
            </v-row>
            <ValidationObserver ref="observer" v-slot="{ invalid }">
              <v-row>
                <ValidationProvider
                  v-slot="{ errors }"
                  class="flex justify-center"
                  name="amount"
                  :rules="{
                    required: true,
                    decimal: true,
                    min: 1,
                    max: 8,
                    min_value: 0.000001,
                    max_value: formatBalanceToDisplay(balance),
                  }"
                >
                  <v-text-field
                    v-model="amount"
                    class="mx-4 mt-4 max-w-sm"
                    :counter="8"
                    dense
                    :error-messages="errors"
                    :hint="!Boolean(amount) ? 'For example, `0.01`' : ''"
                    label="Amount"
                    name="amount"
                    outlined
                    placeholder="Your amount"
                    :prepend-inner-icon="mdiCurrencyUsdOff"
                    rounded
                    shaped
                    :success="
                      !Boolean(Object.keys(errors).length) && Boolean(amount)
                    "
                    @keyup.enter="send"
                  ></v-text-field>
                </ValidationProvider>
              </v-row>
              <v-row
                align="center"
                :class="`${
                  !$vuetify.breakpoint.smAndDown
                    ? 'space-x-6'
                    : 'my-4 grid grid-cols-1 gap-y-2 space-x-0 space-y-1 px-5'
                }`"
                justify="center"
              >
                <v-btn
                  :class="`${!$vuetify.breakpoint.smAndDown ? '' : 'w-full'}`"
                  :disabled="invalid || spinner"
                  @click="send"
                  ><svg
                    v-if="spinner"
                    class="mr-3 h-5 w-5 animate-spin text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Send</span>
                </v-btn>
                <v-btn @click="disconnectWeb3">Disconnect to Metamask</v-btn>
              </v-row>
            </ValidationObserver>
            <div class="mt-5 text-center text-sm">
              Note: Never mind the coffee. As a developer, I prefer Testnet
              coins for testing :)
            </div>
            <div
              class="mt-5 flex flex-col items-center space-y-1 text-center text-sm"
            >
              <div v-if="txHash" class="break-words">
                Transaction Hash: {{ txHash }}
              </div>
              <div v-if="txStatus">Status: {{ txStatus }}</div>
              <div v-if="waitForConfirmation">
                Confirmation Progress:
                {{ txConfirmationCount }}/{{ totalTxConfirmationCount }}
              </div>
            </div>
          </div>
          <div v-else class="flex items-center justify-center">
            <v-btn @click="connectWeb3">Connect to Metamask</v-btn>
          </div>
        </div>
        <div v-else class="flex items-center justify-center">
          <v-btn href="https://metamask.io/download/" target="_blank">
            Install Metamask
          </v-btn>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
  import {
    defineComponent,
    getCurrentInstance,
    onMounted,
    ref,
    useContext,
    useMeta,
  } from '@nuxtjs/composition-api'

  import Web3 from 'web3'
  import detectEthereumProvider from '@metamask/detect-provider'
  import { mdiCurrencyUsdOff } from '@mdi/js'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'

  export default defineComponent({
    // components
    components: {
      ValidationProvider,
      ValidationObserver,
    },

    // setup
    setup() {
      // meta
      useMeta({
        title: 'Coffee With Crypto | ',
      })

      // context
      const { $config } = useContext()

      // root variables
      const { $vToastify } = getCurrentInstance().proxy

      // refs
      const observer = ref(null)

      // envs
      const { ownerAddress, txConfirmationBlocks } = $config

      // constants
      let web3
      const provider = ref(null)
      const isConnected = ref(false)
      const address = ref(null)
      const balance = ref(0)
      const amount = ref('')
      const txStatus = ref('')
      const txConfirmationCount = ref(0)
      const totalTxConfirmationCount = ref(0)
      const txHash = ref('')
      const spinner = ref(false)
      const waitForConfirmation = ref(false)

      // hooks
      onMounted(async () => {
        await setProvider()

        if (provider.value) {
          // create web3 instance
          web3 = new Web3(provider.value)

          // set total confirmation count
          web3.eth.transactionConfirmationBlocks = txConfirmationBlocks
          totalTxConfirmationCount.value =
            web3.eth.transactionConfirmationBlocks

          const accounts = await web3.eth.getAccounts()
          if (accounts.length > 0) await connect()
        }
      })

      // methods
      const connectWeb3 = async () => {
        try {
          // if No web3 provider
          if (!provider.value) {
            throw new Error('No web3 provider detected.')
          }

          // Ask to connect
          await web3.eth.requestAccounts()

          await connect()

          $vToastify.success('Connected.')
        } catch (error) {
          // User denied account access
          $vToastify.error(String(error.message))
        }
      }

      const connect = async () => {
        // get address, balance etc.
        await updateUserInfo()

        // Check connecting
        isConnected.value =
          (await web3.eth.net.isListening()) && provider.value.isConnected()

        if (!isConnected.value) {
          throw new Error('Connection Error.')
        }

        // started eth events
        await startEthEvents()
      }

      const send = async () => {
        try {
          // validate
          const validate = await observer.value.validate()

          if (!validate) {
            throw new Error(observer.value.errors.message[0])
          }

          if (spinner.value) {
            throw new Error('Wait until the current tx is finished.')
          }

          // send tx
          await web3.eth
            .sendTransaction({
              from: address.value,
              to: ownerAddress,
              value: web3.utils.toWei(amount.value, 'ether'),
            })
            .once('sent', handleTxSent)
            .once('sending', handleTxSending)
            .once('transactionHash', handleTxHash)
            .once('receipt', handleTxReceipt)
            .on('confirmation', handleTxConfirmation)
            .on('error', handleTxError)
        } catch (error) {
          if (error) {
            $vToastify.error(String(error?.message))
          }
        }
      }

      const disconnectWeb3 = async () => {
        // reset events
        await stopEthEvents()

        // set false to `isConnected`
        isConnected.value = false

        $vToastify.success('Disconnected.')
      }

      // Start eth events
      const startEthEvents = () => {
        provider.value.on('chainChanged', handleChainChanged)
        provider.value.on('accountsChanged', handleAccountsChanged)
        provider.value.on('disconnect', handleDisconnect)
      }

      // Stop eth events
      const stopEthEvents = () => {
        provider.value.removeListener('chainChanged', handleChainChanged)
        provider.value.removeListener('accountsChanged', handleAccountsChanged)
      }

      // tx prepare event
      const handleTxSent = () => {
        spinner.value = true
        $vToastify.info('Transaction Status: Transaction sent to Metamask.')
      }

      // tx before create event
      const handleTxSending = () => {
        $vToastify.info('Transaction Status: Waiting to user confirm.')
      }

      // tx created event
      const handleTxHash = (_txHash) => {
        txHash.value = _txHash
        txStatus.value = 'Awaiting transaction confirmation.'
        resetInputs()
        $vToastify.info(
          'Transaction Status: Awaiting transaction confirmation.'
        )
      }

      // tx created successfully event
      const handleTxReceipt = async () => {
        waitForConfirmation.value = true
        txStatus.value = 'Awaiting block confirmation.'
        $vToastify.success('Transaction Status: Awaiting block confirmation.')
        $vToastify.info('Thank You For Your Support! - @emretepedev')
        await updateUserBalance()
      }

      const handleTxConfirmation = (_txConfirmationCount) => {
        // tx confirmation event
        if (
          _txConfirmationCount > 0 &&
          _txConfirmationCount <= totalTxConfirmationCount.value
        ) {
          txConfirmationCount.value = _txConfirmationCount
          $vToastify.info('Confirmation Status: New block found.')
        }

        if (_txConfirmationCount >= totalTxConfirmationCount.value) {
          txStatus.value = 'Confirmed.'
          resetTxDetails()
          $vToastify.success('Transaction Status: Confirmed.')
        }
      }

      // tx error event
      const handleTxError = () => {
        txStatus.value = 'Failed.'
        resetTxDetails()
        $vToastify.error('Transaction Status: Failed.')
      }

      // eth change chain event
      const handleChainChanged = async () => {
        await updateUserBalance()
        $vToastify.success('Chain has changed.')
      }

      // eth change account event
      const handleAccountsChanged = async (_accounts) => {
        if (_accounts.length > 0) {
          await updateUserInfo(_accounts[0].toLowerCase())

          $vToastify.success(`Linked account changed to '${_accounts[0]}'`)
        } else {
          await disconnectWeb3()
        }
      }

      // eth disconnect event
      const handleDisconnect = async () => {
        await stopEthEvents()

        isConnected.value = false
      }

      // Set for web3 provider
      const setProvider = async () => {
        provider.value = await detectEthereumProvider({
          mustBeMetaMask: true,
          silent: true,
          timeout: 3000,
        })
      }

      // get user address and balance
      const updateUserInfo = async (_address = null) => {
        await updateUserAddress(_address)
        await updateUserBalance()
      }

      // get user address
      const updateUserAddress = async (_address = null) => {
        address.value =
          _address || (await web3.eth.getAccounts())[0].toLowerCase()
      }

      // get user address
      const updateUserBalance = async () => {
        balance.value = web3.utils.fromWei(
          await web3.eth.getBalance(address.value),
          'ether'
        )
      }

      // removed fields and reset validate
      const resetInputs = () => {
        observer.value.reset()
        amount.value = ''
      }

      // removed tx details for sustainability
      const resetTxDetails = () => {
        txStatus.value = ''
        txHash.value = ''
        totalTxConfirmationCount.value = 0
        txConfirmationCount.value = 0
        waitForConfirmation.value = false
        spinner.value = false
      }

      // address value formatted to user
      const formatAddressToDisplay = (_address, charCount = 4) => {
        return (
          _address.substring(0, charCount) +
          '...' +
          _address.substring(_address.length - charCount)
        )
      }

      // balance value formatted to user
      const formatBalanceToDisplay = (_balance) => {
        return (+_balance).toFixed(6)
      }

      // copy to clipboard
      const copyText = async (_text) => {
        try {
          await navigator.clipboard.writeText(_text)
          $vToastify.success('Copied')
        } catch (error) {
          // suppressed error
        }
      }

      // return
      return {
        provider,
        isConnected,
        amount,
        address,
        balance,
        observer,
        txStatus,
        txConfirmationCount,
        waitForConfirmation,
        txHash,
        totalTxConfirmationCount,
        spinner,
        copyText,
        connectWeb3,
        disconnectWeb3,
        formatBalanceToDisplay,
        formatAddressToDisplay,
        send,
        mdiCurrencyUsdOff,
      }
    },

    // head
    head: {},
  })
</script>
