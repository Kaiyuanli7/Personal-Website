import { Titillium_Web } from 'next/font/google'
import localFont from 'next/font/local'

export const titillium = Titillium_Web({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '900'],
  variable: '--font-titillium',
})

export const luxurious = localFont({
  src: '../../public/fonts/LuxuriousScript-Regular.ttf',
  variable: '--font-luxurious',
}) 