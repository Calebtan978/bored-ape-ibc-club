import React, { useEffect, useMemo, useState } from "react";
// import ReactSelect, { ControlProps } from "react-select";
import { toast } from "react-toastify";
import {
	AvailableTokens,
	AvailableTokenType,
	PresaleState,
	SwapAmountType,
} from "./type";
import {
	Button,
	// CustomControl,
	Flex,
	// SelectItem,
	SwapAmountInputWrapper,
	TokenAmountAutoInputer,
	TokenAmountAutoInputItem,
	TokenImage,
	TokenSwapAmountInputer,
	TokenSwapAmountItem,
	TokenSwapAmountPanel,
} from "./styled";
import { useAppSelector } from "../../app/hooks";
import { BasicProps } from "../../constants/BasicTypes";
import { IDOInterface } from "../../constants/IDOs";
import useIDOStatus from "./useIDOStatus";
import { TokenType } from "../../types/tokens";
import Text from "../../components/Text";
// import { SwapCrossIcon } from "../../components/SvgIcons";
import useContract from "../../hooks/useContract";
import CountDown from "../CountDown";
import Loader from "../Loader";

interface SwapAmountInputProps extends BasicProps {
	idoInfo: IDOInterface;
	buyCallback?: any;
}

const SwapAmountInput: React.FC<SwapAmountInputProps> = ({
	idoInfo,
	buyCallback,
}) => {
	const [isPending, setIsPending] = useState(false);
	const [swapAmount, setSwapAmount] = useState<any>({
		[SwapAmountType.ORIGIN]: 0,
		[SwapAmountType.TARGET]: 0,
	});
	const [
		selectedTokenType,
		// setSelectedTokenType
	] = useState<AvailableTokenType>(TokenType.JUNO);

	// const SelectOptions = (
	// 	Object.keys(AvailableTokens) as Array<keyof typeof AvailableTokens>
	// ).map((key) => {
	// 	return {
	// 		value: key,
	// 	};
	// });
	const { idoStatus: basicIdoStatus } = useIDOStatus(idoInfo.id);
	const { runExecute } = useContract();

	const balances = useAppSelector((state) => state.balances);
	const idoStatus = useMemo(() => {
		const tokenBalance = (balances[selectedTokenType]?.amount || 0) / 1e6;

		let ratio = basicIdoStatus.costs[selectedTokenType];

		return {
			...basicIdoStatus,
			ratio,
			tokenBalance,
			balance: `${tokenBalance.toLocaleString("en-Us", {
				maximumFractionDigits: 2,
			})} ${AvailableTokens[selectedTokenType].symbol}`,
		};
	}, [balances, basicIdoStatus, selectedTokenType]);

	useEffect(() => {
		handleChangeSwapAmount(
			SwapAmountType.ORIGIN,
			swapAmount[SwapAmountType.ORIGIN]
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [idoStatus.ratio]);

	const handleChangeSwapAmountInput = (amountType: SwapAmountType, e: any) => {
		const { value } = e.target;
		if (!Number.isNaN(Number(value))) {
			handleChangeSwapAmount(amountType, value);
		}
	};

	const handleChangeSwapAmount = (amountType: SwapAmountType, amount: any) => {
		let newAmountObject = {
			[amountType]: amount,
		};
		if (amountType === SwapAmountType.ORIGIN) {
			newAmountObject[SwapAmountType.TARGET] = Number(amount) * idoStatus.ratio;
		} else {
			newAmountObject[SwapAmountType.ORIGIN] = Number(amount) / idoStatus.ratio;
		}
		setSwapAmount(newAmountObject);
	};

	const handleBuyToken = async () => {
		if (isPending) return;
		if (swapAmount[SwapAmountType.ORIGIN] === 0) {
			toast.error("Invalid amount!");
			return;
		}
		if (idoStatus.crrState === PresaleState.BEFORE) {
			toast.error("Presale is not started");
			return;
		}
		if (idoStatus.crrState === PresaleState.ENDED) {
			toast.error("Presale is ended");
			return;
		}
		try {
			setIsPending(true);
			await runExecute(
				idoInfo.contract,
				{
					buy_token: {},
				},
				{
					funds: `${swapAmount[SwapAmountType.ORIGIN]}`,
					denom: selectedTokenType,
				}
			);
			toast.success("Successfully Buy!");
			setSwapAmount({
				[SwapAmountType.ORIGIN]: 0,
				[SwapAmountType.TARGET]: 0,
			});
			if (buyCallback) buyCallback();
		} catch (e) {
			toast.error("Buying Failed!");
			console.error(e);
		} finally {
			setIsPending(false);
		}
	};

	// const CustomSelectItem = ({ ...props }) => {
	// 	const { selectOption, option } = props;
	// 	return (
	// 		<SelectItem
	// 			onClick={() => {
	// 				if (selectOption) selectOption(option);
	// 			}}
	// 			checked={option.value === selectedTokenType}
	// 		>
	// 			<TokenImage
	// 				alt=""
	// 				src={`/images/coin-images/${option.value.replace(/\//g, "")}.png`}
	// 			/>
	// 		</SelectItem>
	// 	);
	// };

	// const CustomMenuList = (props: any) => {
	// 	const { options, selectOption } = props;
	// 	return options.map((option: any, index: number) => (
	// 		<CustomSelectItem
	// 			key={index}
	// 			selectOption={selectOption}
	// 			option={option}
	// 		/>
	// 	));
	// };

	// const CustomControlItem = ({
	// 	children,
	// 	...props
	// }: ControlProps<any, false>) => {
	// 	return (
	// 		<CustomControl>
	// 			<CustomSelectItem option={{ value: selectedTokenType }} />
	// 			{children}
	// 		</CustomControl>
	// 	);
	// };

	return (
		<>
			<SwapAmountInputWrapper>
				<TokenSwapAmountPanel>
					<TokenSwapAmountItem>
						<TokenImage alt="" src="/images/coin-images/ujuno.png" />
						{/* <ReactSelect
						value={{ value: selectedTokenType }}
						onChange={(value: any) => setSelectedTokenType(value.value)}
						options={SelectOptions}
						styles={{
							container: (provided: any, state: any) => ({
								...provided,
								// margin: "5px 10px",
								border: "1px solid black",
								borderRadius: "5px",
							}),
							dropdownIndicator: (provided: any, state: any) => ({
								...provided,
								color: "black",
							}),
							menu: (provided: any, state: any) => ({
								...provided,
								// backgroundColor: isDark ? "#838383" : "white",
								zIndex: 10,
							}),
						}}
						components={{
							MenuList: CustomMenuList,
							Control: CustomControlItem,
						}}
					/> */}
						<TokenSwapAmountInputer>
							<TokenAmountAutoInputer>
								<TokenAmountAutoInputItem
									onClick={() =>
										handleChangeSwapAmount(
											SwapAmountType.ORIGIN,
											idoStatus.tokenBalance * 0.25
										)
									}
								>
									25%
								</TokenAmountAutoInputItem>
								<TokenAmountAutoInputItem
									onClick={() =>
										handleChangeSwapAmount(
											SwapAmountType.ORIGIN,
											idoStatus.tokenBalance * 0.5
										)
									}
								>
									50%
								</TokenAmountAutoInputItem>
								<TokenAmountAutoInputItem
									onClick={() =>
										handleChangeSwapAmount(
											SwapAmountType.ORIGIN,
											idoStatus.tokenBalance * 0.75
										)
									}
								>
									75%
								</TokenAmountAutoInputItem>
								<TokenAmountAutoInputItem
									onClick={() =>
										handleChangeSwapAmount(
											SwapAmountType.ORIGIN,
											idoStatus.tokenBalance
										)
									}
								>
									100%
								</TokenAmountAutoInputItem>
							</TokenAmountAutoInputer>
							<input
								value={swapAmount[SwapAmountType.ORIGIN]}
								onChange={(e) =>
									handleChangeSwapAmountInput(SwapAmountType.ORIGIN, e)
								}
							/>
							<Text fontSize="20px">{`Balance ${idoStatus.balance}`}</Text>
						</TokenSwapAmountInputer>
					</TokenSwapAmountItem>
					{/* <SwapCrossIcon width={30} /> */}
					<Flex flexDirection="column" alignItems="center" gap="5px">
						<Text fontSize="20px">{`1 ${AvailableTokens[selectedTokenType].symbol} = ${idoStatus.ratio} ${idoInfo.symbol}`}</Text>
						<TokenSwapAmountItem style={{ alignItems: "flex-start" }}>
							<TokenSwapAmountInputer>
								<input
									value={swapAmount[SwapAmountType.TARGET]}
									onChange={(e) =>
										handleChangeSwapAmountInput(SwapAmountType.TARGET, e)
									}
								/>
								<Text fontSize="20px">{idoInfo.symbol}</Text>
							</TokenSwapAmountInputer>
							<TokenImage
								// style={{ marginTop: 10 }}
								src={`/images/coin-images/${idoInfo.id}.png`}
								alt=""
							/>
						</TokenSwapAmountItem>
					</Flex>
				</TokenSwapAmountPanel>
				<Button onClick={handleBuyToken} beforeString="1JUNO = 3BANANA">
					{isPending ? <Loader /> : `BUY ${idoInfo.symbol}`}
				</Button>
			</SwapAmountInputWrapper>
			<CountDown
				time={
					idoStatus.crrState === PresaleState.BEFORE
						? idoStatus.startTime
						: idoStatus.endTime
				}
				completedString="Presale ended"
			/>
		</>
	);
};

export default SwapAmountInput;
