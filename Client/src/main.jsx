import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { EnquiryProvider } from "./context/EnquiryContext";
import { ServiceProvider } from "./context/ServiceContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { MenuProvider } from "./Component/Global/MenuProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <MenuProvider>
  <AuthProvider>
    <EnquiryProvider>
      <ServiceProvider>
        <App />
      </ServiceProvider>
    </EnquiryProvider>
  </AuthProvider>
  </MenuProvider>
  </BrowserRouter>
);
