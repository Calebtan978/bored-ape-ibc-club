import React from "react";
import { DocIcon, GlobeIcon, MediumIcon, TwitterIcon } from "../SvgIcons";
import { Wrapper } from "./styled";

const SocialLinks: React.FC = () => {
	return (
		<Wrapper>
			<TwitterIcon />
			<MediumIcon />
			<GlobeIcon />
			<DocIcon />
		</Wrapper>
	);
};

export default SocialLinks;
