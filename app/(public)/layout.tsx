import Header from "@/components/general/Header";
interface PublicLayoutProps {
  children: React.ReactNode;
}
const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default PublicLayout;
