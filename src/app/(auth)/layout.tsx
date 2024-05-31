import {ReactNode} from "react";

type PropsType = {
    children: ReactNode
}

export default function AuthLayout({children}: PropsType) {
    return (
        <section className='flex items-center justify-center h-lvh'>
            {children}
        </section>
    )
}