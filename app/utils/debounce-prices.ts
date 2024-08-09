import { useState, useEffect } from 'react';

function useDebouncePriceRange(value: [number, number], delay: number) {
    const [debouncedValue, setDebouncedValue] = useState<[number, number]>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup the timeout if the value changes before the delay
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebouncePriceRange;
