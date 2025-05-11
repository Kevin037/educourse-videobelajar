import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = () => {
    return (
        <div>
        <div className="flex items-center justify-end space-x-2 mt-4">
        {/* Tombol Sebelumnya */}
        <button
            className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
            <ChevronLeft size={18} />
        </button>

        {/* Tombol Angka */}
        {Array.from({ length: 6 }).map((_, i) => {
            const page = i + 1;
            const isActive = page === 1;

            return (
            <button
                key={page}
                className={`w-10 h-10 rounded-md text-sm font-medium ${
                isActive
                    ? 'bg-yellow-400 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
            >
                {page}
            </button>
            );
        })}

        {/* Tombol Selanjutnya */}
        <button
            className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
            <ChevronRight size={18} />
        </button>
        </div>
    </div>
    )
}