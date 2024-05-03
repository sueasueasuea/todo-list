import TaskSection from "./components/TaskSection";
import TodoInput from "./components/TodoInput";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#9E78CF",
        contrastText: "#fff",
      },
    },
  });
  return (
    <Provider store={store}>
      <PersistGate loading={<CircularProgress />} persistor={persistor}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />

          <div className="flex flex-col gap-4">
            <TodoInput />
            <TaskSection />
          </div>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
