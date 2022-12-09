import styled from "styled-components";

export const Wrapper = styled.div`
	position: sticky;
	left: 0;
	top: 0;
	width: 100vw;
	max-width: 100%;
	box-sizing: border-box;

	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;

	padding: 70px 35px 20px 40px;
	backdrop-filter: blur(10px);
	z-index: 100;

	@media (max-width: 900px) {
		flex-direction: column;
		gap: 20px;
	}

	@media (max-width: 768px) {
		padding: 50px 20px 20px;
	}
`;

export const Logo = styled.img`
	width: 50%;
	min-width: 300px;
	max-width: 600px;
	@media (max-width: 768px) {
		width: 40%;
	}
`;

export const WalletStatus = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 20px;
	@media (max-width: 1024px) {
		gap: 10px;
	}
`;

export const WalletStatusItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ConnectWalletButton = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	position: relative;
	box-sizing: border-box;
	outline: 0;
	border: 1px solid #fff;
	border-radius: 15px;
	cursor: pointer;
	user-select: none;
	vertical-align: middle;
	text-decoration: none;
	font-weight: bold;
	font-size: 0.875rem;
	line-height: 1.75;
	letter-spacing: 0.02857em;
	text-transform: uppercase;
	width: max-content;
	max-width: 400px;
	min-width: 200px;
	height: 65px;
	padding: 6px 16px;
	color: #fff;
	background: transparent;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
		0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
	transition: box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
		border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
		color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	& > span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	&:hover {
		text-decoration: none;
		/* background-color: #1b5e20; */
		box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
			0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
	}
`;

export const WalletIcon = styled.img`
	width: 40px;
`;
