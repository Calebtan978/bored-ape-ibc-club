import React, { useState, useEffect, useRef, useCallback } from "react";

const SECOND_INTERVAL = 1000 * 10; // 10s
const MINUTE_INTERVAL = 1000 * 60; // 1min
const HOUR_INTERVAL = 1000 * 60 * 60; // 1h

const RefreshContext = React.createContext({
	second: 0,
	minute: 0,
	hour: 0,
	refreshAll: () => {},
});

// Check if the tab is active in the user browser
const useIsBrowserTabActive = () => {
	const isBrowserTabActiveRef = useRef(true);

	useEffect(() => {
		const onVisibilityChange = () => {
			isBrowserTabActiveRef.current = !document.hidden;
		};

		window.addEventListener("visibilitychange", onVisibilityChange);

		return () => {
			window.removeEventListener("visibilitychange", onVisibilityChange);
		};
	}, []);

	return isBrowserTabActiveRef;
};

// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
const RefreshContextProvider = ({ children }: { children: any }) => {
	const [secondValue, setSecondValue] = useState(0);
	const [minuteValue, setMinuteValue] = useState(0);
	const [hourValue, setHourValue] = useState(0);
	const isBrowserTabActiveRef = useIsBrowserTabActive();

	useEffect(() => {
		const interval = setInterval(async () => {
			if (isBrowserTabActiveRef.current) {
				setSecondValue((prev) => prev + 1);
			}
		}, SECOND_INTERVAL);
		return () => clearInterval(interval);
	}, [isBrowserTabActiveRef]);

	useEffect(() => {
		const interval = setInterval(async () => {
			if (isBrowserTabActiveRef.current) {
				setMinuteValue((prev) => prev + 1);
			}
		}, MINUTE_INTERVAL);
		return () => clearInterval(interval);
	}, [isBrowserTabActiveRef]);

	useEffect(() => {
		const interval = setInterval(async () => {
			if (isBrowserTabActiveRef.current) {
				setHourValue((prev) => prev + 1);
			}
		}, HOUR_INTERVAL);
		return () => clearInterval(interval);
	}, [isBrowserTabActiveRef]);

	const refreshAll = useCallback(() => {
		setSecondValue((prev) => prev + 1);
		setMinuteValue((prev) => prev + 1);
		setHourValue((prev) => prev + 1);
	}, []);

	return (
		<RefreshContext.Provider
			value={{
				second: secondValue,
				hour: hourValue,
				minute: minuteValue,
				refreshAll,
			}}
		>
			{children}
		</RefreshContext.Provider>
	);
};

export { RefreshContext, RefreshContextProvider };
