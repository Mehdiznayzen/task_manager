'use client'

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface TooltipComponent {
    children : React.ReactNode,
    text : string
}

const TooltipComponent = ({ children, text }: TooltipComponent) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    { children }
                </TooltipTrigger>
                <TooltipContent>
                    <p>{ text }</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipComponent