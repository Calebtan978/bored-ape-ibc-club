export enum IDOIds {
	BANANA = "banana",
}

export interface IDOInterface {
	id: IDOIds;
	name: string;
	symbol: string;
	description: string;
	contract: string;
}

export const IDOs: IDOInterface[] = [
	{
		id: IDOIds.BANANA,
		name: "BANANA TOKEN",
		symbol: "$BANANA",
		description:
			"Hopers token is the utility token of the all-in-one platform hopers.io. It powers the ecosystem to allow you to be part of our growth and gives you access to staking, syrup pool, early IDO opportunities, yield farming, and liquidity.",
		contract: "juno1qze47ja2etk9j0vsewf3fruewlapnjgqqdejqr7v706k69x5gk0q0e5jtc",
	},
];

export const getIDOById = (id: IDOIds): IDOInterface => {
	return IDOs.filter((ido: IDOInterface) => ido.id === id)[0] || {};
};
