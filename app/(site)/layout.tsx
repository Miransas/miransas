// app/(main)/layout.tsx

import Footer from "../../components/shared/footer";
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
        </>
    );
}