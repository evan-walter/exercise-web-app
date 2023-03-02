import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import ThemeButton from '/components/ThemeButton'
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

      <ThemeProvider attribute='class'>
        <main className='mx-auto h-screen w-full'>
          <ThemeButton />
          <Timer />
        </main>
      </ThemeProvider>
    </>
  )
}
