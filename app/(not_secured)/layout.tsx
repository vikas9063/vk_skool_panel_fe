import Appbar from "../components/Appbar/Appbar";
import Footer from "../components/Footer/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Appbar />
            <section className="min-h-[90vh]">
                {children}
            </section>
            <Footer />
        </div>
    );
}
