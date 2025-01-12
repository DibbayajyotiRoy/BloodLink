import React from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Heart,
  Home,
  LogIn,
  Menu,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const mainNavItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="h-4 w-4" />
  },
  {
    label: "Blood Seekers",
    href: "/bloodseekers",
    icon: <Heart className="h-4 w-4" />
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <BarChart3 className="h-4 w-4" />
  }
];

const authNavItems: NavItem[] = [
  {
    label: "Login",
    href: "/login",
    icon: <LogIn className="h-4 w-4" />
  },
  {
    label: "Register",
    href: "/register/donor",
    icon: <User className="h-4 w-4" />
  }
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const NavLink: React.FC<{ item: NavItem }> = ({ item }) => {
    const isActive = location.pathname === item.href;

    return (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md",
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-gray-100"
        )}
        onClick={() => setIsOpen(false)}
      >
        {item.icon}
        {item.label}
      </Link>
    );
  };

  const NavItems = () => (
    <>
      <nav className="space-y-1">
        {mainNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>
      <hr className="my-4" />
      <nav className="space-y-1">
        {authNavItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden fixed top-4 left-4 z-40"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col space-y-4 py-4">
            <NavItems />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow border-r border-gray-200 bg-white pt-5 pb-4">
          {/* <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold">BloodLink</h1>
          </div> */}
          <div className="flex-grow flex flex-col mt-8 px-3">
            <NavItems />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        <main className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;