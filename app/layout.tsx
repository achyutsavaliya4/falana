import "bootstrap/scss/bootstrap.scss";
import "../styles/main.scss";
import StoreProvider from "@/components/Providers/StoreProvider";
import QueryProvider from "@/components/Providers/QueryProvider";
import Toaster from "@/components/Toaster/Toaster";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <QueryProvider>
            {children}
            <Toaster />
            </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
