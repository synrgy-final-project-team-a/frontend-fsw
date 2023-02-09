import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { useDetilKosMutation } from "../../store/apis/kos";

const DetilKos = () => {
    const params = useParams();
    const kosID = params.id;

    const token = useSelector((state) => state.auth.token.access_token);

    const [detilKosHit, {isLoading, isSuccess, data}] = useDetilKosMutation();

    useEffect(() => {
        detilKosHit({token: token, id: kosID})
        // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

    return (
        <h1>blalblabla</h1>
    )
}

export default DetilKos