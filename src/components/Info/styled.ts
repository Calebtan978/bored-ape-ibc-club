import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`;

export const InfoContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

export const InfoItem = styled.div`
	position: relative;
	padding: 10px 40px 10px 5px;
	font-size: 40px;
	font-weight: 700;
	& > svg {
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
	}
	@media (max-width: 1024px) {
		font-size: 30px;
	}
	@media (max-width: 768px) {
		font-size: 25px;
	}
	@media (max-width: 500px) {
		font-size: 20px;
	}
`;

export const TooltipContainer = styled.div`
	padding: 10px 5px;
	font-size: 20px;
	text-align: left;
`;

export const BananaLogo = styled.img`
	margin: 20px 0;
	max-width: 50%;
	min-width: 200px;
`;
