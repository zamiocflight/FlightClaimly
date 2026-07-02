"use client";

import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
  }
}

export default function MetaPixel() {
  if (!PIXEL_ID) return null;

  function initPixel() {
    if (!window.fbq) return;

    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }

  return (
    <>
      <Script id="meta-pixel-stub" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;
          n.push=n;
          n.loaded=!0;
          n.version='2.0';
          n.queue=[];
          }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
        `}
      </Script>

      <Script
        id="meta-pixel-script"
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="afterInteractive"
        onLoad={initPixel}
      />

      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}