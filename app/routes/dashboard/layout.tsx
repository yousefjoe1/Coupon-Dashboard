import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { DashboardSidebar } from "~/featuers/dashboard/components/SideBar";

const DashBoardLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // تشيك على التوكن في اللوكال ستورج
        const token = localStorage.getItem("user-token");

        // لو مش موجود، ابعته لصفحة اللوجين فوراً
        if (!token) {
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    return (
        <div dir="rtl" className="flex">
            <DashboardSidebar />
            <main className="flex-1">
                <Outlet />
            </main>

        </div>
    );
};

export default DashBoardLayout;