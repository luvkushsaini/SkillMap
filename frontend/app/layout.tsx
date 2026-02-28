import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "SkillMap - AI Learning Roadmap Generator",
    description: "Generate personalized learning roadmaps powered by AI",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
