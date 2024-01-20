import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AuthProvider from "./store/AuthProvider.jsx";
import ChatProvider from "./store/ChatContextProvider.jsx";
import ToastPortal from "./components/ui/toaster/ToastPortal.jsx";
ReactDOM.createRoot(document.getElementById("main")).render(
  <AuthProvider>
    <ChatProvider>
      <BrowserRouter>
        <App />
        <ToastPortal />
      </BrowserRouter>
    </ChatProvider>
  </AuthProvider>
);
