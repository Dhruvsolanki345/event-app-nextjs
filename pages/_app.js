import Head from "next/head";
import Header from "../components/navigation/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-green-100">
      <Head>
        <title>Events App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
