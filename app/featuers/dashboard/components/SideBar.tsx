import { Link, useLocation, useNavigate } from "react-router";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
    LayoutDashboard,
    Store,
    Ticket,
    Images,
    ShoppingBag,
    Users,
    LogOut,
    TicketPercent
} from "lucide-react";

const menuItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Stores", href: "/dashboard/stores", icon: Store },
    { name: "Coupons", href: "/dashboard/coupons", icon: Ticket },
    { name: "Home Sliders", href: "/dashboard/sliders", icon: Images },
    { name: "Products", href: "/dashboard/products", icon: ShoppingBag },
    { name: "Users", href: "/dashboard/users", icon: Users },
];

export function DashboardSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-info");
        navigate("/", { replace: true });
    };

    return (
        <aside className="flex h-screen w-64 flex-col border-l bg-card text-card-foreground">
            <div className="flex h-16 items-center gap-2 border-b px-6">
                <TicketPercent className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold tracking-tight">Couponly Admin</span>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout Section */}
            <div className="border-t p-4">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </div>
        </aside>
    );
}