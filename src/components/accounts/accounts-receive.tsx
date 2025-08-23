import { Clients } from "@/app/home/accounts/accounts.interface"

interface iProps {
    clients: Clients[] | never[] | undefined
    isLoadingClients: boolean
}

export const AccoutnsReceive = ({ clients, isLoadingClients }: iProps) => {
    return (
        <div>

            <p>Aqui, vamos listar os pedidos ja solicitados podendo informar quanto queremos pagar</p>
        </div>
    )
}