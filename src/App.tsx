import { AppRouter } from "./app-router/app-router";
import AppProvider from "./context/app-provider";

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
