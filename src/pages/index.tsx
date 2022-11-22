import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Head from 'next/head';
import dynamic from "next/dynamic"

import styles from '../../styles/Home.module.css';
import { Miner } from '../components'

function Page() {
  const { isConnected } = useAccount()
  return (
    <div className={styles.background}>
      <Head>
        <title>Eternals Miner</title>
        <meta
          name="description"
          content="Eternals Miner"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex p-5">
        <div className="ml-auto">
          <ConnectButton />
        </div>
      </div>
      <div className={styles.main}>
        <Miner />
      </div>
    </div>
  )
}

export default Page
