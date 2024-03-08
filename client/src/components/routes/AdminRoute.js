import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner"

export default function AdminRoute() {
    const [ok, setOk] = useState(true);
    const [auth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get('/api/v1/auth/admin-auth', {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            setOk(res.data.ok);
        };
        if (auth?.token) authCheck()
    }, [auth?.token] );

    return ok ? <Outlet/> : <Spinner path="" />;
}