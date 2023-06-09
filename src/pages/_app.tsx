
import "@/styles/globals.css";
import { MyAppProps } from "@/components/types";
import { Layouts } from "@/components/Layouts";

export default function App({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page: any) => page);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
