import injectContext from "./store/appContext";
import "./global.css";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default injectContext(App);
