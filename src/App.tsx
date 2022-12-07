import React from "react";
import "./App.css";
import Header from "./components/Header";
import Info from "./components/Info";
import NFTCollections from "./components/NFTCollections";
import SocialLinks from "./components/SocialLinks";
import SwapAmountInput from "./components/SwapAmountInput";
import Text from "./components/Text";
import { IDOs } from "./constants/IDOs";

function App() {
	return (
		<div className="App">
			<Header />
			<Info />
			<SwapAmountInput idoInfo={IDOs[0]} />
			<Text margin="100px 0 50px 0" fontSize="60px" bold>
				NFT BAIC COLLECTIONS
			</Text>
			<NFTCollections />

			<Text bold margin="100px 0" fontSize="30px" color="#D0D0D0">
				...to be continue
			</Text>
			<Text bold margin="100px 0" fontSize="30px">
				NFT BAIC MERCHANDISING
			</Text>
			<Text bold margin="100px 0" fontSize="30px" color="#D0D0D0">
				Coming Soon
			</Text>
			<SocialLinks />
		</div>
	);
}

export default App;
