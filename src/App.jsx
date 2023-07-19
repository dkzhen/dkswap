import React from "react";
import Router from "./components/Router";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
export default function App() {
    const config = createConfig({
        autoConnect: true,
        publicClient: createPublicClient({
            chain: mainnet,
            transport: http(),
        }),
    });
    return (
        <>
            <WagmiConfig config={config}>
                <main className="w-screen h-screen bg-[#242424]">
                    <Router />
                </main>
            </WagmiConfig>
        </>
    );
}
