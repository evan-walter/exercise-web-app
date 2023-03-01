import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Timer from '/components/Timer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Exercise Web App</title>
        <meta name='description' content='A web app exercise tool.' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Timer />
      </main>
    </>
  )
}
