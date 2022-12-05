import { useCallback } from "react";
import { useWalletManager } from "@noahsaso/cosmodal";
import { useAppDispatch } from "../app/hooks";
import {
	BalancesType,
	setTokenBalances,
} from "../features/balances/balancesSlice";
import useContract from "./useContract";
import { setNFTs } from "../features/nfts/nftsSlice";
import Collections, {
	ICollections,
	IOtherCollections,
} from "../constants/Collections";
import { TNFT } from "../types/nft";
import { OtherCollections } from "../constants/Collections";

export const getTokenIdNumber = (id: string): string => {
	if (!id) return "";
	return id.split(".").pop() || "";
};

const useFetch = () => {
	const { getBalances, runQuery } = useContract();
	const dispatch = useAppDispatch();
	const { connectedWallet } = useWalletManager();

	const getTokenBalances = useCallback(async () => {
		const result = await getBalances();
		if (!result) return;
		dispatch(setTokenBalances(result as BalancesType));
	}, [dispatch, getBalances]);

	const fetchMyNFTs = useCallback(() => {
		Collections.forEach(async (collection: ICollections) => {
			if (!connectedWallet) {
				dispatch(setNFTs([collection.collectionId, []]));
			} else {
				const queryResult: any = await runQuery(collection.nftContract, {
					tokens: {
						owner: connectedWallet?.address,
						start_after: undefined,
						limit: 100,
					},
				});
				// const queryResult = {
				// 	tokens: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
				// 		(item) => `${collection.collectionId}.${item}`
				// 	),
				// };
				const nftList: TNFT[] = queryResult?.tokens?.length
					? queryResult.tokens.map((item: string) => ({
							token_id: item,
							collectionId: collection.collectionId,
					  }))
					: [];
				dispatch(setNFTs([collection.collectionId, nftList]));
			}
		});
		OtherCollections.forEach(async (collection: IOtherCollections) => {
			if (!connectedWallet) {
				dispatch(setNFTs([collection.collectionId, []]));
			} else {
				const queryResult: any = await runQuery(collection.nftContract, {
					tokens: {
						owner: connectedWallet?.address,
						start_after: undefined,
						limit: 100,
					},
				});
				const nftList: TNFT[] = queryResult?.tokens?.length
					? queryResult.tokens.map((item: string) => ({
							token_id: item,
							collectionId: collection.collectionId,
					  }))
					: [];
				dispatch(setNFTs([collection.collectionId, nftList]));
			}
		});
	}, [connectedWallet, dispatch, runQuery]);

	return {
		getTokenBalances,
		fetchMyNFTs,
	};
};

export default useFetch;
