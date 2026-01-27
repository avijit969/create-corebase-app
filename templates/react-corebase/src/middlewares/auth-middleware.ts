import { redirect } from "react-router";
import { useAuthStore } from "@/store/auth-store";

export const authMiddleware = async (_context: any, next: any) => {
    const { checkAuth } = useAuthStore.getState();
    await checkAuth();

    const user = useAuthStore.getState().user;

    if (!user) {
        throw redirect("/login");
    }
    return next();
};

export const guestMiddleware = async (_context: any, next: any) => {
    const { checkAuth } = useAuthStore.getState();
    await checkAuth();

    const user = useAuthStore.getState().user;

    if (user) {
        throw redirect("/");
    }
    return next();
};
