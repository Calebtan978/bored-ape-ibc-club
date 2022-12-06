import React from "react";
import ReactDOM from "react-dom/client";
import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import WalletProvider from "./contexts/WalletContext";
import { persistor, store } from "./app/store";
import Updater from "./contexts/Updater";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RefreshContextProvider } from "./contexts/RefreshContext";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<WalletProvider>
					<RefreshContextProvider>
						<Updater />
						<Router>
							<Routes>
								<Route path="/" element={<App />} />
								<Route path="*" element={<Navigate to="/" />} />
							</Routes>
							<ToastContainer
								position="top-right"
								autoClose={5000}
								rtl={false}
								pauseOnFocusLoss
								draggable
								pauseOnHover
								hideProgressBar
								newestOnTop
								closeOnClick
								theme="colored"
							/>
						</Router>
					</RefreshContextProvider>
				</WalletProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
