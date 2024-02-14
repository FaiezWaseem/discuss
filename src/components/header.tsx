'use client';
import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Input } from "@nextui-org/react";
import AuthContent from "./header-auth";
export default function Header() {


    return <Navbar className="shadow mb-6">
        <NavbarBrand>
            <Link href={'/'} className="font-bold" >Discuss</Link>
        </NavbarBrand>
        <NavbarContent justify="center"  >
            <NavbarItem>
                <Input variant="bordered" label="search" />
            </NavbarItem>

        </NavbarContent>
        <NavbarContent justify="end" >
            <NavbarItem>
                <AuthContent />
            </NavbarItem>
        </NavbarContent>
    </Navbar>
}