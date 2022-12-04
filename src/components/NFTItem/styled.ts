import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`;

export const Button = styled.div`
	background: #ff5c5c;
	color: white;
	width: 60%;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	border: 3px solid white;
	border-radius: 100px;
	padding: 5px;
	cursor: pointer;
	font-weight: bold;
	transition: all 0.5s;
	position: relative;
	&:hover {
		opacity: 0.8;
	}
	@media (max-width: 500px) {
		min-width: 100px;
	}
`;
