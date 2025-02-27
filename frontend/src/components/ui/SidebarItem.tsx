import { ReactElement } from "react"

export const SidebarItem = ({ text, icon }: {
    text: string,
    icon: ReactElement
}) => {
    return <div className="flex text-gray-700 max-w-52 p-2 cursor-pointer items-center mt-4 gap-4 hover:bg-customPurple-400 hover:text-customPurple-600 rounded-md transition-all duration-400 ease-in-out">
        <div className="ml-3">
            {icon} 
        </div>
        <div className="text-lg font-light">
            {text}
        </div>
    </div>
}