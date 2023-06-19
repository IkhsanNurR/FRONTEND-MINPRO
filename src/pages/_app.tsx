
import "@/styles/globals.css";
import { MyAppProps } from "@/components/types";
import { Layouts } from "@/components/Layouts";
import { Provider } from "react-redux";
import store from "@/redux/storeGlobal";

export default function App({ Component, pageProps }: MyAppProps) {
  const Layout = Layouts[Component.Layout] ?? ((page: any) => page);
  return (
    <Provider store={store}>
    <Layout>
        <Component {...pageProps} />
    </Layout>
    </Provider>
  );
}
