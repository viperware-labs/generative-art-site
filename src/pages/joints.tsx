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
        <title>Joints | 0xBold.art</title>
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
          <div className='w-full text-white text-6xl text-center my-10 tracking-wider'>Joints</div>
          <div className="border-zinc-300 border-8 rounded-3xl overflow-hidden h-[300px] w-[300px] sm:h-[500px] sm:w-[500px]">
            <div className="scale-[29%] sm:scale-50 origin-top-left">
              <Joints />
            </div>
          </div>
          <div className='w-full text-white text-2xl text-center my-10 tracking-wider'>Click to generate new a Joint!</div>
        </div>
      </div>
    </div>
  )
}

export default Page
