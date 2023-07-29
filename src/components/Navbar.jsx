import { useState, useEffect, useContext, useRef } from "react";
// import React from "react";
import NavLink from "./NavLink";
import { Link } from "react-router-dom";
import {
    useAccount,
    useConnect,
    useDisconnect,
    useSwitchNetwork,
    useNetwork,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import AppContext from "../utils/AppContext";

export default function Navbar() {
    const appContext = useContext(AppContext);

    const handleChainSelection = (chainId) => {
        appContext.setChainId(chainId);
    };
    const { chain } = useNetwork();
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const dropdownRef = useRef(null);
    const handleOutsideClick = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);
    const { switchNetwork } = useSwitchNetwork();
    const switchToChain = (chainId) => {
        if (switchNetwork) {
            switchNetwork(chainId);
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        // Set the default network to Ethereum when the component is first rendered
        setNetwork("Ethereum");
    }, []);

    const [network, setNetwork] = useState("Ethereum");
    const [idNetwork, setIdNetwork] = useState(1);
    const [logo, setLogo] = useState(
        "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    );
    const { isConnected, status } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
        chainId: idNetwork,
    });
    const { disconnect } = useDisconnect();

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const toggleDropdown = () => {
        setIsDropdownVisible((prevState) => !prevState);
    };

    const dropdownOptions = [
        {
            name: "Ethereum",
            chainId: 1,
            logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
        },
        {
            name: "Base Goerli",
            chainId: 84531,
            logo: "https://assets.coingecko.com/nft_contracts/images/2989/large/base-introduced.png?1677298371",
        },
        {
            name: "Goerli",
            chainId: 5,
            logo: "https://assets.coingecko.com/coins/images/29217/large//goerli-eth.png?1677429831",
        },
        {
            name: "Base Mainnet",
            chainId: 8453,
            logo: "https://assets.coingecko.com/nft_contracts/images/2989/large/base-introduced.png?1677298371",
        },
        // Add more networks as needed
    ];

    return (
        <div>
            <div className="w-full py-3 flex justify-between text-md  items-center  ">
                <Link 
                    className="md:hidden md:px-6 px-5 font-semibold uppercase text-white"
                    to="/"
                >
                    DKSWAP
                </Link>

                <nav className="md:flex hidden items-center ">
                    <Link
                        className="px-6 font-semibold uppercase text-white"
                        to="/"
                    >
                        DKSWAP
                    </Link>

                    <NavLink href="/">Swap</NavLink>
                    <NavLink href="/liquidity">Liquidity</NavLink>
                    <NavLink href="/tokens">Tokens</NavLink>
                </nav>
                <div className="flex items-center gap-4 pr-5 text-blue-300">
                    <label
                        ref={dropdownRef}
                        htmlFor="network"
                        className="flex flex-row items-center bg-slate-300 md:pl-2 rounded-full md:rounded-md text-black"
                    >
                        <img
                            className="md:w-5 md:h-5 w-8 h-8 bg-transparent rounded-full"
                            src={logo} // Use the logo state here to reflect the selected network's logo
                            alt="logo"
                        />
                        <input
                            type="button"
                            id="network"
                            value={capitalizeFirstLetter(network)}
                            onClick={toggleDropdown}
                            className="cursor-pointer hidden md:flex bg-slate-300 p-2 rounded-md pr-3"
                        />
                        {isDropdownVisible && (
                           <ul className="hidden md:block absolute mt-[225px] py-2 -ml-2 z-10 pr-3 bg-white border border-gray-300 rounded-md shadow-lg">
                           {dropdownOptions.map((option) => (
                               <li
                                   key={option.chainId}
                                   className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex flex-row items-center gap-3"
                                   onClick={() => {
                                       switchToChain(option.chainId);
                                       setNetwork(option.name);
                                       setLogo(option.logo);
                                       handleChainSelection(
                                           option.chainId,
                                       );
                                       setIsDropdownVisible(true);
                                       setIdNetwork(option.chainId);
                                   }}
                               >
                                   <img
                                       src={option.logo}
                                       className="w-5 h-5 rounded-full"
                                       alt="logo"
                                   />
                                   {option.name}
                               </li>
                           ))}
                       </ul>
                        )}
                    </label>
                    {isConnected ? (
                        <button
                            className="bg-red-500 rounded-lg"
                            onClick={() => {
                                chain.id == idNetwork
                                    ? disconnect()
                                    : switchToChain(idNetwork);
                            }} // Call disconnect function when clicked
                        >
                            {chain.id == idNetwork ? (
                                <div className="">
                                    <div className="md:flex hidden">
                                        Disconnect
                                    </div>
                                    <div className="md:hidden">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-black"
                                        >
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                            <polyline points="16 17 21 12 16 7"></polyline>
                                            <line
                                                x1="21"
                                                y1="12"
                                                x2="9"
                                                y2="12"
                                            ></line>
                                        </svg>
                                    </div>
                                </div>
                            ) : (
                                <div className="">
                                    <div className="md:flex hidden">
                                        Wrong Network
                                    </div>
                                    <div className="md:hidden ">
                                        <svg
                                            className="text-black"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                            <line
                                                x1="12"
                                                y1="9"
                                                x2="12"
                                                y2="13"
                                            ></line>
                                            <line
                                                x1="12"
                                                y1="17"
                                                x2="12.01"
                                                y2="17"
                                            ></line>
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </button>
                    ) : (
                        <button
                            className="bg-slate-500 rounded-lg"
                            onClick={() => connect()}
                        >
                            {status === "connecting" ? (
                                <div>Connecting</div>
                            ) : (
                                <div>Connect</div>
                            )}
                        </button>
                    )}
                </div>
            </div>
            {isDropdownVisible && (
                <ul className="md:hidden absolute bottom-[66px] text-white w-full py-2 z-50 md:z-10 pr-3 bg-slate-800 rounded-tl-md rounded-tr-md shadow-lg">
                    {dropdownOptions.map((option) => (
                        <li
                            key={option.chainId}
                            className="px-4 py-2 pt-2 cursor-pointer hover:bg-gray-700 hover:w-full hover:rounded-md flex flex-row items-center gap-3"
                            onClick={() => {
                                switchToChain(option.chainId);
                                setNetwork(option.name);
                                setLogo(option.logo);
                                handleChainSelection(option.chainId);
                                setIsDropdownVisible(true);
                                setIdNetwork(option.chainId);
                            }}
                        >
                            <img
                                src={option.logo}
                                className="w-5 h-5 rounded-full"
                                alt="logo"
                            />
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
