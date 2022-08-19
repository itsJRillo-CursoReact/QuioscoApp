export const formatearPrecio = precio => {
    return precio.toLocaleString('es-ES',{
        style:"currency",
        currency:"EUR"
    })
}