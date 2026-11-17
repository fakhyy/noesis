import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface NoesisResetPasswordEmailProps {
  name?: string;
  url: string;
}

export const ResetPasswordEmail = ({
  name,
  url,
}: NoesisResetPasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Reset your Noesis password. Follow the link to choose a new one.
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

          {/* Reset message */}
          <Section className="mt-10">
            <Text className="text-xs font-medium uppercase tracking-[2px] text-[#737373]">
              Account security
            </Text>

            <Heading className="mt-3 mb-4 text-[30px] font-semibold leading-tight tracking-tight text-[#171717]">
              Reset your password.
            </Heading>

            <Text className="text-[15px] leading-7 text-[#525252]">
              Hi{name ? ` ${name}` : ""},
            </Text>

            <Text className="text-[15px] leading-7 text-[#525252]">
              We received a request to reset the password associated with your
              Noesis account.
            </Text>

            <Text className="text-[15px] leading-7 text-[#525252]">
              Click the button below to choose a new password. Your existing
              password will remain unchanged until you complete the reset
              process.
            </Text>
          </Section>

          {/* CTA */}
          <Section className="mt-8 mb-8">
            <Button
              href={url}
              className="rounded-md bg-[#171717] px-6 py-3 text-sm font-medium text-white no-underline"
            >
              Reset password
            </Button>
          </Section>

          {/* Fallback URL */}
          <Section className="mb-8">
            <Text className="text-sm leading-6 text-[#737373]">
              If the button doesn't work, copy and paste this link into your
              browser:
            </Text>

            <Link
              href={url}
              className="break-all text-sm leading-6 text-[#525252] underline"
            >
              {url}
            </Link>
          </Section>

          <Hr style={divider} />

          {/* Security note */}
          <Section className="mt-8">
            <Text className="text-sm leading-6 text-[#737373]">
              If you didn't request a password reset, you can safely ignore this
              email. Your account will remain secure and your password won't
              change.
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

export default ResetPasswordEmail;

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
