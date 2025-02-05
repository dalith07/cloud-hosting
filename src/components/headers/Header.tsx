import Link from "next/link";
import styles from "./header.module.css";
import Navbar from "./NavBar";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header
      // className={styles.header}
      className={
        "sticky inset-x-0 top-0 w-full z-[100] h-16 flex items-center justify-between px-10 rounded bg-gray-200"
      }
    >
      <Navbar />

      <div className={styles.right}>
        <Button variant="outline">
          <Link href="/login">Login</Link>
        </Button>

        <Button>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
