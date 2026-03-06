import { User } from "@/redux/sagas/handlers/authHandler/authHandlerInterface";

export interface AuthState {
  userDetails?: User;
}
