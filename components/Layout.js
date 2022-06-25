import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
export function Layout({ children }) {
  return (
    <>
      <Navbar />
        <div className="bg-gray-100 dark:bg-slate-900 dark:text-white h-screen p-10">
          <div className="container mx-auto h-full bg-white dark:bg-gray-800 p-10">{children}</div>
        </div>
      <Toaster />
    </>
  );
}
