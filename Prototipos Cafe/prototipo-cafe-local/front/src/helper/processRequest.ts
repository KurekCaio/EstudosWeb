export type Pedido = {
    name: string;
    phone: number;
    coffee: number;
}

export const processRequest = (name: string, phone: number, coffee: number) => {
    let nameCopy = '';
    let phoneCopy = 0;
    let coffeeCopy = 0;
    
    nameCopy = name;
    phoneCopy = phone;
    coffeeCopy = coffee;

    return (nameCopy)
}