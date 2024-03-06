import { BrowserRouter, Routes } from "react-router-dom";

const AppRouter = (): JSX.Element => {
  return (
    <BrowserRouter basename="/">
      <Routes></Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
