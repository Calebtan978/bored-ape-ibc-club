import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { resourceLimits } from "worker_threads";
import Collections, {
	CollectionIDs,
	ICollections,
	OtherCollectionIDs,
} from "../../constants/Collections";
import { TNFT } from "../../types/nft";

// const initialState = {
//   unlistedNFTs: [],
//   listedNFTs: [],
//   marketplaceNFTs: [],
//   selectedNFT: {
//     token_id: "",
//     seller: "",
//     list_price: {
//       denom: "",
//       amount: "",
//     },
//     id:""
//   },
// };
export type NFTsStateType = Record<
	`${CollectionIDs | OtherCollectionIDs}`,
	TNFT[]
>;

let initialState: NFTsStateType = {} as NFTsStateType;

Collections.forEach((collection: ICollections) => {
	(initialState as any)[collection.collectionId] = [];
});

export const nftSlice = createSlice({
	name: "nfts",
	initialState,
	reducers: {
		setNFTs: (state, action: PayloadAction<[string, any]>) => {
			const [key, data] = action.payload;
			(state as any)[key] = data;
		},
		// setUnlistedNFTs: (state, action: PayloadAction<[]>) => {
		//   state.unlistedNFTs = action.payload;
		// },
		// setListedNFTs: (state, action: PayloadAction<[]>) => {
		//   state.listedNFTs = action.payload;
		// },
		// setMarketplaceNFTs: (state, action: PayloadAction<[]>) => {
		//   state.marketplaceNFTs = action.payload;
		// },
		// setSelectedNFT: (state, action: PayloadAction<any>) => {
		//   state.selectedNFT = action.payload;
		// },
	},
});

export const {
	setNFTs,
	// setUnlistedNFTs,
	// setListedNFTs,
	// setMarketplaceNFTs,
	// setSelectedNFT,
} = nftSlice.actions;

export default nftSlice.reducer;
