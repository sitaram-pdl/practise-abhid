
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
    email:string;
    username: string;
    password: string;
    address ?: AddressType ;
    id ?: number;
    name ?: {
        firstname: string;
        lastname: string;
    };
    phone ?:string;
    __v ?: number;
}

export interface UserContextType {
    users: UsersType[];    
    isDeleteModalOpen: boolean;
    notificationMessage: string;
    deleteTargetId: number | null;
    isAddNewUserModalOpen: boolean;
    setDeleteModalOpen: (isOpen:boolean) => void;
    setNotificationMessage: (message:string) => void;
    setDeleteTargetId:(id:number|null) => void;
    setAddNewUserModalOpen: (isOpen:boolean)=> void;
    handleRemove: (id: number) => void;
    HandleAddNewUser:() => void;
    confirmDelete: () => Promise<void>;
    ConfirmAddNewUser: (NewUser:UsersType) => Promise<boolean>;
}

export interface ProviderPropsType{
    children: React.ReactNode;
}

// export interface CreateNewUser {
//     email:string;
//     username: string;
//     password: string;
// }

