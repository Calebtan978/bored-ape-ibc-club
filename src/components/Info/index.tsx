import React from "react";
import ReactTooltip from "react-tooltip";
import { InfoIcon } from "../SvgIcons";
import {
	BananaLogo,
	InfoContainer,
	InfoItem,
	TooltipContainer,
	Wrapper,
} from "./styled";

const Info: React.FC = () => {
	return (
		<Wrapper>
			<InfoContainer>
				<InfoItem>
					$BANANA CW20 <InfoIcon data-tip data-for="banana-tooltip" />
				</InfoItem>
				<InfoItem>
					TOKEN PRESALE
					<InfoIcon data-tip data-for="presale-tooltip" />
				</InfoItem>
			</InfoContainer>
			<BananaLogo alt="banana-logo" src="/images/basic/banana.png" />
			<ReactTooltip id="banana-tooltip" type="info" effect="solid">
				<TooltipContainer>
					<div>A $BANANA a day keeps the doctor away.</div>
					<div>
						$BANANA (supply 55,550 Tokens on Juno Chain) <br /> is a Meme Token
						which will be given some utilities:
					</div>
					<ul>
						<li>to use $BANANA as a payment method for NFT collections</li>
						<li>Mint SERUMs</li>
						<li>Mutation of NFT Collections in Mutant NFT Version</li>
						<li>Staking Mutants NFT Rewards</li>
						<li>Merchandising purchase 2023</li>
						<li>Cool stuff in coming IRL events 😎</li>
					</ul>
				</TooltipContainer>
			</ReactTooltip>
			<ReactTooltip id="presale-tooltip" type="info" effect="solid">
				<TooltipContainer>Presale Token: 1 $JUNO = 3 $BANANA</TooltipContainer>
			</ReactTooltip>
		</Wrapper>
	);
};

export default Info;
