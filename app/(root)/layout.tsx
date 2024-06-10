import Header from "@/components/Header"
import { Separator } from "@/components/ui/separator"

const RootLayout = ({ children } : { children : React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="fixed w-full z-50 backdrop-blur-2xl">
                <Header />
                <Separator className="w-full mt-1 h-[2px]" />
            </div>
            <div className="mt-[63px]">
                { children }
            </div>
        </div>
    )
}

export default RootLayout