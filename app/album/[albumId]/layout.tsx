import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Album Details",
    description: "Details about the album.",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            { children }
        </main>
    );
}
