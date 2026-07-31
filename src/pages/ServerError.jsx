import { ServerCrash, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function ServerError() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
            <div className="max-w-md w-full text-center space-y-8">

                {/* Icon/Illustration Area */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <span className="text-[12rem] font-bold text-red-500 select-none">500</span>
                    </div>
                    <div className="relative flex justify-center">
                        <div className="p-6 bg-red-50 rounded-full">
                            <ServerCrash className="w-20 h-20 text-red-500" />
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                        Internal Server Error
                    </h1>
                    <p className="text-lg text-gray-600">
                        Something went wrong on our end. The server may be down or temporarily unavailable. Please try again later.
                    </p>
                </div>

                {/* Go Home Button */}
                <div className="flex justify-center pt-6">
                    <Button
                        as={Link}
                        to="/"
                        variant="primary"
                        size="lg"
                        icon={RefreshCw}>
                        Try Again
                    </Button>
                </div>
            </div>

            {/* Subtle bottom text or branding */}
            <div className="mt-16 text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} NextTech. All rights reserved.
            </div>
        </div>
    );
}

