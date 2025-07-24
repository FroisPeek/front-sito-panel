export const useHomeModel = () => {
    const currentDate = new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return {
        currentDate
    }
}