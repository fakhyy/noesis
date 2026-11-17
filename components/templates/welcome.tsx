
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface NoesisWelcomeEmailProps {
  name?: string;
  appUrl?: string;
}

export const WelcomeEmail = ({
  name,
  appUrl = "https://noesis.fakhyy.com",
}: NoesisWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Welcome to Noesis. A quiet space for your thoughts and ideas.
    </Preview>

    <Tailwind>
      <Body style={main}>
        <Container style={container}>
          {/* Brand */}
          <Section className="mt-4 mb-8">
            <div className="flex items-center gap-3">
              <svg
                width="40"
                height="40"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27 2.88675C30.094 1.10042 33.906 1.10042 37 2.88675L54.7128 13.1132C57.8068 14.8996 59.7128 18.2008 59.7128 21.7735V42.2265C59.7128 45.7992 57.8068 49.1004 54.7128 50.8867L37 61.1133C33.906 62.8996 30.094 62.8996 27 61.1133L9.28719 50.8867C6.19318 49.1004 4.28719 45.7992 4.28719 42.2265V21.7735C4.28719 18.2008 6.19318 14.8996 9.28719 13.1132L27 2.88675Z"
                  stroke="#8F8F8F"
                  fill="#1F1F1F"
                />
                <circle
                  cx="32.5"
                  cy="31.5"
                  r="14"
                  fill="white"
                  stroke="#8F8F8F"
                />
              </svg>
              <Text className="m-0 text-xl font-semibold tracking-tight text-[#171717]">
                Noesis
              </Text>
            </div>
          </Section>

          <Hr style={divider} />

          {/* Welcome message */}
          <Section className="mt-10">
            <Text className="text-xs font-medium uppercase tracking-[2px] text-[#737373]">
              A new beginning
            </Text>

            <Heading className="mt-3 mb-4 text-[30px] font-semibold leading-tight tracking-tight text-[#171717]">
              Welcome{ name ? `, ${name}` : ""}.
            </Heading>

            <Text className="text-[15px] leading-7 text-[#525252]">
              We're glad you're here.
            </Text>

            <Text className="text-[15px] leading-7 text-[#525252]">
              Noesis is your personal space to capture thoughts, explore
              ideas, and make sense of what's on your mind.
            </Text>

            <Text className="text-[15px] leading-7 text-[#525252]">
              No pressure to organize everything or write something
              meaningful. Just open it, start writing, and let your
              thoughts flow.
            </Text>
          </Section>

          {/* CTA */}
          <Section className="mt-8 mb-8">
            <Button
              href={appUrl}
              className="rounded-md bg-[#171717] px-6 py-3 text-sm font-medium text-white no-underline"
            >
              Open Noesis
            </Button>
          </Section>

          <Hr style={divider} />

          {/* Closing */}
          <Section className="mt-8">
            <Text className="text-sm leading-6 text-[#525252]">
              Your thoughts deserve a place.
            </Text>

            <Text className="mt-4 text-sm text-[#525252]">
              Happy writing,
              <br />
              The Noesis Team
            </Text>
          </Section>

          {/* Footer */}
          <Section className="mt-10">
            <Hr style={divider} />

            <Text className="text-center text-xs leading-5 text-[#a3a3a3]">
              © {new Date().getFullYear()} Noesis. All rights reserved.
            </Text>

            <Text className="text-center text-xs text-[#a3a3a3]">
              A quiet space for your thoughts.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#f5f5f5",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  maxWidth: "520px",
  margin: "40px auto",
  padding: "32px 36px",
  borderRadius: "8px",
};

const divider = {
  borderColor: "#eeeeee",
  margin: "24px 0",
};
