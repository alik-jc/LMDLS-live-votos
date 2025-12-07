import type { FilterType } from '../types';

interface FilterButtonsProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export const FilterButtons = ({ currentFilter, onFilterChange }: FilterButtonsProps) => {
    const filters: { value: FilterType; label: string }[] = [
        { value: 'all', label: 'Todos' },
        { value: 'M', label: 'Hombres' },
        { value: 'F', label: 'Mujeres' },
    ];

    return (
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl w-fit">
            {filters.map(({ value, label }) => (
                <button
                    key={value}
                    onClick={() => onFilterChange(value)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${currentFilter === value
                            ? 'bg-primary text-white shadow-[0_2px_10px_rgba(139,92,246,0.3)]'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};
