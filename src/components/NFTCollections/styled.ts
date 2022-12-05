import styled from "styled-components";

import { InfoIcon } from "../SvgIcons";

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 40% 20% 40%;
	grid-gap: 10px;
	justify-items: center;
	align-items: start;
	& > svg {
		align-self: center;
	}
`;

export const NFTImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Button = styled.div<{
	color?: string | null;
	background?: string | null;
}>`
	background: ${({ background }) => background ?? "#73FFD0"};
	color: ${({ color }) => color || "black"};
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
	@media (max-width: 500px) {
		min-width: 100px;
	}
`;

export const NftContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`;

export const NFTs = styled.div`
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
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
