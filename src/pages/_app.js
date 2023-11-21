import "@/styles/globals.css";
import Common from "@/component/common";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Common />
      <Component {...pageProps} />
    </>
  );
};

export default App;
