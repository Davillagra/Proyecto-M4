import { options } from './options'

export const auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: options.auth0.secret,
  baseURL: options.auth0.baseURl,
  clientID: options.auth0.clientID,
  issuerBaseURL: options.auth0.issuerBaseURL,
}
