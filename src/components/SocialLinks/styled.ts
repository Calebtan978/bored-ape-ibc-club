import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	gap: 20px;
	align-items: center;
	justify-content: center;
	margin: 30px 0 50px;
	& > svg {
		height: 40px;
	}
	@media (max-width: 500px) {
		gap: 10px;
		& > svg {
			height: 30px;
		}
	}
`;
