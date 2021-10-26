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
              <li>&#10003;<span className="border-b-2 border-red-400">Transparent:</span> Entire site is open-source</li>
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
        <p>Copyright © William Hutson</p>
      </footer>        
      <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "267188447561463e9916408a83f261b2"}'></script>
    </div>
  )
}
