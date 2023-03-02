import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import ThemeButton from '/components/ThemeButton'
import IntervalGroups from '/components/IntervalGroups'

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
        <main className='container mx-auto h-screen w-full max-w-2xl'>
          <div className='flex justify-between py-5'>
            <div className='py-2 pr-1 text-2xl font-semibold'>
              Interval Groups
            </div>
            <ThemeButton />
          </div>
          <IntervalGroups />
        </main>
      </ThemeProvider>
    </>
  )
}
