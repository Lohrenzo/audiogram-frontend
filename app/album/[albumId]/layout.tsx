import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Album Details",
    description: "Details about the album.",
    manifest: "/web.manifest",
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
