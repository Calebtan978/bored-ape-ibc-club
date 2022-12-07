import React from "react";
import { DocIcon, GlobeIcon, MediumIcon, TwitterIcon } from "../SvgIcons";
import { Wrapper } from "./styled";

const SocialLinks: React.FC = () => {
	const handleClickSocialLink = (link: string) => {
		window.open(link);
	};
	return (
		<Wrapper>
			<TwitterIcon
				onClick={() =>
					handleClickSocialLink("https://twitter.com/BoredApeIbcClub")
				}
			/>
			<MediumIcon
				onClick={() => handleClickSocialLink("https://discord.gg/MBJvFw9xFQ")}
			/>
			<GlobeIcon
				onClick={() => handleClickSocialLink("http://www.baic.one/")}
			/>
			<DocIcon
				onClick={() =>
					handleClickSocialLink(
						"https://docs.google.com/spreadsheets/d/1Ndev8VdPaKBowyb9LAxTBUtd-8OxMPg5BBQVfPQ6T5w/edit#gid=0"
					)
				}
			/>
		</Wrapper>
	);
};

export default SocialLinks;
