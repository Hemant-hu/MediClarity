import {
  Title,
  Text,
  Stack,
  Paper,
  ThemeIcon,
  List,
  Grid,
  Button,
  Card,
} from "@mantine/core";
import {
  ScanLine,
  BellRing,
  BrainCircuit,
  ArrowRight,
  Stethoscope,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Stack gap="xl">
      <Card withBorder radius="lg" p="xl">
        <Grid align="center">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack>
              <Title order={1} c="blue.8">
                Welcome to MediClarity
              </Title>
              <Text size="lg" c="dimmed">
                Your personal health assistant. We turn complex medical jargon
                into simple, understandable language and help you stay on track
                with your health journey.
              </Text>
              <Button
                mt="md"
                size="md"
                rightSection={<ArrowRight size={18} />}
                onClick={() => navigate("/scan")}
                w="fit-content"
              >
                Get Started
              </Button>
            </Stack>
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, md: 4 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemeIcon size={150} radius="xl" variant="light">
              <Stethoscope size={80} />
            </ThemeIcon>
          </Grid.Col>
        </Grid>
      </Card>

      <Paper withBorder p="xl" radius="lg">
        <Title order={2} mb="xl" ta="center">
          How It Works
        </Title>
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="center" ta="center">
              <ThemeIcon size="xl" radius="md" variant="light">
                <ScanLine />
              </ThemeIcon>
              <Text fw={600} size="lg">
                1. Scan or Type
              </Text>
              <Text c="dimmed" size="sm">
                Go to the "Scan Document" page and enter your prescription text
                or upload an image.
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="center" ta="center">
              <ThemeIcon size="xl" radius="md" variant="light">
                <BrainCircuit />
              </ThemeIcon>
              <Text fw={600} size="lg">
                2. Get Simple Explanations
              </Text>
              <Text c="dimmed" size="sm">
                Our AI instantly translates complex medical terms into plain,
                easy-to-understand language.
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack align="center" ta="center">
              <ThemeIcon size="xl" radius="md" variant="light">
                <BellRing />
              </ThemeIcon>
              <Text fw={600} size="lg">
                3. Set Reminders
              </Text>
              <Text c="dimmed" size="sm">
                Automatically create medication and appointment reminders from
                the analyzed text.
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Stack>
  );
}
