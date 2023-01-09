import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Head from 'next/head';
import dynamic from "next/dynamic"

import styles from '../../styles/Home.module.css';
// import p5 from 'p5'
import { Joints } from '../components/art/jointsArt'
import NavBar from '../components/navbar';

function Page() {
  const { isConnected } = useAccount()
  return (
    <div className={styles.background}>
      <Head>
        <title>0xBold.art</title>
        <meta
          name="description"
          content="0xBold.art"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-[1200px]">
        <div className="flex p-5">
          <div className="text-white text-4xl w-full flex">
            <NavBar/>
          </div>
        </div>
        <div className={styles.main}>
          <div className="font-bold text-6xl text-white tracking-widest">
            0xBold.art
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
