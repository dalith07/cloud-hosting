import Link from "next/link";
import styles from "./header.module.css";
import Navbar from "./NavBar";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { verifyTokenFroPage } from "@/lib/verifyToken";
// import Image from "next/image";
// import LogoutButton from "./LogoutButton";
// import { IoSettingsSharp } from "react-icons/io5";
import UserMenu from "./UserMenu";

const Header = async () => {
  // const dev = process.env.NODE_ENV === "production";
  const token = (await cookies()).get("jwtToken")?.value || "";
  const payload = verifyTokenFroPage(token);

  return (
    <header
      // className={styles.header}
      className={
        "sticky top-0 w-full z-[100] h-16 flex items-center justify-between px-6 rounded bg-gray-200"
      }
    >
      <Navbar isAdmin={payload?.isAdmin || false} />
      {process.env.NODE_ENV === "production" ? null : (
        <div
          className="text-sm font-extrabold bg-green-300 px-8 
        text-red-600 absolute top-2 -left-6 z-[999] -rotate-45"
        >
          dev
        </div>
      )}

      <div className={styles.right}>
        {payload ? (
          <>
            {/* <div className="flex items-center justify-center flex-row gap-2">
              <div>
                <Image
                  src={"/email.jpg"}
                  alt="image login"
                  width="50"
                  height="50"
                  className="rounded-full hover:cursor-pointer"
                />
              </div>

              <div className="hidden">
                <div
                  className="flex flex-col gap-8 absolute top-16 right-4 border-2
                border-gray-400 rounded p-8 bg-blue-950"
                >
                  <div className="flex gap-2 items-center">
                    <Image
                      src={"/email.jpg"}
                      alt="image login"
                      width="50"
                      height="50"
                      className="rounded-full hover:cursor-pointer"
                    />

                    <div className="flex flex-col gap-1">
                      <strong className="text-white md:text-xl capitalize">
                        {payload?.username}
                      </strong>
                      <strong className="text-white md:text-md">
                        email@gmail.com
                      </strong>
                    </div>
                  </div>

                  <div className="flex flex-row gap-4">
                    <Button>
                      <IoSettingsSharp />
                      Manage account
                    </Button>
                    <LogoutButton />
                  </div>
                </div>
              </div>
            </div> */}
            <UserMenu userName={payload?.username} />
          </>
        ) : (
          <>
            <Button variant="outline">
              <Link href="/login">Login</Link>
            </Button>
            <Button>
              <Link href="/register">Register</Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
