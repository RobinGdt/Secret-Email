import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authorize from "../components/Authorize/Authorize";

const AppRouter = (): JSX.Element => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/authorize" element={<Authorize />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
