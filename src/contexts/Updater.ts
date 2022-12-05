import { useEffect } from "react";
import { useWalletManager } from "@noahsaso/cosmodal";

import useRefresh from "../hooks/useRefresh";
import useFetch from "../hooks/useFetch";
import { clearBalances } from "../features/balances/balancesSlice";

export default function Updater(): null {
	const { minute } = useRefresh();
	const { connectedWallet } = useWalletManager();
	const { getTokenBalances, fetchMyNFTs } = useFetch();

	useEffect(() => {
		if (connectedWallet) {
			getTokenBalances();
		} else {
			clearBalances();
		}
	}, [connectedWallet, getTokenBalances, minute]);

	useEffect(() => fetchMyNFTs(), [minute, connectedWallet, fetchMyNFTs]);

	return null;
}
