import React from "react";
import Head from "next/head";

export default function Ads() {
  return (
    <Head>
      <script id="propellerAds">
        {
        `(function(d,z,s){s.src='https://'+d+'/401/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('gloaphoo.net',7311993,document.createElement('script'))
        `
        }</script>
    </Head>
  );
}
