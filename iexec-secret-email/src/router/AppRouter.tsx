import { HashRouter, Route, Routes } from "react-router-dom";
import Authorize from "../components/Authorize/Authorize";

const AppRouter = (): JSX.Element => {
  return (
    <HashRouter basename="/iExec-Technical-Test/#">
      <Routes>
        <Route path="/authorize" element={<Authorize />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
