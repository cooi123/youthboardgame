import {Link} from "@nextui-org/link";

import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import {link as linkStyles} from "@nextui-org/theme";
import clsx from "clsx";

import {siteConfig} from "@/config/site";

import {Logo} from "@/components/icons";
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
import {useAuth} from "@/hooks/useAuth";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
const teamsLogo = {
  1: "/TeamRed.svg",
  2: "/TeamBlue.svg",
  3: "/TeamGreen.svg",
  4: "/TeamYellow.svg",
  5: "/TeamPurple.svg",
  6: "/TeamOrange.svg",
  7: "/TeamLightBlue.svg",
};
export const Navbar = () => {
  const {user, logout} = useAuth();
  const logo =
    user?.id !== undefined
      ? teamsLogo[user.id]
      : "https://i.pravatar.cc/150?u=a042581f4e29026024d";

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">Youth Camp 2024</p>
          </Link>
        </NavbarBrand>
        <div className="lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({color: "foreground"}),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
          {user?.role.toString() === "admin" && (
            <NavbarItem>
              <Link
                className={clsx(
                  linkStyles({color: "foreground"}),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href="/admin/manage"
              >
                Management
              </Link>
            </NavbarItem>
          )}
        </div>
        {user && (
          <div className=" gap-4 justify-end items-center">
            <Dropdown>
              <DropdownTrigger>
                <Avatar src={logo} />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new" onClick={() => logout()}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
};
