import Footer from "@components/Footer/Footer";
import NavBar from "@components/Navbar/NavBar";
import AuthProvider from "@components/Providers/Provider";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@components/Providers/ReduxProvider";

export const metadata = {
  title: "Peddada Meals",
  description: "Order our delicious food to your lovely home...",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AuthProvider>
            <ReduxProvider>
              <div className="main" />
              <main className="app">
                <NavBar />
                <Toaster />
                {children}
                <Footer />
              </main>
            </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
