import React from "react";
import Navbar from "../components/Navbar";
import { FiArrowDown, FiSettings } from "react-icons/fi";
import { ethers } from "ethers";
import { useBalance, useAccount } from "wagmi";

export default function Home() {
    const { address, isConnected } = useAccount();

    const { data } = useBalance({
        address: address,
    });

    // const infuraProvider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

    // const getETHBalance = async (address) => {
    //     try {
    //       const balance = await infuraProvider.getBalance(address);
    //       return ethers.utils.formatEther(balance);
    //     } catch (error) {
    //       console.error('Error fetching balance:', error);
    //       return '0';
    //     }
    //   };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center  p-8 text-blue-300 ">
                <div
                    className={` w-[446px] border-2 rounded-xl border-white ${
                        isConnected ? "h-[350px]" : "h-[300px]"
                    }  flex flex-col `}
                >
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row p-4 gap-4">
                            <p>Swap</p>
                            <p>Liquidity</p>
                        </div>
                        <div className="p-4">
                            <FiSettings size={22} />
                        </div>
                    </div>

                    <div className="flex p-4 flex-col items-center ">
                        <label
                            htmlFor="swap1"
                            className="flex flex-row w-full h-full bg-slate-600 rounded-xl -mb-4"
                        >
                            <input
                                id="swap1"
                                type="number"
                                className="w-full  h-[60px] rounded-md  bg-slate-600 focus:outline-none  focus:border-transparent pl-4 text-2xl pr-3 "
                            />
                            <div className="w-[25%] flex flex-col items-center ">
                                <div className="flex flex-row mt-2 p-2 gap-3 text-black mr-10 w-[120px] bg-slate-300 rounded-xl justify-around  items-center">
                                    <img
                                        src="https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
                                        alt="logo"
                                        className="w-5 h-5 "
                                    />
                                    <div>ETH</div>
                                    <FiArrowDown />
                                </div>
                                {isConnected ? (
                                    <div className="-ml-12 py-2">
                                        Balance:{" "}
                                        {Number(data?.formatted).toFixed(3)}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </label>
                        <div className="bg-[#242424] rounded-lg p-[8px] cursor-pointer shadow-black drop-shadow-2xl z-10 ">
                            <svg
                                className=" w-6 h-6  "
                                xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 512 512"
                            >
                                <path
                                    d="M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z"
                                    fill="#b2b2b2"
                                />
                            </svg>
                        </div>
                        <label
                            htmlFor="swap1"
                            className="flex flex-row w-full h-full bg-slate-600 rounded-xl -mt-4"
                        >
                            <input
                                id="swap1"
                                type="number"
                                className="w-full  h-[60px] rounded-md  bg-slate-600 focus:outline-none  focus:border-transparent pl-4 text-2xl pr-3 "
                            />
                            <div className="w-[25%] flex flex-col items-center ">
                            <div className="flex flex-row mt-2 p-2 gap-3 text-black mr-10 w-[120px] bg-slate-300 rounded-xl justify-around  items-center">
                                    <img
                                        src="https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
                                        alt="logo"
                                        className="w-5 h-5 "
                                    />
                                    <div>ETH</div>
                                    <FiArrowDown />
                                </div>
                                {isConnected ? (
                                    <div className="-ml-12 py-2">
                                        Balance:{" "}
                                        {Number(data?.formatted).toFixed(3)}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </label>
                        <div className="bg-slate-600 mx-auto flex justify-center w-full py-4 rounded-lg mt-5">
                            Select Token
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
