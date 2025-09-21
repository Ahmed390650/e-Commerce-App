import React, { Suspense } from "react";
import CartButton from "../../components/cart-button";

const Nav = () => {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group mx-auto border-b">
      <header className="relative h-16 mx-auto duration-200 bg-white  container max-w-7xl">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full"></div>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full"></div>
            <Suspense fallback={<>loading ...</>}>
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
