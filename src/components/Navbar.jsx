import { useState, useEffect, useContext } from "react";
import React from "react";
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
            name: "Base",
            chainId: 84531,
            logo: "https://assets.coingecko.com/nft_contracts/images/2989/large/base-introduced.png?1677298371",
        },
        {
            name: "Goerli",
            chainId: 5,
            logo: "https://assets.coingecko.com/coins/images/29217/large//goerli-eth.png?1677429831",
        },
        // Add more networks as needed
    ];

    return (
        <div>
            <div className="py-3 flex justify-between text-md items-center">
                <nav className="flex items-center">
                    <Link
                        className="px-6 font-semibold uppercase text-white"
                        to="/"
                    >
                        DKSWAP
                    </Link>
                    <NavLink href="/">Swap</NavLink>
                    <NavLink href="/about">Liquidity</NavLink>
                    <NavLink href="/gallery">Analyst</NavLink>
                </nav>
                <div className="flex items-center gap-4 pr-5 text-blue-300">
                    <label
                        htmlFor="network"
                        className="flex flex-row items-center bg-slate-300 pl-2 rounded-md text-black"
                    >
                        <img
                            className="w-5 h-5 bg-transparent rounded-full"
                            src={logo} // Use the logo state here to reflect the selected network's logo
                            alt="logo"
                        />
                        <input
                            type="button"
                            id="network"
                            value={capitalizeFirstLetter(network)}
                            onClick={toggleDropdown}
                            className="cursor-pointer bg-slate-300 p-2 rounded-md pr-3"
                        />
                        {isDropdownVisible && (
                            <ul className="absolute mt-48 py-2 -ml-2 pr-3 bg-white border border-gray-300 rounded-md shadow-lg">
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
                                <div> Disconnect</div>
                            ) : (
                                <div> Wrong Network</div>
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
        </div>
    );
}
