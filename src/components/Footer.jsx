import NavLink from "./NavLink";


export default function Footer() {


    return (
        <div>
            <div className="py-3 px-4 flex md:hidden border-t-2 border-slate-500 justify-between text-md items-center">
                <NavLink href="/">Swap</NavLink>
                <NavLink href="/liquidity">Liquidity</NavLink>
                <NavLink href="/tokens">Tokens</NavLink>
            </div>
        </div>
    );
}
