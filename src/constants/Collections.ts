export interface ICollections {
	collectionId: CollectionIDs;
	contract: string;
	imageUrl: string;
}

export enum CollectionIDs {
	BORED = "bored",
	BORED3D = "bored3d",
}

const Collections: ICollections[] = [
	{
		collectionId: CollectionIDs.BORED,
		contract: "juno1xcnjcqes5qdyys0ewr99w6salalaa6st4w3sqcephp6f9uh9qhdsnnarsw",
		imageUrl:
			"https://hopegalaxy.mypinata.cloud/ipfs/QmVVw7R8kYKBVJ15ZnFGdV8EdHLvFcGCC63bQQrtvcesNy/",
	},
	{
		collectionId: CollectionIDs.BORED3D,
		contract: "juno1vyvdyd70pz3yhnduzfhl098dk5pfpjl8nxmsrm6gmd3f7y5yrxvqw7e892",
		imageUrl:
			"https://hopegalaxy.mypinata.cloud/ipfs/QmUTkHzvm1h1mP8HXnfEg5K9EgprcPncNfbvszoHjoP21N/",
	},
];

export const getCollectionById = (id: CollectionIDs): ICollections => {
	return (
		Collections.filter(
			(collection: ICollections) => collection.collectionId === id
		)[0] || {}
	);
};

export default Collections;
