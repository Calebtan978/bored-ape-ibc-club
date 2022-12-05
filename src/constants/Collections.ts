interface IBasicCollections {
	nftContract: string;
	imageUrl: string;
	isMainCollection?: boolean;
}

export interface ICollections extends IBasicCollections {
	collectionId: CollectionIDs;
}
export interface IOtherCollections extends IBasicCollections {
	collectionId: OtherCollectionIDs;
	mintContract: string;
}

export enum CollectionIDs {
	BORED = "bored",
	BORED3D = "bored3d",
}

export enum OtherCollectionIDs {
	SERUM = "serum",
}

const Collections: ICollections[] = [
	{
		collectionId: CollectionIDs.BORED,
		nftContract:
			"juno1xcnjcqes5qdyys0ewr99w6salalaa6st4w3sqcephp6f9uh9qhdsnnarsw",
		imageUrl:
			"https://hopegalaxy.mypinata.cloud/ipfs/QmVVw7R8kYKBVJ15ZnFGdV8EdHLvFcGCC63bQQrtvcesNy/",
	},
	{
		collectionId: CollectionIDs.BORED3D,
		nftContract:
			"juno1vyvdyd70pz3yhnduzfhl098dk5pfpjl8nxmsrm6gmd3f7y5yrxvqw7e892",
		imageUrl:
			"https://hopegalaxy.mypinata.cloud/ipfs/QmUTkHzvm1h1mP8HXnfEg5K9EgprcPncNfbvszoHjoP21N/",
	},
];

export const OtherCollections: IOtherCollections[] = [
	{
		collectionId: OtherCollectionIDs.SERUM,
		nftContract:
			"juno15m4wvp7kzc9765pqrz8z0fdn9mfmgxcwskskx4zvrjt3wmz7f32q47d32q",
		mintContract:
			"juno1e79zdt62gppvnfjs2mknh248dn56vckpxpqtys7yftrcge6srx9qumvmkj",
		imageUrl:
			"https://hopegalaxy.mypinata.cloud/ipfs/QmVcSEZKdG9T5XkWLepCKFvW6d36vveZ1rcmg7KNu5dK8C/",
	},
];

export const getCollectionById = (id: CollectionIDs): ICollections => {
	return (
		Collections.filter(
			(collection: ICollections) => collection.collectionId === id
		)[0] || {}
	);
};

export const getOtherCollectionById = (
	id: OtherCollectionIDs | null
): IOtherCollections => {
	return (
		OtherCollections.filter(
			(collection: IOtherCollections) => collection.collectionId === id
		)[0] || {}
	);
};

export const getCollectionByIdFromTotal = (
	id: CollectionIDs | OtherCollectionIDs | null
): ICollections | IOtherCollections => {
	return (
		[...Collections, ...OtherCollections].filter(
			(collection: ICollections | IOtherCollections) =>
				collection.collectionId === id
		)[0] || {}
	);
};

export default Collections;
