import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Head from 'next/head';
import dynamic from "next/dynamic"

import styles from '../../styles/Home.module.css';
// import p5 from 'p5'
import { Art } from '../components/Art2'

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
        {/* <div className='w-full text-white border'>Hey</div> */}
        <div className="border-zinc-300 scale-50 origin-top border-8 rounded-3xl overflow-hidden">
            <Art/>
        </div>
      </div>
    </div>
  )
}


export default Page
