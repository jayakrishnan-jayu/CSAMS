import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import UrqlProvider from "../lib/provider"
import { LayoutProvider } from '@/components/layout/context/layoutcontext'
import FacultyProvider from '@/components/layout/context/metadatacontext'
import Layout from '@/components/layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';


function App({ Component, pageProps }: AppProps) {
    return (
        <UserProvider>
            <UrqlProvider>
                <FacultyProvider>
                    <LayoutProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </LayoutProvider>
                </FacultyProvider>
            </UrqlProvider>
        </UserProvider>
    );
}

  export default App;