"use client"; // here we are using browser api usepathname so we make it client component ;
import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/Issues" },
      
    // { label: "About", href: "/" },
  ];

  const currentPath = usePathname();
  console.log(currentPath);

  return (
    <nav className="flex mt-5 space-x-6 p-7  items-center">
      <Link href="/">
        <FaBug className="inline-block mr-2" />
      </Link>
      <ul className="flex space-x-6 ">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={`${link.href===currentPath ? "text-zinc-900" : "text-zinc-500 transition-colors"}`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}

        {/* <li ><Link className='text-zinc-500 hover:text-zinc-100 hover:underline  transition delay-75' href="/dashboard">Dashboard</Link></li>
        <li><Link className='text-zinc-500 hover:text-zinc-100 hover:underline  transition delay-75' href="/settings">Issues</Link></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
