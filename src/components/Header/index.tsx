import React from "react";
import { useWalletManager } from "@noahsaso/cosmodal";

// import { useAppSelector } from "../../app/hooks";
import {
	ConnectWalletButton,
	Logo,
	WalletIcon,
	WalletStatus,
	Wrapper,
} from "./styled";

const Header: React.FC = () => {
	const { connect, disconnect, connectedWallet } = useWalletManager();
	// const balances = useAppSelector((state) => state.balances);

	const handleClickConnectButton = () => {
		if (connectedWallet) {
			disconnect();
		} else {
			connect();
		}
	};

	const ConnectButton = () => (
		<ConnectWalletButton onClick={handleClickConnectButton}>
			{connectedWallet ? (
				connectedWallet.name
			) : (
				<>
					<WalletIcon alt="wallet-icon" src="/keplr-wallet-extension.png" />
					Connect Wallet
				</>
			)}
		</ConnectWalletButton>
	);
	return (
		<Wrapper>
			<Logo alt="logo" src="/images/basic/logo.png" />
			<WalletStatus>
				<ConnectButton />
			</WalletStatus>
		</Wrapper>
	);
};

export default Header;
