import Footer from "@components/Footer/Footer";
import NavBar from "@components/Navbar/NavBar";
import Provider from "@components/Provider";
import CartProvider from "@store/CartProvider";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Peddada Meals",
  description: "Order our delicious food to your lovely home...",
  icons: {
    icon: [
      '/favicon.ico?v=4'
    ],
    apple: [
      '/apple-touch-icon.png?v=4'
    ],
    shortcut: [
      '/apple-touch-icon.png'
    ]
  },
  manifest: '/site.webmanifest'
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          <CartProvider>
            <div className="main" />
            <main className="app">
              <NavBar />
              <Toaster />
              {children}
              <Footer />
            </main>
          </CartProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
