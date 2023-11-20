export default function CloseButton() {
    return (
        <button type="button" className="absolute bg-gray-100 right-[8vw] top-[3vh] rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    )
}