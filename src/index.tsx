import React from "react";
import App from "./App";
import { HashRouter as Router } from "react-router-dom";
import "normalize.css";
import { RootStore, storesContext } from "@stores";
import { loadState, saveState } from "@src/utils/localStorage";
import { autorun } from "mobx";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-spring-bottom-sheet/dist/style.css";
import "./index.css";
import { ReactComponent as CloseIcon } from "@src/assets/icons/closeBtn.svg";

const initState = loadState();

const mobxStore = new RootStore(initState);

autorun(
  () => {
    console.dir(mobxStore);
    saveState(mobxStore.serialize());
  },
  { delay: 1000 }
);

const container = document.getElementById("root")!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <storesContext.Provider value={mobxStore}>
    <Router>
      <App />
      <ToastContainer
        icon={<div />}
        position="top-center"
        autoClose={5000}
        closeButton={({ closeToast }) => (
          <CloseIcon onClick={(e) => closeToast(e as any)} />
        )}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  </storesContext.Provider>
);
//
// ReactDOM.render(
//   // <React.StrictMode>
//   <storesContext.Provider value={mobxStore}>
//     <Router>
//       <App />
//       <ToastContainer theme={"dark"} />
//     </Router>
//   </storesContext.Provider>,
//   // </React.StrictMode>
//   document.getElementById("root")
// );
