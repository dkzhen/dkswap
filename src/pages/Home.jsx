import React, { useState, useContext } from "react";

import Navbar from "../components/Navbar";
import { FiArrowDown, FiSettings } from "react-icons/fi";
import { useBalance, useNetwork, useAccount, useSwitchNetwork } from "wagmi";
import {
    ListTokensChainBase,
    ListTokensChainGoerli,
    ListTokensChainEthereum,
    initialTokenList,
} from "../utils/TokenList";
import AppContext from "../utils/AppContext";
export default function Home() {
    const appContext = useContext(AppContext);
    const selectedChainId = appContext.chainId;
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isDropdownVisible2, setIsDropdownVisible2] = useState(false);
    const { chain } = useNetwork();
    const { isConnected, address } = useAccount();
    let chainId;
    isConnected ? (chainId = chain.id) : (chainId = 0);
    const toggleDropdown = () => {
        setIsDropdownVisible((prevState) => !prevState);
    };
    const toggleDropdown2 = () => {
        setIsDropdownVisible2((prevState) => !prevState);
    };
    const toggleMiddle = () => {
        // Swap selectedToken and selectedToken2
        const tempToken = selectedToken;
        setSelectedToken(selectedToken2);
        setSelectedToken2(tempToken);
        const tempInitToken = initialToken;
        setInitialToken(initialToken2);
        setInitialToken2(tempInitToken);
    };

    let tokenList;
    if (chainId === 1) {
        tokenList = ListTokensChainEthereum;
    } else if (chainId === 84531) {
        tokenList = ListTokensChainBase;
    } else if (chainId === 5) {
        tokenList = ListTokensChainGoerli;
    } else {
        // Default to Ethereum if the chainId is not recognized
        tokenList = initialTokenList;
    }
    const ethToken = [
        {
            name: "ETH",
            idchain: 5,
            img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
            contract: "0xf17FF940864351631b1be3ac03702dEA085ba51c",
        },
    ];

    const { data } = useBalance({
        address: address,
    });
    const [initialToken, setInitialToken] = useState(ethToken[0]);
    const [initialToken2, setInitialToken2] = useState(ethToken[0]);
    const [selectedToken, setSelectedToken] = useState(ethToken[0]);
    const [selectedToken2, setSelectedToken2] = useState(ethToken[0]);
    const balance = useBalance({
        address: address,
        token: selectedToken.contract,
    });
    const balance2 = useBalance({
        address: address,
        token: selectedToken2.contract,
    });
    const { switchNetwork } = useSwitchNetwork();
    const switchToChain = (chainId) => {
        if (switchNetwork) {
            switchNetwork(chainId);
        }
    };
    const handleSwap = () => {
        alert("sukses");
    };

    const formattedBalance =
  selectedToken.name === "ETH"
    ? parseFloat(data?.formatted).toFixed(3)
    : parseFloat(balance.data?.formatted || 0).toFixed(3);

const finalBalance =
  parseFloat(formattedBalance) === parseInt(formattedBalance)
    ? parseInt(formattedBalance)
    : formattedBalance;
    const formattedBalance2 =
  selectedToken2.name === "ETH"
    ? parseFloat(data?.formatted).toFixed(3)
    : parseFloat(balance2.data?.formatted || 0).toFixed(3);

const finalBalance2 =
  parseFloat(formattedBalance2) === parseInt(formattedBalance2)
    ? parseInt(formattedBalance2)
    : formattedBalance2;

// Now you can use the "finalBalance" variable to display the balance.


    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center p-8 text-blue-300 ">
                <div
                    className={`w-[446px] border-2 rounded-xl border-white ${
                        isConnected ? "h-[350px]" : "h-[300px]"
                    } flex flex-col `}
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
                            <div className="w-[25%] flex flex-col items-center mr-3">
                                <div
                                    onClick={toggleDropdown}
                                    className="cursor-pointer flex flex-row mt-2 p-2 gap-3 focus:border-none text-black mr-2 w-[120px] bg-slate-300 rounded-xl justify-around  items-center"
                                >
                                    <img
                                        src={
                                            isConnected
                                                ? selectedToken.img
                                                : initialToken.img
                                        }
                                        alt="logo"
                                        className=" w-5 h-5 rounded-full"
                                    />
                                    <div>
                                        {isConnected
                                            ? selectedToken.name
                                            : initialToken.name}
                                    </div>

                                    <FiArrowDown />
                                </div>
                                {isDropdownVisible && (
                                    <ul className="absolute mt-[50px] py-2 -ml-2 z-10 pr-3 bg-white border border-gray-300 rounded-md shadow-lg">
                                        {tokenList.map((option, index) => (
                                            <li
                                                key={index}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex flex-row items-center gap-3"
                                                onClick={() => {
                                                    setInitialToken(
                                                        initialTokenList[index],
                                                    );
                                                    setSelectedToken(
                                                        tokenList[index],
                                                    );
                                                    setIsDropdownVisible(false);
                                                }}
                                            >
                                                <img
                                                    src={option.img}
                                                    className="w-5 h-5 rounded-full"
                                                    alt="logo"
                                                />
                                                {option.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {isConnected ? (
                                    <div className="-ml-6 py-2">
                                        Balance:{" "}
                                        {finalBalance}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </label>
                        <div
                            onClick={toggleMiddle}
                            className="bg-[#242424] rounded-lg p-[8px] cursor-pointer shadow-black drop-shadow-2xl z-10 "
                        >
                            <svg
                                className="w-6 h-6"
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
                            className="flex flex-row w-full h-full relative bg-slate-600 rounded-xl -mt-4"
                        >
                            <input
                                id="swap1"
                                type="number"
                                className="appearance-none w-full   h-[60px] rounded-md  bg-slate-600 focus:outline-none  focus:border-transparent pl-4 text-2xl pr-6 "
                            />
                            <div className="w-[25%] flex flex-col items-center  mr-3 ">
                                <div
                                    onClick={toggleDropdown2}
                                    className="cursor-pointer flex flex-row mt-2 p-2 gap-3 focus:border-none text-black mr-2 w-[120px] bg-slate-300 rounded-xl justify-around  items-center"
                                >
                                    <img
                                        src={
                                            isConnected
                                                ? selectedToken2.img
                                                : initialToken2.img
                                        }
                                        alt="logo"
                                        className=" w-5 h-5 rounded-full"
                                    />
                                    <div>
                                        {isConnected
                                            ? selectedToken2.name
                                            : initialToken2.name}
                                    </div>

                                    <FiArrowDown />
                                </div>
                                {isDropdownVisible2 && (
                                    <ul className="absolute mt-[50px] py-2 -ml-2 pr-3 bg-white border border-gray-300 rounded-md shadow-lg">
                                        {tokenList.map((option, index) => (
                                            <li
                                                key={index}
                                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex flex-row items-center gap-3"
                                                onClick={() => {
                                                    setInitialToken2(
                                                        initialTokenList[index],
                                                    );
                                                    setSelectedToken2(
                                                        tokenList[index],
                                                    );
                                                    setIsDropdownVisible2(
                                                        false,
                                                    );
                                                }}
                                            >
                                                <img
                                                    src={option.img}
                                                    className="w-5 h-5 rounded-full"
                                                    alt="logo"
                                                />
                                                {option.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {isConnected ? (
                                    <div className="-ml-6 py-2">
                                        Balance:{" "}
                                        {finalBalance2}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </label>

                        <label
                            htmlFor="btn-swap"
                            className={` ${
                                isConnected
                                    ? chain.id === 1 && selectedChainId === 1
                                        ? `bg-slate-600`
                                        : chain.id === selectedChainId
                                        ? `cursor-pointer bg-blue-500 text-black`
                                        : `bg-red-500 cursor-pointer`
                                    : `bg-slate-800`
                            }  mx-auto flex justify-center w-full py-4 rounded-lg mt-5`}
                        >
                            {isConnected ? (
                                chain.id === 1 && selectedChainId === 1 ? (
                                    <div>Mainnet Coming Soon</div>
                                ) : chain.id === selectedChainId ? (
                                    selectedToken.name === "ETH" ||
                                    selectedToken2.name === "ETH" ? (
                                        <div>No Liquidity Pool</div>
                                    ) : selectedToken.name ===
                                      selectedToken2.name ? (
                                        <div>Select other token</div>
                                    ) : !tokenList.some(
                                          (token) =>
                                              token.name === selectedToken.name,
                                      ) ? (
                                        <div>Token not found</div>
                                    ) : !tokenList.some(
                                          (token) =>
                                              token.name ===
                                              selectedToken2.name,
                                      ) ? (
                                        <div>Token not found</div>
                                    ) : (
                                        <input
                                            onClick={() => {
                                                handleSwap();
                                            }}
                                            id="btn-swap"
                                            className="cursor-pointer"
                                            type="button"
                                            value="Swap"
                                        />
                                    )
                                ) : (
                                    <input
                                        onClick={() => {
                                            switchToChain(selectedChainId);
                                        }}
                                        id="btn-swap"
                                        className="cursor-pointer"
                                        type="button"
                                        value="Wrong Network"
                                    />
                                )
                            ) : (
                                <div>Select a token</div>
                            )}
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
}
