import type { FilterType } from '../types';

interface FilterButtonsProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
    isDark?: boolean;
}

export const FilterButtons = ({ currentFilter, onFilterChange, isDark = true }: FilterButtonsProps) => {
    const filters: { value: FilterType; label: string }[] = [
        { value: 'all', label: 'Todos' },
        { value: 'M', label: 'Hombres' },
        { value: 'F', label: 'Mujeres' },
    ];

    return (
        <div className={`flex rounded-lg p-1 ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
            {filters.map(({ value, label }) => (
                <button
                    key={value}
                    onClick={() => onFilterChange(value)}
                    className={`px-3 py-1 text-xs font-bold rounded transition-all ${currentFilter === value
                        ? (isDark ? 'bg-[#8c3034] text-white' : 'bg-white shadow-sm text-[#8c3034]')
                        : (isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700')
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};
