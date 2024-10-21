import injectContext from "./store/appContext";
import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default injectContext(App);
