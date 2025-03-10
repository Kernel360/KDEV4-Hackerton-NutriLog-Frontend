import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer"
function App() {
  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center gap-10">
        <div
          id="layout-Root"
          className="relative flex h-full max-h-[950px] min-h-[600px] w-full min-w-[350px] max-w-[450px] shrink-0 flex-col shadow-xl"
        >
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
