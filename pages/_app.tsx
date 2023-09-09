import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { fetchToken } from "@wagmi/core";
import { getAccount } from "@wagmi/core";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "EcoCoin App",
  projectId: "8b163c6aca404aa3d2a2ef98fb9b8987", // WalletConnect project ID
  chains, // Gets the available chains defined in configureChains.
});

const wagmiConfig = createConfig({
  autoConnect: true, // Auto-connects the user to the last connected wallet
  connectors, // Gets the connectors variable from getDefaultWallets; used for WalletConnect
  publicClient,
  webSocketPublicClient,
});

// const token = await fetchToken({
//   address: process.env.ECO_COIN_CONTRACT_ADDR,
//   chainId: 11155111,
// });

// getAccount - Action for accessing account data and connection status.
const account = getAccount(); // How can I present this into the index?

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} initialChain={sepolia}>
        <Component {...pageProps} account={account}/>
        {/* <accountComponent /> */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
