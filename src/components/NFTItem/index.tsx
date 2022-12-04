import React from "react";
import { Button, Wrapper } from "./styled";
import { getCollectionById } from "../../constants/Collections";
import { getTokenIdNumber } from "../../hooks/useFetch";
import { TNFT } from "../../types/nft";
import Text from "../Text";

const NFTItem: React.FC<TNFT> = ({ token_id, collectionId }) => {
	const collectionInfo = getCollectionById(collectionId);

	return (
		<Wrapper>
			<img
				alt=""
				width={100}
				src={`${collectionInfo.imageUrl}${getTokenIdNumber(token_id)}.png`}
			/>
			<Text>{token_id}</Text>
			<Button
				onClick={() =>
					window.open(`https://hopers.io/nft/detail?token_id=${token_id}`)
				}
			>
				Sell
			</Button>
		</Wrapper>
	);
};

export default NFTItem;
