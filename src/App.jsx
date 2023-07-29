// import React from "react";
import Router from "./components/Router";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { base, baseGoerli, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, baseGoerli, goerli, base],
    [
        alchemyProvider({ apiKey: "DT1x7qjYkbtRRP9EdCj7fUupn7LneXqV" }),
        publicProvider(),
    ],
);
const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({
            chains,
            options: {
                UNSTABLE_shimOnConnectSelectAccount: true,
                shimDisconnect: true,
            },
        }),
    ],
    publicClient,
    webSocketPublicClient,
});
export default function App() {
    return (
        <>
            <WagmiConfig config={config}>
                <main className=" bg-[#242424]">
                    <Router />
                </main>
            </WagmiConfig>
        </>
    );
}
