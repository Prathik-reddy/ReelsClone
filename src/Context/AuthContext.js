import React,{useState,useEffect} from 'react'
import { auth } from '../firebase';

export const AuthContext = React.createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    function SignUp(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    async function Login (email, password){
        const isUser =  await auth.signInWithEmailAndPassword(email, password);
        console.log(isUser);
        return isUser;
    }

    function Logout (){
        return auth.signOut();
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false);
        })
        return ()=>{
            unsub();
        }
    }, [])

    const store = {
        user,
        SignUp,
        Login,
        Logout
    }

    return (
        <AuthContext.Provider value = {store}>
            {!loading && children}
        </AuthContext.Provider>
    )

}