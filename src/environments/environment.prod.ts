export const environment = {
  baseUrl: 'https://health-app-portal',
  production: true,
  API: 'https://health-app-api.cfapps.io',
  INGESTION_API: 'https://health-app-offloads-ingestion-service.cfapps.io/',
  OKTA_REDIRECT_URI: 'https://health-app-portal.cfapps.io/implicit/callback',
  OKTA_CLIENT_ID: '0oak9b494zIjE5wuk0h7',
  IDLE_DURATION: 1800, // show idle dialog 30 minutes after user inactivity
  IDLE_TIMEOUT_DURATION: 120, // close idle dialog 2 minutes after opening it
  GOOGLE_ANALYTICS_ID: 'UA-132775527-1'
};
