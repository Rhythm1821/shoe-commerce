'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";

export default function LogoutModal({ setIsAuthenticated }) {
    const router = useRouter();

    const handleLogoutConfirm = () => {
        setIsAuthenticated(false);
        router.push('/logout');
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger>Logout</AlertDialogTrigger>
            <AlertDialogContent className="max-w-lg w-full bg-white rounded-xl p-6 shadow-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to logout?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-300 text-gray-800 py-2 px-4 rounded-xl">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-700"
                        onClick={handleLogoutConfirm}
                    >
                        Logout
                    </AlertDialogAction>    
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
