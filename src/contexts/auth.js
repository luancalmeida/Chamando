import {useState, createContext, useEffect} from 'react'
import firebase from '../services/firebaseConnection'
import { toast, ToastContainer } from 'react-toastify';

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

    //entrar na conta se for usuario
    async function signIn(email, password) {
        setLoadingAuth(true)

        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) =>{
            let uid = value.user.uid;

            const userProfile = await firebase.firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                avatarUrl: userProfile.data().avatarUrl,
                email: value.user.email
 
            }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success('Seja bem vindo!')

        })
        .catch((erro)=>{
            console.log(erro)
            toast.error('Ops. Acho que sua senha ou email estão errados!')
            setLoadingAuth(false)
            
        })
    }




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
                toast.success('Bem vindo!')

            })
        })
        .catch((error)=>{
            console.log(error)
             toast.error('Vish, Algo deu errado!')
             setLoadingAuth(false)
           
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
            signOut,
            signIn,
            loadingAuth,
            setUser,
            storageUser
        }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider