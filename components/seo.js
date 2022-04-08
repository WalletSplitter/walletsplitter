import Head from "next/head";
import React from "react";

export default function Header() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>Wallet Splitter</title>
      <meta name="description" content="An EVM agnostic wallet that splits crypto payments.. Solidty contracts written by OpenZepplin." />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:url" content="https://walletsplitter.com" key="ogurl" />
      <meta property="og:image" content="/logo.png" key="ogimage" />
      <meta property="og:site_name" content="Wallet Splitter" key="ogsitename" />
      <meta property="og:title" content="Wallet Splitter" key="ogtitle" />
      <meta property="og:description" content="An EVM agnostic wallet that splits crypto payments. Solidty contracts written by OpenZepplin." key="ogdesc" />
    </Head>
  );
}
