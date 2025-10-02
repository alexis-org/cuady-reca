import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TanStackProvider } from "@/plugins/TanStackProvider";
import { AppRouter } from "@/router/AppRouter";

const App = () => (
  <TanStackProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppRouter />
    </TooltipProvider>
  </TanStackProvider>
);

export default App;
