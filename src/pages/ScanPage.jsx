import { useState } from "react";
import {
  Title,
  Text,
  Stack,
  Textarea,
  Button,
  Loader,
  Paper,
  Alert,
  Card,
  ThemeIcon,
  Center,
} from "@mantine/core";
import { Check, Info, X, FileText, Sparkles } from "lucide-react";
import { notifications } from "@mantine/notifications";
import { useMockProcessor } from "../hooks/useMockProcessor";
import { useLocalStorage } from "@mantine/hooks";

export default function ScanPage() {
  const [text, setText] = useState("");
  const { result, loading, error, processText } = useMockProcessor();
  const [reminders, setReminders] = useLocalStorage({
    key: "mediclarity-reminders",
    defaultValue: [],
  });

  const handleProcess = () => {
    if (!text.trim()) {
      notifications.show({
        title: "Input Required",
        message: "Please enter some text to analyze.",
        color: "yellow",
        icon: <Info />,
      });
      return;
    }
    processText(text);
  };

  const handleAddReminders = () => {
    if (!result || result.actions.length === 0) return;
    const newReminders = result.actions.map((action) => ({
      id: `rem-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...action,
    }));
    setReminders((prev) => [...prev, ...newReminders]);
    notifications.show({
      title: "Success!",
      message: `${result.actions.length} reminder(s) have been added.`,
      color: "green",
      icon: <Check />,
    });
  };

  return (
    <Stack gap="xl">
      <Card withBorder p="xl">
        <Title order={2}>Analyze a New Document</Title>
        <Text c="dimmed" mt="xs" mb="xl">
          Type or paste text from your medical document below. Or, simply drag
          and drop a file to get started.
        </Text>

        <Paper
          withBorder
          p="xl"
          radius="md"
          bg="gray.0"
          style={{ borderStyle: "dashed" }}
        >
          <Center>
            <Stack align="center">
              <ThemeIcon variant="light" size="xl" radius="xl">
                <FileText />
              </ThemeIcon>
              <Text>Drag and drop a file here or click to select</Text>
              <Text size="xs" c="dimmed">
                (This is a UI demo - file processing is not implemented)
              </Text>
            </Stack>
          </Center>
        </Paper>

        <Textarea
          mt="lg"
          placeholder="e.g., Rx: Lisinopril 10mg, 1 tab PO QD. F/U in 6 weeks."
          label="Or, enter text manually"
          withAsterisk
          minRows={5}
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          autosize
        />
        <Button
          onClick={handleProcess}
          disabled={loading}
          leftSection={<Sparkles size={18} />}
          mt="lg"
          size="md"
        >
          {loading ? "Analyzing..." : "Simplify My Text"}
        </Button>
      </Card>

      {loading && (
        <Center>
          <Loader />
        </Center>
      )}
      {error && (
        <Alert color="red" title="Analysis Error" icon={<X />}>
          {error}
        </Alert>
      )}

      {result && (
        <Card withBorder p="xl">
          <Title order={3} mb="md">
            Analysis Complete
          </Title>
          <Paper bg="gray.0" p="md" radius="md" withBorder>
            <Text
              component="div"
              lh="lg"
              dangerouslySetInnerHTML={{ __html: result.simplifiedText }}
            />
          </Paper>

          {result.actions.length > 0 && (
            <Stack mt="lg">
              <Alert color="blue" title="Actions Detected" icon={<Info />}>
                We found items that can be turned into reminders. Click the
                button below to add them to your schedule.
              </Alert>
              <Button onClick={handleAddReminders} color="green" size="md">
                Add {result.actions.length} Reminder(s)
              </Button>
            </Stack>
          )}
        </Card>
      )}
    </Stack>
  );
}
