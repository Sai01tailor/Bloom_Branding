import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { EnquiryProvider } from "./context/EnquiryContext";
import { ServiceProvider } from "./context/ServiceContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <EnquiryProvider>
      <ServiceProvider>
        <App />
      </ServiceProvider>
    </EnquiryProvider>
  </AuthProvider>
);
