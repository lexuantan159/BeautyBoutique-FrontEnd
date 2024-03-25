import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SidebarUser from "../components/sidebar/SidebarUser";


const User = ({ children }) => {
  return (
      <>
        <Header />
        <div className="grid grid-cols-12 max-w-[1230px] px-[30px] mx-auto mt-8 gap-5">
          <div className="col-span-3"><SidebarUser /></div>
          <div className="col-span-9 fill-available">{children}</div>
        </div>
        <Footer />
      </>
  );
};

export default User;
