// app/(main)/layout.tsx


import { Footer } from "../../components/shared/footer";
import ShinyMiransastext from "../../components/shared/footer-shiny-text";
import Navbar from "../../components/shared/header";
import SmoothScrolling from "../../components/shared/smooth-scrolling";


export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <main className="flex-grow mt-20">
                <SmoothScrolling>
                    {children}
                </SmoothScrolling>
            </main>
            <Footer />
            <ShinyMiransastext/>
        </>
    );
}