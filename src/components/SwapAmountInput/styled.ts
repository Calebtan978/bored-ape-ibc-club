import styled, { css } from "styled-components";
import Text from "../Text";

export const Button = styled.div<{
	color?: string | null;
	background?: string | null;
	beforeString?: string;
}>`
	min-width: 150px;
	background: ${({ background }) => background ?? "#73FFD0"};
	color: ${({ color }) => color || "black"};
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
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
	${({ beforeString }) =>
		beforeString &&
		css`
			&::before {
				content: "${beforeString}";
				font-size: 20px;
				width: max-content;
				position: absolute;
				top: 0;
				left: 50%;
				transform: translate(-50%, -100%);
				color: white;
			}
		`}
	@media (max-width: 768px) {
		font-size: 20px;
		&::before {
			font-size: 16px;
		}
	}
`;

export const SelectItem = styled.div<{ checked?: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 5px;
	cursor: pointer;
	transition: 0.3s;
	${({ checked }) =>
		checked &&
		css`
			background-color: #6baf33;
		`}
	&:hover {
		background-color: rgba(107, 175, 51, 0.5);
	}
`;

export const CustomControl = styled.div`
	display: flex;
	align-items: center;
	${SelectItem} {
		background-color: unset;
		&:hover {
			background-color: unset;
		}
	}
`;

export const Flex = styled.div<{
	flexDirection?: string;
	gap?: string;
	alignItems?: string;
	justifyContent?: string;
	width?: string;
}>`
	display: flex;
	flex-direction: ${({ flexDirection }) => flexDirection || "row"};
	justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
	align-items: ${({ alignItems }) => alignItems || "center"};
	gap: ${({ gap }) => gap || "5px"};
	${({ width }) =>
		width &&
		css`
			width: ${width};
		`}
`;

export const SwapAmountInputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	gap: 30px;
`;

export const TokenSwapAmountInputer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	align-items: center;
	& > input {
		/* width: 140px; */
		height: 50px;
		outline: none;
		border: 1px solid #02e296;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 10px;
		font-size: 24px;
		text-align: right;
		padding: 0 10px;
	}
`;

export const TokenAmountAutoInputer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 5px;
`;

export const TokenAmountAutoInputItem = styled(Text)`
	cursor: pointer;
	font-size: 20px;
`;

export const TokenImage = styled.img`
	width: 50px;
`;

export const TokenSwapAmountItem = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

export const StyledText = styled(Text)`
	font-size: 20px;
`;

export const TokenSwapAmountPanel = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	gap: 100px;

	@media (max-width: 1024px) {
		gap: 50px;
		${TokenSwapAmountInputer} {
			& > input {
				width: 200px;
			}
		}
	}
	@media (max-width: 768px) {
		gap: 20px;
		${TokenSwapAmountInputer} {
			& > input {
				width: 100px;
			}
		}
		${TokenAmountAutoInputer} {
			${TokenAmountAutoInputItem} {
				font-size: 16px;
			}
		}
		${StyledText} {
			font-size: 16px;
		}
	}
	@media (max-width: 480px) {
		${TokenSwapAmountInputer} {
			& > input {
				height: 40px;
			}
		}
	}

	@media (max-width: 400px) {
		${TokenAmountAutoInputer} {
			gap: 5px;
		}
		& > svg {
			width: 20px;
		}
	}
`;
