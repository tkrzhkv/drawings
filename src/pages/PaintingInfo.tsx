import React from 'react'
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";

const PaintingInfo: React.FC = () => {
    const [painting, setPainting] = React.useState<{
        imageUrl: string,
        title: string,
        price: number,
    }>()

    const {id} = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        async function fetchPaintings() {
            try {
                const {data} = await axios.get("https://63386d3b937ea77bfdbff520.mockapi.io/items/" + id)
                setPainting(data)
            } catch (error) {
                alert('Error with data')
                navigate('/')
            }
        }
        fetchPaintings()
    }, [])

    if(!painting) {
        return <>'Loading...'</>
    }

    return (
        <div className='container'>
            <img width={300} height={400} src={painting.imageUrl} alt="painting"/>
            <h2>{painting.title}</h2>
            <h4>{painting.price} $</h4>
        </div>
    )
}


export default PaintingInfo;