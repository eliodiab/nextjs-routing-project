import { Suspense, lazy } from "react";
// import MainHeader from "./main-header";

const MainHeader = lazy(() => import("./main-header"));

const Layout = (props) => {
  return (
    <>
      <Suspense fallback={<div />}>
        <MainHeader />
      </Suspense>
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
