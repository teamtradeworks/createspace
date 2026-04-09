import Script from "next/script";

export default function GoogleTagManager({ gtmId }: { gtmId: string }) {
  return (
    <>
      <Script
        id="fbq-stub"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if(!window.fbq){window.fbq=function(){window.fbq.callMethod?
            window.fbq.callMethod.apply(window.fbq,arguments):window.fbq.queue.push(arguments)};
            window._fbq=window.fbq;window.fbq.push=window.fbq;window.fbq.loaded=!0;
            window.fbq.version='2.0';window.fbq.queue=[]}
          `,
        }}
      />
      <Script
        id="gtm-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
