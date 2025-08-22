import { useEffect, useState } from 'react';

const useFetch = <T>(fetchFunction: () => Promise<T>) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            fetchFunction().then((result) => {
                setData(result);
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error
                    : new Error('An error occured while loading question(s)')
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error };
};

export default useFetch;
