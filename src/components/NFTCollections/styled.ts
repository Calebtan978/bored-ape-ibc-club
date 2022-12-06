import styled from "styled-components";

import Text from "../Text";
import { InfoIcon } from "../SvgIcons";

export const Wrapper = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: 6fr 1fr 6fr;
	column-gap: 10px;
	row-gap: 30px;
	justify-items: center;
	align-items: start;
	& > svg {
		align-self: center;
		margin: auto;
		@media (max-width: 1024px) {
			width: 45px;
			height: 45px;
		}
		@media (max-width: 768px) {
			width: 35px;
			height: 35px;
		}
	}
`;

export const NFTImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	& > img {
		width: 60%;
		max-width: 350px;
	}
`;

export const Button = styled.div<{
	color?: string | null;
	background?: string | null;
}>`
	background: ${({ background }) => background ?? "#73FFD0"};
	color: ${({ color }) => color || "black"};
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	box-sizing: border-box;
	border: 3px solid white;
	border-radius: 100px;
	padding: 10px 20px;
	cursor: pointer;
	font-weight: bold;
	font-size: 25px;
	transition: all 0.5s;
	position: relative;
	margin-top: 30px;
	&:hover {
		opacity: 0.8;
	}
	@media (max-width: 1024px) {
		font-size: 20px;
		padding: 10px;
	}
	@media (max-width: 768px) {
		font-size: 16px;
		padding: 5px;
	}
	@media (max-width: 550px) {
		font-size: 14px;
	}
	@media (max-width: 500px) {
		min-width: 100px;
	}
`;

export const NftContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	width: 100%;
`;

export const NFTs = styled.div`
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

export const StyledInfoIcon = styled(InfoIcon)`
	position: absolute;
	right: 0;
	top: 0;
	transform: translate(100%, -50%);
`;

export const TooltipContainer = styled.div`
	padding: 10px 5px;
	font-size: 20px;
	text-align: left;
	& > ul {
		font-weight: bold;
	}
`;

export const StyledText = styled(Text)`
	font-size: 25px;
	@media (max-width: 1024px) {
		font-size: 20px;
	}
	@media (max-width: 768px) {
		font-size: 18px;
	}
`;
