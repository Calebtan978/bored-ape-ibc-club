import styled from "styled-components";

export const Wrapper = styled.div`
	position: sticky;
	left: 0;
	top: 0;
	width: calc(100vw - 35px - 57px);

	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 70px 35px 20px 40px;
	backdrop-filter: blur(10px);
	z-index: 100;

	/* &:after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.15);
	} */
`;

export const Logo = styled.img`
	width: 50vw;
`;

export const WalletStatus = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 20px;
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
