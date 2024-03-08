import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import {Outlet} from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner"

export default function PrivateRoute() {
    const [ok, setOk] = useState(true);
    const [auth, setAuth] = useAuth();

    useEffect (() => {
        const authCheck = async () => {
            const res = await axios.get('/api/v1/auth/user-auth');
            setOk(res.data.ok);
        };
        if (auth?.token) authCheck()
    }, [auth?.token] );

    return ok ? <Outlet/> : <Spinner />;
}





// export default function PrivateRoute() {
//     const [ok, setOk] = useState(false);
//     const [auth, setAuth] = useAuth();
//     const [loading, setLoading] = useState(true);

//         useEffect(() => {
//         const authCheck = async () => {
//             try {
//             const res = await axios.get("/api/v1/auth/user-auth");
//             if (res.data.ok) {
//                 setOk(true);
//             } else {
//                 setOk(false);
//             }
//             } catch (error) {
//             // Handle unauthorized error (401) here
//             console.error("Unauthorized request:", error);
//             setOk(false);
//             } finally {
//             setLoading(false);
//             }
//         };
    
//         if (auth?.token) authCheck();
//         }, [auth?.token]);
    
//         if (loading) {
//         return <Spinner />;
//         }
    
//         return ok ? <Outlet /> : <div className="text-center"><h1>Unauthorized access</h1></div>;
//     }