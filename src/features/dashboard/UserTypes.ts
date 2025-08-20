
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
    users: UsersType[];    
    isDeleteModalOpen: boolean;
    notificationMessage: string;
    deleteTargetId: number | null;
    setDeleteModalOpen: (isOpen:boolean) => void;
    setNotificationMessage: (message:string) => void;
    setDeleteTargetId:(id:number|null) => void;
    handleRemove: (id: number) => void;
    confirmDelete: () => Promise<void>;
}

export interface ProviderPropsType{
    children: React.ReactNode;
}
