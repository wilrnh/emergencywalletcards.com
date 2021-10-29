/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Emergency Wallet Cards - Be ready before the next emergency</title>
        <link rel="icon" href="https://res.cloudinary.com/wilrnh/image/upload/v1632264854/emergencywalletcards.com/favicons/favicon_cv2eb0.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://res.cloudinary.com/wilrnh/image/upload/v1632264855/emergencywalletcards.com/favicons/favicon-32x32_tybret.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="https://res.cloudinary.com/wilrnh/image/upload/v1632264855/emergencywalletcards.com/favicons/favicon-16x16_blucad.png" />
        <link rel="apple-touch-icon" href="https://res.cloudinary.com/wilrnh/image/upload/v1632264855/emergencywalletcards.com/favicons/apple-touch-icon-144x144_wrxg1f.png" />
        <meta property="og:title" content="Emergency Wallet Cards - Be ready before the next emergency"/>
        <meta property="og:site_name" content="Emergency Wallet Cards - Be ready before the next emergency"/>
        <meta property="og:description" content="Generate a card with important information that you can print, cut out, and fold for safe-keeping in your wallet or purse, ready the moment you need it."/>
        <meta property="og:url" content="https://emergencywalletcards.com"/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://res.cloudinary.com/wilrnh/image/upload/c_pad,h_630,w_1200/v1632264208/emergencywalletcards.com/ewc-color_l7fsin.png"/>
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="emergencywalletcards.com"/>
        <meta property="twitter:url" content="https://emergencywalletcards.com"/>
        <meta name="twitter:title" content="Emergency Wallet Cards - Be ready before the next emergency"/>
        <meta name="twitter:description" content="Generate a card with important information that you can print, cut out, and fold for safe-keeping in your wallet or purse, ready the moment you need it."/>
        <meta name="twitter:image" content="https://res.cloudinary.com/wilrnh/image/upload/c_pad,h_630,w_1200/v1632264208/emergencywalletcards.com/ewc-color_l7fsin.png"/>
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Link href="/">
          <a>
           <img className="w-80" src="https://res.cloudinary.com/wilrnh/image/upload/v1632264208/emergencywalletcards.com/ewc-color_ob4dsn.svg" alt="Emergency Wallet Cards Logo"/>
          </a>
        </Link>
        <p className="mt-3 text-lg">Be ready before the next emergency</p>
        <div className="flex flex-wrap">
          <div className="max-w-xs"><img src="https://res.cloudinary.com/wilrnh/image/upload/v1634513185/emergencywalletcards.com/ewc-homepage-sample-card_asexhk.png" alt="Emergency Wallet Cards Example"/></div>
          <div className="w-64 m-auto">
            <p className="p-6"><span className="font-bold">Easily print a card</span> with important information that you can <span className="font-bold">cut out and fold</span> for safe-keeping in your wallet or purse, <span className="font-bold">ready the moment you need it</span>.</p>
            <ul className="p-6 text-left space-y-4">
              <li>&#10003;<span className="border-b-2 border-red-400">Privacy first:</span> Absolutely NONE of your information ever leaves your browser</li>
              <li>&#10003;<span className="border-b-2 border-red-400">Transparent:</span> Entire app is free and <a className="underline text-blue-500" href="https://github.com/wilrnh/emergencywalletcards.com">open-source</a></li>
              <li>&#10003;<span className="border-b-2 border-red-400">Respectful:</span> No ads ever</li>
              <li>&#10003;<span className="border-b-2 border-red-400">Flexible:</span> Print as much, or as little information as you like</li>
            </ul>
            <Link href="/getstarted">
              <button className="border-4 rounded-lg border-red-400 bg-white p-1 text-black font-bold">Get Started Now!</button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <ul>
          <li>Copyright © William Hutson</li>
          <li>
            <svg className="inline-block align-middle w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            <span><a className="underline text-blue-500 px-1" href="https://github.com/wilrnh/emergencywalletcards.com">Opensource on Github</a></span>
          </li>
        </ul>
      </footer>        
      <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "267188447561463e9916408a83f261b2"}'></script>
    </div>
  )
}
