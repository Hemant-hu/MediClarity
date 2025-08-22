import {
  Title,
  Text,
  Stack,
  Group,
  ActionIcon,
  Card,
  ThemeIcon,
  Center,
  Button,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Bell, Trash, CalendarPlus } from "lucide-react";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

export default function RemindersPage() {
  const [reminders, setReminders] = useLocalStorage({
    key: "mediclarity-reminders",
    defaultValue: [],
  });
  const navigate = useNavigate();

  const deleteReminder = (idToDelete) => {
    setReminders((currentReminders) =>
      currentReminders.filter((r) => r.id !== idToDelete)
    );
    notifications.show({
      title: "Reminder Removed",
      message: "The reminder has been successfully deleted.",
      color: "red",
      icon: <Trash size={18} />,
    });
  };

  return (
    <Stack>
      <Title order={1}>My Reminders</Title>
      <Text c="dimmed">
        A list of all your upcoming medication and appointment reminders.
      </Text>

      {reminders.length === 0 ? (
        <Card withBorder mt="xl" p="xl">
          <Center>
            <Stack align="center" gap="md">
              <ThemeIcon variant="light" size={80} radius="xl">
                <Bell size={40} />
              </ThemeIcon>
              <Title order={3}>No Reminders Yet</Title>
              <Text c="dimmed" ta="center">
                Your reminders will appear here once you add them from the scan
                page.
              </Text>
              <Button
                leftSection={<CalendarPlus size={18} />}
                onClick={() => navigate("/scan")}
                mt="md"
              >
                Add a New Reminder
              </Button>
            </Stack>
          </Center>
        </Card>
      ) : (
        <Stack mt="lg" gap="sm">
          {reminders.map((reminder) => (
            <Card withBorder shadow="xs" p="md" key={reminder.id}>
              <Group justify="space-between">
                <Group>
                  <ThemeIcon variant="light" size="lg" radius="md">
                    <Bell size={20} />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text fw={500}>{reminder.title}</Text>
                    <Text size="sm" c="dimmed">
                      {reminder.details}
                    </Text>
                  </Stack>
                </Group>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  onClick={() => deleteReminder(reminder.id)}
                  aria-label={`Delete reminder for ${reminder.title}`}
                >
                  <Trash size={18} />
                </ActionIcon>
              </Group>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
