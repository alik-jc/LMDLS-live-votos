import { useEffect, useState } from 'react';

interface VersionData {
    version: string;
    timestamp: string;
}

export const VersionChecker = () => {
    const [currentVersion, setCurrentVersion] = useState<string | null>(null);
    const [hasUpdate, setHasUpdate] = useState(false);

    useEffect(() => {
        const fetchVersion = async () => {
            try {
                const response = await fetch('/version.json?_=' + Date.now(), { cache: 'no-store' });
                if (!response.ok) return null;
                const data: VersionData = await response.json();
                return data.version;
            } catch (error) {
                console.error('Error checking version:', error);
                return null;
            }
        };

        // Initial check
        fetchVersion().then((version) => {
            if (version) setCurrentVersion(version);
        });

        // Poll every minute
        const interval = setInterval(async () => {
            const newVersion = await fetchVersion();
            if (newVersion && currentVersion && newVersion !== currentVersion) {
                setHasUpdate(true);
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [currentVersion]);

    const handleReload = () => {
        window.location.reload();
    };

    if (!hasUpdate) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-bounce">
            <div
                onClick={handleReload}
                className="bg-primary text-white px-4 py-3 rounded-lg shadow-lg cursor-pointer hover:bg-primary/90 transition-all flex items-center gap-2 border border-white/20"
            >
                <span className="text-xl">✨</span>
                <div>
                    <div className="font-bold text-sm">Nueva versión disponible</div>
                    <div className="text-xs opacity-90">Haz click para actualizar</div>
                </div>
            </div>
        </div>
    );
};
