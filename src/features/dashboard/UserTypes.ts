
export interface AddressType{
        city:string;
        geolocation:{
            lat: string;
            long:string;
        },
        number: number;
        street: string;
        zipcode: string;
    }
export interface UsersType{
    address: AddressType ;
    id: number;
    email:string;
    name: {
        firstname: string;
        lastname: string;
    };
    password: string;
    phone:string;
    username: string;
    __v: number;
}

export interface UserContextType {
    users: UsersType[]    
}

export interface ProviderPropsType{
    children: React.ReactNode;
}
