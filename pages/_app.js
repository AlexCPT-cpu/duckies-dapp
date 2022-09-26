import "../styles/globals.css";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import "@fontsource/signika-negative";
import { ConnectWalletProvider } from "../context/WalletConnectContext";
import { Navigation } from "../components/Navigation";


const theme = createTheme({
  type: "dark",
  theme: {
    fontFamily: "Signika Negative",
    colors: {
      primaryLight: "$ green200",
      primaryLightHover: "$ green300",
      primaryLightActive: "$ green400",
      primaryLightContrast: "$ green600",
      primary: "$green500",
      primaryBorder: "$ green500",
      primaryBorderHover: "$ green600",
      primarySolidHover: "$ green700",
      primarySolidContrast: "$white",
      primaryShadow: "$white500",
      transparent: "#00000000",

      gradient:
        "linear-gradient(112deg, $ green100 -25%, $pink500 -10%, $purple300 90%)",
      link: "#5E1DAD",

      myColor: "#00000030",
    },
    space: {},
    fonts: {},
  },
});


function MyApp({ Component, pageProps }) {

  return (
    <NextUIProvider theme={theme}>
      <ConnectWalletProvider>
        <Navigation />
        <Component {...pageProps} />
      </ConnectWalletProvider>

    </NextUIProvider>
  );
}

export default MyApp;
