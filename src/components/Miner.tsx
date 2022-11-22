import { useAccount, useEnsName, useNetwork } from 'wagmi'
import keccupABI from '../abi.json';
import { ethers } from "ethers";
import { keccak256, parseEther } from 'ethers/lib/utils';
import { useContractReads } from 'wagmi';
import { useState } from 'react';
import styles from '../../styles/Home.module.css';

export function Miner() {
  const { address } = useAccount();
  const { chain, chains } = useNetwork();
  const { data: ensName } = useEnsName({ address });

  const [seed, setSeed] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [seedMatches, setSeedMatches] = useState(false);
  const [miningEnabled, setMiningEnabled] = useState(false);

  // 0xdab1d65d8c2bba440b14d6dc40a16cd843c43e22
 
  const goerliKeccupContract = {
    address: '0x14BD2123Ea8AFCe4b995968F93f280B70F09E559',
    abi: keccupABI,
  } 
  
  const { data: difficultyData } = useContractReads({
    contracts: [
      {
        ...goerliKeccupContract,
        functionName: 'difficulty',
        chainId: 5,
      },
    ],
    onSuccess(difficultyData) {
      console.log('Difficulty: ', difficultyData);
      try {
        // @ts-ignore
        if (difficultyData != null || difficultyData != undefined) setDifficulty(difficultyData[0].toNumber());
      } catch (e) {
        console.log(e);
      }
      
    },
  })

  const { data: matchData } = useContractReads({
    contracts: [
      {
        ...goerliKeccupContract,
        functionName: 'matchesWithDifficulty',
        chainId: 5,
        args: [seed, difficulty], // difficultyData[0].toNumber()
      },
    ],
    onSuccess(matchData) {
      let matches = false;
      try {
        // @ts-ignore
        matches = (0 === matchData[0].toNumber());
      } catch (e) {
        console.log(e);
      }
      setSeedMatches(matches);
      console.log('Match: ', matches ? "TRUE" : "FALSE");
      console.log('Match: ', matches);
      // Continue Mining
      if (miningEnabled) {
        console.log("Increase to ", seed);
        setSeed(seed + 1);
      }
      if (!matches) {
        // Found Match
      }
    },
  })

  return (
    <>
      <div className="text-white text-center">
      
        {/* <h1 className="text-7xl sm:text-8xl lg:text-9xl font-anon font-bold text-[#f1dec5]">ΞTERNALS</h1><br/> */}
        <h1 className="text-7xl sm:text-8xl lg:text-9xl font-anon font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-green-400 ">ΞTERNALS</h1><br/>
        
        {/* {chains && (
          <div>Available chains: {chains.map((chain) => chain.name)}</div>
        )} */}

        {chain && chain.name == "Goerli" ? 
            <>
              <div className={"text-md lg:text-lg"}>
                {ensName ?? address}
              </div><br/>
              <div className={"text-xl lg:text-4xl" + (miningEnabled ? " text-green-500" : " text-red-500")}>
                {miningEnabled ? "Mining Enabled" : "Mining Disabled"}
              </div><br/>
              <button className="m-2 text-lg border-2 rounded-lg bg-slate-700 px-3 py-1 hover:text-xl"
                      onClick={() => {
                        setMiningEnabled(!miningEnabled);
                        setSeed(seed + 1);
                      }}>{miningEnabled ? "Stop Mining" : "Start Mining"}</button><br/><br/>
              <div className={"text-lg lg:text-xl"}>
                Current Seed: {seed} - {seedMatches ? "Valid Seed!" : "Invalid Seed"}<br/>
              </div>
            </>
            :
            <>
              <div className="w-full px-5 text-xl">Hey fren. You&apos;re on {chain?.name}. You think you could switch your network to the Goerli Testnet for us?</div>
            </>}

      </div>
    </>
  )
}
