import { WalletManagerProvider, WalletType } from "@noahsaso/cosmodal";
import { ChainConfigs, ChainTypes } from "../constants/ChainTypes";

const WalletProvider = ({ children }: { children: any }) => {
	const config = ChainConfigs[ChainTypes.JUNO];
	return (
		<WalletManagerProvider
			defaultChainId={config.chainId}
			enabledWalletTypes={[WalletType.Keplr, WalletType.WalletConnectKeplr]}
			localStorageKey="keplr-wallet"
			walletConnectClientMeta={{
				name: "BORED APE IBC CLUB",
				description: "",
				url: "https://home-5011087114.app-ionos.space/",
				icons: ["https://home-5011087114.app-ionos.space/logo.png"],
			}}
		>
			{children}
		</WalletManagerProvider>
	);
};

export default WalletProvider;
