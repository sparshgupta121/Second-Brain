
interface InputProps {
    placeholder: string;
    reference?: any;
}

export const Input = ({placeholder, reference}: InputProps) => {
    return <div>
        <input ref={reference} type="text" placeholder={placeholder}  className="px-4 py-2 border border-gray-300 rounded-lg mt-3 w-full outline-none text-gray-700" />
    </div>
}