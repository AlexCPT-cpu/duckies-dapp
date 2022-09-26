import { useState, useEffect, useRef, createContext } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import truncateEthAddress from 'truncate-eth-address'
import { NFTCONTRACT, REWARDCONTRACT } from '../configs/configurations'
import NftAbi from '../configs/NftAbi.json'
import RewardAbi from '../configs/RewardAbi.json'

export const WalletConnectContext = createContext()

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "a9e587010ed64cb8b08558f7cadda06a",
      rpc: {
        5: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
      },
      chainId: 5
    }
  }
}


export const ConnectWalletProvider = ({ children }) => {
    const [addr, setAddr] = useState(null)
    const [chainId, setChainId] = useState(null)
    const [web3Modal, setWeb3Modal] = useState({})
    const [ account, setAccount ] = useState(null)
    const [ minted, setMinted ] = useState(null)
    const [amount, setAmount] = useState(1)
    const [ contract, setContract ] = useState(null)
    const [ rewardContract, setRewardContract ] = useState(null)
    const [ reciept, setReciept ] = useState(null)
    const [ cost, setCost ] = useState(null)
    const [isMinting, setMinting] = useState(false)
    const [isClaiming, setClaiming] = useState(false)
    const [Rewards, setPendingRewards] = useState(false)

    useEffect(() => {
      const connectWalletOnPageLoad = async () => {
        if (localStorage?.getItem('isWalletConnected') === ('true')) {
          try{ 
              if (typeof window !== "undefined") {
                web3Modal = new Web3Modal({
                network: "goerli", // optional
                cacheProvider: true, // optional
                providerOptions, // required
                theme: "dark",
              })
              setWeb3Modal(web3Modal)
                await ConnectWallet()
              localStorage.setItem('isWalletConnected', true)
            }

          } catch(ex) {
            console.log(ex)
          }
        }
      }
      connectWalletOnPageLoad()
    },[])

    const isConnected = () => {
      if(account != null) {
        return true
      }
      else {
        return false
      }
    }

    const ConnectWallet = async () => {
      if (typeof window !== "undefined") {
        web3Modal = new Web3Modal({
        network: "goerli", // optional
        cacheProvider: true, // optional
        providerOptions, // required
        theme: "dark",
      })
      setWeb3Modal(web3Modal)
    }
      localStorage.setItem('isWalletConnected', true)
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection);
        const signer = await provider.getSigner()
        const addr = await signer.getAddress()
        let pr = await provider.getNetwork()
        setChainId(pr.chainId)
        setAddr(addr)
        const address = truncateEthAddress(addr) 
        setAccount(address)   
        let nftcontract = await new ethers.Contract(NFTCONTRACT, NftAbi, signer)
        let rwdContract = await new ethers.Contract(REWARDCONTRACT, RewardAbi, signer)
        setContract(nftcontract)
        setRewardContract(rwdContract)
        let cost = await nftcontract.cost()
        let frmCost = ethers.utils.formatUnits(cost.toString())
        let rawBal = await rwdContract.pendingRewards(addr)
        let supply = await nftcontract.totalSupply()
        const pendingR = ethers.utils.formatUnits(rawBal.toString())
        const finalR = Number(pendingR)
        setCost(frmCost)
        setMinted(parseInt(supply))
        setPendingRewards(finalR.toFixed(7))
    }

    const DisconnectWallet = async () => {
      try {
        await web3Modal.clearCachedProvider();
        setAccount(null)
        localStorage.setItem('isWalletConnected', false)
      } catch(ex) {
        console.log(ex)
      }
    }

    const Mint = async () => {
      let totalCost = Number(cost) * amount
      let tx = await contract.mint(addr, amount, { value: ethers.utils.parseEther(totalCost.toString())})
      setMinting(true)
      let reciept = await tx.wait(1)
      setReciept(reciept.transactionHash)
      setMinting(false)
    } 

    const Claim = async () => {
      const tx =  await rewardContract.claim()
      setClaiming(true)
      await tx.wait(1)
      setClaiming(false)
    }

    const pendingRewards = async () => {
      let rawBal = await rewardContract.pendingRewards(addr)
        const pendingR = ethers.utils.formatUnits(rawBal.toString())
        setPendingRewards(pendingR)
    }

    return(
        <WalletConnectContext.Provider 
        value={{
            account,
            ConnectWallet,
            chainId,
            Mint,
            Claim,
            isConnected,
            setAmount,
            amount,
            reciept,
            isMinting,
            Claim,
            cost,
            minted,
            isClaiming,
            Rewards,
            pendingRewards,
            DisconnectWallet
         }}
        >
            {children}
        </WalletConnectContext.Provider>
    )
}