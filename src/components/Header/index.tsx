import React, { useMemo } from "react";
import { useWalletManager } from "@noahsaso/cosmodal";

import { useAppSelector } from "../../app/hooks";
import { NFTsStateType } from "../../features/nfts/nftsSlice";
import {
	ConnectWalletButton,
	Logo,
	WalletIcon,
	WalletStatus,
	WalletStatusItem,
	Wrapper,
} from "./styled";
import Text from "../Text";
import { TokenType } from "../../types/tokens";

const Header: React.FC = () => {
	const { connect, disconnect, connectedWallet } = useWalletManager();
	const balances = useAppSelector((state) => state.balances);
	const nfts = useAppSelector((state) => state.nfts);

	const totalNFTs = useMemo(() => {
		let total = 0;
		Object.keys(nfts).forEach(
			(key: any) => (total += nfts[key as keyof NFTsStateType]?.length || 0)
		);
		return total;
	}, [nfts]);

	const tokenBalance = useMemo(
		() => +(balances[TokenType.BANANA]?.amount || "0") / 1e6,
		[balances]
	);

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
				<WalletStatusItem>
					<Text>NFTs Balance</Text>
					<Text bold fontSize="20px">
						{totalNFTs}
					</Text>
				</WalletStatusItem>
				<WalletStatusItem>
					<Text>Token Balance</Text>
					<Text bold fontSize="20px">
						{tokenBalance}
						<Text fontSize="16px">$BANANA</Text>
					</Text>
				</WalletStatusItem>
				<ConnectButton />
			</WalletStatus>
		</Wrapper>
	);
};

export default Header;
