import MainNavigator from "./ScreenStack.js";
import { AuthProvider } from "./context/authContext.js";
import { UserProvider } from "./context/userContext.js";
export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <MainNavigator />
      </UserProvider>
    </AuthProvider>
  );
}
