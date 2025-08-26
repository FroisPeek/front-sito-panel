export const IsLoadingCard = () => {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className="h-20 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg animate-pulse"
                />
            ))}
        </div>
    )
}