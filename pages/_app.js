import Head from "next/head";
import { SWRConfig } from "swr";
import Header from "../components/navigation/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig>
      <div className="min-h-screen bg-green-100">
        <Head>
          <title>Events App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
