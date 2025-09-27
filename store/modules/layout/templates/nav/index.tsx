import { listRegions } from "@/lib/data/regions";
import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";
import { Search, UserIcon } from "lucide-react";
import Link from "next/link";
import CartButton from "../../components/cart-button";
import { ModeToggle } from "@/components/ui/ModeToggle";

const Nav = async () => {
  const regions = await listRegions();

  return (
    <div className="sticky top-0 inset-x-0 z-50 group mx-auto border-b">
      <header className="relative h-16 mx-auto duration-200 bg-white  container max-w-7xl">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div>{/* <CountrySelect regions={regions} /> */}</div>
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <Link href="/" className="text-2xl font-bold">
                MyClothes
              </Link>

              {/* Nav Links */}
              <ul className="flex items-center gap-6">
                <li>
                  <Link
                    href="/store"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <Search size={20} />
            <UserIcon size={20} className="cursor-pointer" />
            {/* <SignedOut>
              <SignUpButton>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
            <CartButton />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
