import { useState } from "react";
import reactLogo from "./assets/react.svg";
import GlobalStyles from "./styles/global";
// import "./App.css";
import KanbanDashboard from "./components/KanbanDashboard";
import lightTheme from "./styles/themes/light";
import darkTheme from "./styles/themes/dark";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? darkTheme : lightTheme);
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div >
          <GlobalStyles />
          <KanbanDashboard toggleTheme={toggleTheme} />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
