import { Outlet } from "react-router-dom";

export const Wrapper = () => {
    return (
        <article className={"w-screen h-screen flex"}>
            <aside className={"w-1/4 h-full bg-red-500 p-4"}></aside>
            <Outlet />
        </article>
    )
}