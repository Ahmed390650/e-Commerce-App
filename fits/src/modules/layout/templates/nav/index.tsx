import { listRegions } from "@/lib/data/regions";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Search, UserIcon } from "lucide-react";
import CartButton from "../../components/cart-button";
import Logo from "../../components/Logo-Icon";
import Categories from "../components/Collections";
import Link from "next/link";

const Nav = async () => {
  const regions = await listRegions();
  return (
    <div className="sticky top-0 inset-x-0 z-50 group mx-auto border-b">
      <header className="relative h-16 mx-auto duration-200 bg-white  container max-w-7xl">
        <nav className="  flex items-center justify-between w-full h-full text-small-regular">
          <div>{/* <CountrySelect regions={regions} /> */}</div>
          <div className="flex-1 basis-0 h-full flex items-center">
            {/* Nav Links */}
            <Logo />
            <Categories />
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <Search size={20} />

            <Link href={`/account`}>
              <UserIcon size={20} className="cursor-pointer" />
            </Link>
            <CartButton />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
