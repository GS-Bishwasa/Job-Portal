// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://6a091a28b5d5ef9f2890cba500dcebef@o4510147384967168.ingest.us.sentry.io/4510147402334208",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [Sentry.mongooseIntegration()],
});