import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import {ContextProvider} from "../contexts/ContextProvider";
import {AppBar} from '../components/AppBar';
import Footer from '../components/Footer';
import Notification from "components/Notification";


require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const App: FC<AppProps> = ({Component, pageProps}) =>{
  return (
    <div className="bg-default-900">
      <head>
        <title>Solana Token Creator</title>
      </head>
      <ContextProvider>
        <Notification />
        <AppBar />
        <Component {...pageProps} />
        <Footer />
      </ContextProvider>

      {/* //SCRIPTS */}
      <script src="asset/libs/preline/parline.js"></script>
      <script src="asset/libs/swiper/swiper-bundle.min.js"></script>
      <script src="asset/libs/gumshoejs/gumshoe.polyfills.min.js"></script>
      <script src="asset/libs/lucide/lucide.min.js"></script>
      <script src="asset/libs/aos/aos.js"></script>
      <script src="asset/js/swiper.js"></script>
      <script src="asset/js/theme.js"></script>
    </div>
  )
}


export default App;