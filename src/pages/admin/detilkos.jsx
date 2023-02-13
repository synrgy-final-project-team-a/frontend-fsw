import { useParams } from "react-router-dom"

const DetilKos = () => {
    const params = useParams();
    const kosID = params.id;

    return (
        <h1>{kosID}</h1>
    )
}

export default DetilKos