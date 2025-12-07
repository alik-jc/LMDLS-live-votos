import React from 'react'

export { Page }

function Page({ is404 }: { is404: boolean }) {
    if (is404) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-gray-400">Página no encontrada.</p>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">500</h1>
                <p className="text-gray-400">Algo salió mal.</p>
            </div>
        </div>
    )
}
