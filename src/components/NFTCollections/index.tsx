import React, { useCallback, useMemo, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useAppSelector } from "../../app/hooks";
import Collections, {
	CollectionIDs,
	ICollections,
} from "../../constants/Collections";
import { TNFT } from "../../types/nft";
import NFTItem from "../NFTItem";
import { HorizontalEqualIcon, PlusIcon, VerticalEqualIcon } from "../SvgIcons";
import Text from "../Text";
import {
	OtherCollectionIDs,
	getOtherCollectionById,
} from "../../constants/Collections";
import {
	Button,
	NftContainer,
	NFTImageContainer,
	NFTs,
	StyledInfoIcon as InfoIcon,
	TooltipContainer,
	Wrapper,
} from "./styled";
import { useWalletManager } from "@noahsaso/cosmodal";
import useContract from "../../hooks/useContract";
import { TokenType } from "../../types/tokens";
import Loader from "../Loader";
import useFetch from "../../hooks/useFetch";

type TBasicComponents = {
	[CollectionIDs.BORED]: any;
	operator: any;
	[CollectionIDs.BORED3D]: any;
};

type TRenderComponents = {
	nftImage: TBasicComponents;
	nftContainer: TBasicComponents;
	operator: TBasicComponents;
	nextNftImage: TBasicComponents;
	nextNftContainer: TBasicComponents;
};

const renderInfo = {
	collectionName: {
		[CollectionIDs.BORED]: "BAIC",
		[CollectionIDs.BORED3D]: "BAIC 3D",
	},
	tooltip: {
		[CollectionIDs.BORED]: (
			<>
				<div>No Apes were harmed</div>
				<div>
					The first collection to be launched will be <br /> BORED APE IBC CLUB
					which will have a <br />
					limited number of 500 NFTs. <br />
					Each Bored Ape is unique and <br />
					programmatically generated from many <br />
					possible traits, including expression, <br />
					headwear, clothing, and more. <br />
					All apes are Bored, but some are rarer than others
				</div>
			</>
		),
		[CollectionIDs.BORED3D]: (
			<>
				<div>No monkeys were harmed</div>
				<div>
					The second collection to be launched will be <br />
					BORED APE IBC CLUB 3D, like the first one <br />
					will have a limited number of 500 NFTs. <br />
					Also in that case Each Bored Ape 3D is unique and <br />
					programmatically generated from Many <br />
					possible traits, including expression, <br />
					headwear, clothing, and more. <br />
					All apes are Bored, but some are rarer than others
				</div>
			</>
		),
	},
	nextCollectionName: {
		[CollectionIDs.BORED]: "S1 SERUM",
		[CollectionIDs.BORED3D]: "MUTANT BAIC",
	},
	nextButtonString: {
		[CollectionIDs.BORED]: "MINT NFT S1 SERUM",
		[CollectionIDs.BORED3D]: "NFT M1 MUTANT BAIC",
	},
	"tooltip-next": {
		[CollectionIDs.BORED]: (
			<>
				<div>Please, Don't try this at home</div>
				<div>
					Only 100 brave owners will be able to transform a BAIC + <br />a
					BAIC3D into and exclusive M1 MUTANT BAIC. <br />
					To make this happen, magical s! SERUM will be launched <br />
					that will allow the merger of the 2 collections! <br />
					This will create a more exclusive market and M1 Mutant <br />
					BAIC holders will be able to stake their NFT to participate <br />
					in the weekly rewards to $BANANA TOKEN.
				</div>
				<Text bold margin="10px 0">
					Mint NFT S1 Serum
				</Text>
				<ul>
					<li>100 Items SERUM 1</li>
					<li>Only WL (BAIC, BAIC3D)</li>
					<li>1 SERUM = 5 JUNO + 15 $BANANA</li>
					<li>1 BAIC PRIZE x 1 LUCKY WINNER</li>
					<li>50 $JUNO MINT BONUS</li>
					<li>150 $BANANA MINT BONUS</li>
					<li>$BANANA PRESALE IS LIVE ON BAIC.ONE</li>
				</ul>
			</>
		),
		[CollectionIDs.BORED3D]: (
			<>
				<div>Even if it evolves, it's not a pokemon</div>
				<div>
					Only 100 brave owners will be able to transform a BAIC + <br />a
					BAIC3D into and exclusive MUTANT BAIC 1. <br />
					To make this happen, magical Serums 1 will be launched <br />
					that will allow the merger of the 2 collections! <br />
					This will create a more exclusive market and <br />
					BAICMUTANT holders will be able to stake their NFT to <br />
					participate in the weekly rewards of $BANANA TOKEN.
				</div>
				<Text bold margin="10px 0">
					100 M1 MUTANT BAIC
				</Text>
				<Text bold margin="10px 0">
					BAIC + BAIC 3D + SERUM = MINT MUTANT BAIC
				</Text>
			</>
		),
	},
	relatedCollections: {
		[CollectionIDs.BORED]: OtherCollectionIDs.SERUM,
		[CollectionIDs.BORED3D]: null,
	},
};

const renderOrder: (
	| "nftImage"
	| "nftContainer"
	| "operator"
	| "nextNftImage"
	| "nextNftContainer"
)[] = [
	"nftImage",
	"nftContainer",
	"operator",
	"nextNftImage",
	"nextNftContainer",
];

const NFTCollections: React.FC = () => {
	const [isMintingSerum, setIsMintingSerum] = useState<any>({});
	const { connectedWallet } = useWalletManager();
	const { runQuery, runExecute } = useContract();
	const { fetchMyNFTs } = useFetch();
	const nfts = useAppSelector((state) => state.nfts);

	const handleMintSerum = useCallback(
		async (collectionId: CollectionIDs) => {
			if (isMintingSerum[collectionId]) return;
			if (!connectedWallet) return;
			if (!renderInfo.relatedCollections[collectionId]) return;
			const collectionInfo = getOtherCollectionById(
				renderInfo.relatedCollections[collectionId]
			);
			try {
				setIsMintingSerum((prev: any) => ({ ...prev, [collectionId]: true }));
				const mintStateInfo = await runQuery(collectionInfo.mintContract, {
					get_state_info: { address: connectedWallet.address },
				});
				const tokenStateInfo = await runQuery(mintStateInfo.token_address, {
					allowance: {
						owner: connectedWallet.address,
						spender: collectionInfo.mintContract,
					},
				});
				if (
					+(tokenStateInfo?.allowance || "0") <
					+(mintStateInfo?.token_price || "0")
				) {
					await runExecute(mintStateInfo.token_address, {
						increase_allowance: {
							spender: collectionInfo.mintContract,
							amount: `${mintStateInfo.token_price || 0}`,
						},
					});
				}
				await runExecute(
					collectionInfo.mintContract,
					{
						mint: {},
					},
					mintStateInfo?.token_price === "0"
						? {}
						: {
								funds: `${+(mintStateInfo.coin_price || "0") / 1e6}`,
								denom: TokenType.JUNO,
						  }
				);
			} catch (e) {
				console.log("mint error", e);
			} finally {
				setIsMintingSerum((prev: any) => ({ ...prev, [collectionId]: false }));
				fetchMyNFTs();
			}
		},
		[connectedWallet, fetchMyNFTs, isMintingSerum, runExecute, runQuery]
	);

	const RenderComponents = useMemo(() => {
		let result: TRenderComponents = {
			nftImage: {
				operator: <PlusIcon />,
				[CollectionIDs.BORED]: <div />,
				[CollectionIDs.BORED3D]: <div />,
			},
			nftContainer: {
				operator: <div />,
				[CollectionIDs.BORED]: <div />,
				[CollectionIDs.BORED3D]: <div />,
			},
			operator: {
				operator: <div />,
				[CollectionIDs.BORED]: <PlusIcon />,
				[CollectionIDs.BORED3D]: <VerticalEqualIcon />,
			},
			nextNftImage: {
				operator: <HorizontalEqualIcon />,
				[CollectionIDs.BORED]: <div />,
				[CollectionIDs.BORED3D]: <div />,
			},
			nextNftContainer: {
				operator: <div />,
				[CollectionIDs.BORED]: <div />,
				[CollectionIDs.BORED3D]: <div />,
			},
		};
		Collections.forEach((collection: ICollections) => {
			const crrNfts = nfts[collection.collectionId] || [];
			const relatedCollectionId =
				renderInfo.relatedCollections[collection.collectionId];
			const crrNextNfts = relatedCollectionId ? nfts[relatedCollectionId] : [];

			result.nftImage[collection.collectionId] = (
				<NFTImageContainer>
					<img alt="" src={`/images/nft/${collection.collectionId}.png`} />
					<Button
						onClick={() =>
							window.open(
								`https://hopers.io/collections/marketplace?id=${collection.collectionId}`
							)
						}
					>
						TRADE NFT {renderInfo.collectionName[collection.collectionId]}
						<InfoIcon
							data-tip
							data-for={`${collection.collectionId}-tooltip`}
						/>
					</Button>
				</NFTImageContainer>
			);
			result.nftContainer[collection.collectionId] = (
				<NftContainer>
					<Text fontSize="25px" bold>
						My NFTs {renderInfo.collectionName[collection.collectionId]}:{" "}
						{crrNfts?.length || 0}
					</Text>
					<NFTs>
						{crrNfts?.map((nft: TNFT, index: number) => (
							<NFTItem key={index} {...nft} />
						))}
					</NFTs>
				</NftContainer>
			);
			result.nextNftImage[collection.collectionId] = (
				<NFTImageContainer>
					<img
						alt=""
						src={`/images/nft/next-${collection.collectionId}.${
							collection.collectionId === CollectionIDs.BORED ? "gif" : "png"
						}`}
					/>
					<Button onClick={() => handleMintSerum(collection.collectionId)}>
						{isMintingSerum[collection.collectionId] ? (
							<Loader />
						) : (
							renderInfo.nextButtonString[collection.collectionId]
						)}
						<InfoIcon
							data-tip
							data-for={`${collection.collectionId}-tooltip-next`}
						/>
					</Button>
				</NFTImageContainer>
			);
			result.nextNftContainer[collection.collectionId] = (
				<NftContainer>
					<Text fontSize="25px" bold>
						My NFTs {renderInfo.nextCollectionName[collection.collectionId]}:{" "}
						{crrNextNfts?.length || 0}
					</Text>
					<NFTs>
						{crrNextNfts?.map((nft: TNFT, index: number) => (
							<NFTItem key={index} {...nft} nextCollection />
						))}
					</NFTs>
				</NftContainer>
			);
		});
		return result;
	}, [nfts, isMintingSerum, handleMintSerum]);

	return (
		<Wrapper>
			{renderOrder.map((order) => (
				<>
					{RenderComponents[order][CollectionIDs.BORED]}
					{RenderComponents[order]["operator"]}
					{RenderComponents[order][CollectionIDs.BORED3D]}
				</>
			))}
			{Collections.map((collection) => (
				<>
					<ReactTooltip
						key={`${collection.collectionId}-tooltip`}
						type="info"
						effect="solid"
						id={`${collection.collectionId}-tooltip`}
					>
						<TooltipContainer>
							{renderInfo.tooltip[collection.collectionId]}
						</TooltipContainer>
					</ReactTooltip>
					<ReactTooltip
						key={`${collection.collectionId}-tooltip-next`}
						type="info"
						effect="solid"
						id={`${collection.collectionId}-tooltip-next`}
					>
						<TooltipContainer>
							{renderInfo["tooltip-next"][collection.collectionId]}
						</TooltipContainer>
					</ReactTooltip>
				</>
			))}
		</Wrapper>
	);
};

export default NFTCollections;
