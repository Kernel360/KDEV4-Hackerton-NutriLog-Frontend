import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center gap-10">
        <div
          id="layout-Root"
          className="relative flex h-full max-h-[950px] min-h-[600px] w-full min-w-[350px] max-w-[450px] shrink-0 flex-col shadow-xl"
        >
          <div className="flex-grow overflow-y-auto">
            <Outlet />
          </div>
          {/* /login 경로가 아니면 Footer를 렌더링 */}
          {!isLoginPage && <Footer />}
        </div>
      </div>
    </>
  );
}

export default App;
