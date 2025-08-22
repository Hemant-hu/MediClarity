import { Outlet } from "react-router-dom";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Navigation from "./Navigation";
import { Stethoscope } from "lucide-react";

export default function Layout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 260, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header withBorder>
        <Group h="100%" px="md" align="center">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Stethoscope color="var(--mantine-color-blue-6)" />
          <Title order={3}>MediClarity</Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" withBorder>
        <Navigation closeNavbar={toggle} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
