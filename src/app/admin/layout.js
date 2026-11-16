import './admin.css';

export const metadata = {
  title: 'Admin Dashboard | Anmol Graphics',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({ children }) {
  return <div className="font-roboto antialiased">{children}</div>;
}