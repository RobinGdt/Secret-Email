import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Authorize from "../components/Authorize/Authorize";

const AppRouter = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/authorize" element={<Authorize />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
