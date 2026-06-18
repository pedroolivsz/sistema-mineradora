import Header from "../components/header"
import Menu from "../components/menu"
import Footer from "../components/footer"
function MainLayout({ children }) {
    return (
        <>
            <Header />

            <div style={{
                display: "flex",
                minHeight: "calc(100vh - 130px)"
            }}>
                <Menu />

                <main style={{
                    flex: 1,
                    padding: "20px"
                }}>
                    { children }
                </main>
            </div>

            <Footer />
        </>
    )
}

export default MainLayout;