import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import UrqlProvider from "../lib/provider"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <UrqlProvider>
                <Component {...pageProps} />;
            </UrqlProvider>
        </UserProvider>
    )
}
