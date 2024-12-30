import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
	mainnet,
	polygon,
	optimism,
	arbitrum,
	goerli,
	polygonMumbai,
	optimismGoerli,
	arbitrumGoerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";
// import { Core } from '@walletconnect/core'
// import { WalletKit } from '@reown/walletkit'

const { chains, provider } = configureChains(
	[
		mainnet,
		goerli,
		polygon,
		polygonMumbai,
		optimism,
		optimismGoerli,
		arbitrum,
		arbitrumGoerli,
	],
	[publicProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "My Alchemy DApp",
	projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID,
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

// const core = new Core({
// 	projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID
//   });

// const metadata = {
// 	name: 'dApp-Ether',
// 	description: 'AppKit Example',
// 	url: window.location.origin,
// 	icons: ['your-icon-url']
//   };

export { WagmiConfig, RainbowKitProvider };
function MyApp({ Component, pageProps }) {

	// useEffect(() => {
	// 	const initWalletKit = async () => {
	// 		const walletKit = await WalletKit.init({
	// 			core,
	// 			metadata
	// 		});
	// 	};
	// 	initWalletKit();
	// }, []);

	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				modalSize="compact"
				initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
				chains={chains}
			>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
