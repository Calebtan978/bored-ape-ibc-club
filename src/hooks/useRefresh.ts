import { useContext } from "react";
import { RefreshContext } from "../contexts/RefreshContext";

const useRefresh = () => {
	const { second, minute, hour, refreshAll } = useContext(RefreshContext);
	return { second, minute, hour, refresh: refreshAll };
};

export default useRefresh;
