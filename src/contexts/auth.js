import {useState, createContext, useEffect} from 'react'
import firebase from '../services/firebaseConnection'

//contexto
export const AuthContext = createContext ({});

//provaider para ter no contexto
function AuthProvider({children}){
    const[user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [ loading, setLoading] = useState(true)

//verificar se tem um usuario logado, passar para as states e redirecionar ao dashboard    
    useEffect (()=>{

        function loadStorage(){
        const storageUser = localStorage.getItem('SistemaUser')

        if(storageUser){
            setUser(JSON.parse(storageUser))
            setLoading(false)
        }
        setLoading(false)
    }

    loadStorage()

    }, [])




    async function signUp(email, password, nome){
        //cadastrar usuario
        setLoadingAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value)=>{
            let uid = value.user.uid

            //cadastrar no banco
            await firebase.firestore().collection('users')
            .doc(uid).set({
                nome: nome,
                avatarUrl: null,
            })
            .then(()=>{
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                }
                setUser(data)
                storageUser(data)
                setLoadingAuth(false)

            })
        })
        .catch(()=>{

        })
    }

    //função para salvar o intem no localstorage
    function storageUser(data){
        localStorage.setItem('SistemaUser',JSON.stringify(data))
    }

    // Deslogar da conta.
    async function signOut(){
        await firebase.auth().signOut()
        localStorage.removeItem('SistemaUser')
        setUser(null)
    }


    return(
        <AuthContext.Provider value={{
            signed: !!user, 
            user, 
            loading, 
            signUp,
            signOut
            }} >
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider