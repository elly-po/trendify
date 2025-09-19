import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import { Toast } from "./components/Toast";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Creator from "./pages/Creator";
import Brand from "./pages/Brand";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/features" component={Features} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/about" component={About} />
            <Route path="/auth" component={AuthPage} />
            <ProtectedRoute path="/creator" component={Creator} allowedRoles={["creator"]} />
            <ProtectedRoute path="/brand" component={Brand} allowedRoles={["brand"]} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
        <Toast />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;