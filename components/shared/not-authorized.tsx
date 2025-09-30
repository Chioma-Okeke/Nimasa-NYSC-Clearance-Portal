import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "@bprogress/next";

export default function NotAuthorized() {

    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 w-full">
            <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-center max-w-md"
            >
                <div className="flex justify-center mb-6">
                    <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Lock size={80} className="text-red-400" />
                    </motion.div>
                </div>

                <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
                <p className="text-lg mb-8 w-full max-w-md">
                    Oops! 🚧 You don’t have permission to view this page.
                    Maybe try logging in, or head back to safety.
                </p>

                <div className="flex gap-4 justify-center items-center">
                    <Button
                        variant={"secondary"}
                        onClick={() => (router.push("/login"))}
                        className="w-full py-4 text-lg"
                    >
                        Login
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
