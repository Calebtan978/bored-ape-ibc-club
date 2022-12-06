import React from "react";
import { getCollectionByIdFromTotal } from "../../constants/Collections";
import { getTokenIdNumber } from "../../hooks/useFetch";
import { TNFT } from "../../types/nft";
import Text from "../Text";

import { Button, ButtonContainer, Wrapper } from "./styled";
interface INFTItem extends TNFT {
	nextCollection?: boolean;
}

const NFTItem: React.FC<INFTItem> = ({
	token_id,
	collectionId,
	nextCollection,
}) => {
	const collectionInfo = getCollectionByIdFromTotal(collectionId);

	return (
		<Wrapper>
			<img
				alt=""
				src={`${collectionInfo.imageUrl}${getTokenIdNumber(token_id)}.png`}
			/>
			<Text>{token_id}</Text>
			<ButtonContainer>
				<Button
					onClick={() =>
						window.open(`https://hopers.io/nft/detail?token_id=${token_id}`)
					}
				>
					Sell
				</Button>
				{nextCollection && <Button backgroundColor="#5CFF63">Evolve</Button>}
			</ButtonContainer>
		</Wrapper>
	);
};

export default NFTItem;
