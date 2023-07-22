import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import { initialTokenList } from "../utils/TokenList";
import { useContractWrite, usePrepareContractWrite, useSwitchNetwork, useAccount,useNetwork, useConnect } from "wagmi";
import { ListTokensChainBase } from "../utils/TokenList";
import { InjectedConnector } from "wagmi/connectors/injected";
import AppContext from "../utils/AppContext";
function Tokens() {

    const [selectedChainId,setSelectedChainId] = useState(1);
    const [contractAddress,setContractAddress] = useState("");
    const [abi,setAbi] = useState("");
    const appContext = useContext(AppContext);
    const globalChainId = appContext.chainId;
    const { isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector(),
        chainId: globalChainId,
    });
    const { chain } = useNetwork();
    const { switchNetwork } = useSwitchNetwork();
    const switchToChain = () => {
        if (switchNetwork) {
            switchNetwork(selectedChainId);
           
        }
    };
    const [token, setToken] = useState("ETH");
// const abi = ListTokensChainBase.map(items => items.abi)
    // const contractAddress = "";
    const { config } = usePrepareContractWrite({
        address: contractAddress,
        abi: abi,
        functionName: "mint",
    });
    
    const { data, isLoading, isSuccess, write } = useContractWrite(config);
    
    const handleClaim = async () => {
        if (write && isSuccess) {
            write();
        }
    };
    
    return (
        <>
            <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Claim Faucet</h3>
                    <div className="flex justify-center flex-col items-center">
                        <p>Get free testnet token!</p>
                        <p
                            style={{
                                cursor:"pointer",
                            }}
                            onClick={isConnected ? chain.id!=selectedChainId?chain.id==1?"": switchToChain : handleClaim : connect}

                            className="py-3 px-4 mt-4 rounded-lg  bg-slate-500  "
                        >
                            {isConnected ? chain.id!=selectedChainId? "Wrong Network" : selectedChainId==1?"Not Available": isLoading?"":<div>Claim {token}</div> : "Connect Wallet"}
                            {isLoading && <div className="flex justify-center items-center gap-3"><div className="loading loading-spinner loading-md"></div>Loading...</div>}
                            
                        </p>
                        <div>{isSuccess && (
                                <div>Transaction: {JSON.stringify(data)}</div>
                            )}</div>
                    </div>
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                    </div>
                </form>
            </dialog>
            <Navbar />

            <main className="flex w-full flex-col justify-start px-24">
                <div className="text-4xl font-semibold py-4 ">
                    Top Tokens Available
                </div>
                <div className="overflow-x-auto">
                    <table className="table bg-slate-600">
                        {/* head */}
                        <thead >
                            <tr >
                                <th className="text-lg">Token Name</th>
                                <th className="text-lg">Price</th>
                                <th className="text-lg">Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialTokenList.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img
                                                        src={item.img}
                                                        alt={`Avatar of ${item.name}`}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">
                                                    {item.name}
                                                </div>
                                                <div className="text-sm opacity-50">
                                                    {item.network}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{"NaN"}</td>
                                    <td>{"NaN"}</td>
                                    <th>
                                        <button
                                        disabled={item.idchain==1 || item.idchain==5 || item.name=="USDT"}

                                            onClick={() => {
                                                window.my_modal_1.showModal();
                                                setToken(item.name);
                                                setSelectedChainId(item.idchain); //
                                                setContractAddress(item.contract)
                                                setAbi(item.abi)
                                                

                                            }}
                                            className={`btn btn-ghost btn-md normal-case focus:outline-0 ${item.idchain==1?"text-black":""}`}
                                        >
                                            {item.idchain==1?"coming soon":item.name=="USDT"||item.idchain==5?"Not Available":"Faucet"}
                                        </button>
                                        {/* Open the modal using ID.showModal() method */}
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}

export default Tokens;
