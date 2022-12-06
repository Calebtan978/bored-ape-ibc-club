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
		description: "",
		contract: "juno1y8qxa80a2dsxwllv89ktjlgzr00kjatd6khzqmmxeaaudcezasxsc4qt6d",
	},
];

export const getIDOById = (id: IDOIds): IDOInterface => {
	return IDOs.filter((ido: IDOInterface) => ido.id === id)[0] || {};
};
