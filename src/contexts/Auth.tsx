import apisos from "@/services/apisos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, useCallback, useEffect, useState } from "react";

interface SignInProps {
    email: string;
    password: string;
}

export const AuthContext = createContext<any>({} as any);
interface AuthProps {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProps) {
    const [user, setUser] = useState<any>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [clientData, setClientData] = useState<any>([]);

    // Armazena usuário no storage

    async function loadStorage(udata: any) {
        const storageUser = await AsyncStorage.getItem("Auth_user");
        if (storageUser) {
            setUser(JSON.parse(storageUser))
        }
    }

    const signIn = useCallback(async ({email, password }: SignInProps) => {
        console.log(email, password );
        
        await apisos.post('/loginuser', {
            "email": email,
            "password": password
        })
            .then((res) => {
                const { result, success } = res.data;
                if(!success){
                    console.log('erro');
                    return;
                }
                
                let udata = {
                    id: result.id,
                    nome: result.name,
                };
                loadStorage(udata);
                setUser(udata);
                router.push('/(tabs)/');
            })
            .catch((err) => {
                console.log(err);console.log('erro');
            })
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                showModal,
                setShowModal,
                clientData,
                setClientData,
                signIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}