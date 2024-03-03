import { Link, Toolbar } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Link href="/home">
   
            </Link>
        </Toolbar>
        <main>
            {children}
        </main>
    </>
  );
};

export default Layout;
