import { NavLink as RouterNavLink } from "react-router-dom";
import { NavLink, Stack } from "@mantine/core";
import { Home, ScanLine, BellRing } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: <Home size={18} /> },
  { to: "/scan", label: "Scan Document", icon: <ScanLine size={18} /> },
  { to: "/reminders", label: "My Reminders", icon: <BellRing size={18} /> },
];

export default function Navigation({ closeNavbar }) {
  return (
    <Stack>
      {links.map((link) => (
        <NavLink
          key={link.to}
          component={RouterNavLink}
          to={link.to}
          label={link.label}
          leftSection={link.icon}
          onClick={closeNavbar}
          radius="md"
          className={({ isActive }) =>
            isActive ? "active-nav-link" : undefined
          }
        />
      ))}
    </Stack>
  );
}
