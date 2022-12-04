import {
	CosmWasmClient,
	SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { GasPrice } from "@cosmjs/stargate";
import { coins } from "@cosmjs/proto-signing";
import { useWallet, useWalletManager } from "@noahsaso/cosmodal";
import { useCallback } from "react";
import { toMicroAmount } from "../utils/coins";
import { TokenStatus, TokenType } from "../types/tokens";
import { ChainConfigs, ChainTypes } from "../constants/ChainTypes";

declare global {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface Window extends KeplrWindow {}
}

const getQueryClient = async (
	config: {
		[key: string]: string;
	},
	forceRefresh = false
): Promise<CosmWasmClient> => {
	const rpcEndpoint: string = config["rpcEndpoint"];
	const queryingClientConnection = {
		client: await CosmWasmClient.connect(rpcEndpoint),
		rpcEndpoint,
	};

	return queryingClientConnection.client;
};

export const getOfflineSigner = async (chainId: string) => {
	if (window.keplr) {
		await window.keplr.enable(chainId);
		const signer: any = await window.keplr.getOfflineSignerAuto(chainId);
		const signer1 = await window.keplr.getOfflineSignerOnlyAmino(chainId);
		const signer2 = await window.keplr.getOfflineSignerAuto(chainId);
		return signer || signer1 || signer2;
	}
};

const useContract = () => {
	// const contracts = useAppSelector(contractAccounts);
	// const { connect } = useWalletManager();

	const { connectedWallet } = useWalletManager();
	const { offlineSigner, signingCosmWasmClient } = useWallet(
		ChainConfigs[ChainTypes.JUNO].chainId
	);

	const runQuery = useCallback(
		async (contractAddress: string, queryMsg: any) => {
			if (signingCosmWasmClient) {
				const result = await signingCosmWasmClient?.queryContractSmart(
					// contract.address,
					contractAddress,
					queryMsg
				);
				return result;
			} else {
				const client = await getQueryClient(ChainConfigs[ChainTypes.JUNO]);
				const result = await client.queryContractSmart(
					contractAddress,
					queryMsg
				);
				return result;
			}
		},
		[signingCosmWasmClient]
	);

	const runExecute = useCallback(
		async (
			contractAddress: string,
			executeMsg: any,
			option?: {
				memo?: string;
				funds?: string;
				denom?: string;
			}
		) => {
			const config = ChainConfigs[ChainTypes.JUNO];
			let signer = offlineSigner;
			if (!offlineSigner) {
				signer = await getOfflineSigner(config.chainId);
			}
			if (!signer) {
				throw new Error("No account selected");
			}

			const executeMemo = option?.memo || "";
			const executeFunds = option?.funds || "";
			const executeDenom = option?.denom || "";

			const cwClient = await SigningCosmWasmClient.connectWithSigner(
				config["rpcEndpoint"],
				signer,
				{
					gasPrice: GasPrice.fromString(
						`${config["gasPrice"]}${config["microDenom"]}`
					),
				}
			);

			// return client.execute(
			//   account.address,
			//   contract.address,
			//   executeMsg,
			//   "auto",
			//   executeMemo,
			//   executeFunds
			//     ? coins(
			//         toMicroAmount(
			//           executeFunds,
			//           state.connection.config["coinDecimals"]
			//         ),
			//         state.connection.config["microDenom"]
			//       )
			//     : undefined
			// );
			return cwClient.execute(
				connectedWallet?.address || "",
				// contract.address,
				contractAddress,
				executeMsg,
				"auto",
				executeMemo,
				executeFunds
					? coins(
							toMicroAmount(
								executeFunds,
								ChainConfigs[ChainTypes.JUNO]["coinDecimals"]
							),
							executeDenom || ChainConfigs[ChainTypes.JUNO]["microDenom"]
					  )
					: undefined
			);
		},
		[offlineSigner, connectedWallet]
	);

	const getBalances = useCallback(async () => {
		if (!offlineSigner) return {};
		const config = ChainConfigs[ChainTypes.JUNO];

		const cwClient = await SigningCosmWasmClient.connectWithSigner(
			config["rpcEndpoint"],
			offlineSigner,
			{
				gasPrice: GasPrice.fromString(
					`${config["gasPrice"]}${config["microDenom"]}`
				),
			}
		);
		const denoms: { denom: TokenType; isNativeCoin: boolean }[] = [];
		const queries = (
			Object.keys(TokenType) as Array<keyof typeof TokenType>
		).map((key) => {
			const tokenStatus = TokenStatus[TokenType[key]];
			denoms.push({
				denom: TokenType[key],
				isNativeCoin: tokenStatus.isNativeCoin,
			});
			return !tokenStatus.isNativeCoin && tokenStatus.contractAddress
				? runQuery(tokenStatus.contractAddress, {
						balance: { address: connectedWallet?.address },
				  })
				: cwClient.getBalance(connectedWallet?.address || "", TokenType[key]);
		});
		return await Promise.all(queries)
			.then((results: any) => {
				let returnValue: { [key in TokenType]: any } = {} as {
					[key in TokenType]: any;
				};
				denoms.forEach(
					(
						denom: { denom: TokenType; isNativeCoin: boolean },
						index: number
					) => {
						const crrResult = results[index];
						returnValue[denom.denom] = {
							denom: denom.denom,
							amount: Number(
								denom.isNativeCoin ? crrResult.amount : crrResult.balance
							),
						};
					}
				);
				return returnValue;
			})
			.catch((err: any) => {
				console.error("get balance error", err);
				return {};
			});
	}, [offlineSigner, runQuery, connectedWallet]);

	return {
		// initContracts,
		getBalances,
		runQuery,
		runExecute,
	};
};

export default useContract;
