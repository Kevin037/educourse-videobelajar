import { Link } from "react-router-dom"
import { Card } from "../Elements/card"
import { formatNumberToK } from "../../data"

const CardItems = (props) => {
    const {data} = props
    return (
        <Link to={`/product/${data.id}`}>
        <Card key={data.id} varian="mx-2 max-w-sm">
        <div className="grid grid-cols-3 md:grid-cols-1 ...">
            <div className="col-span-1 ...">
                <img className="img-item" src={`../assets/${data.photo}`} alt="" />
            </div>
            <div className="col-span-2 ... mx-2 sm:mx-0">
                <h4 className="text-ls sm:mt-2 font-bold">{data.title}</h4>
                <p className="text-sm mt-2 hidden md:block">{data.desc}</p>
                <div className="my-2 grid grid-cols-3 grid-cols-5 ...">
                    <div className="col-span-1 ...">
                        <img src={`../assets/${data.avatar}`} alt="" />
                    </div>
                    <div className="text-sm col-span-4 ...">
                        <p><b>{data.user}</b></p>
                        <p>{data.user_position} di {data.user_company}</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 grid-cols-4 ...">
            <div className="col-span-3 ...">
            <div className="grid grid-cols-1 grid-cols-2 ...">
                <div className="col-span-1"><img src="../assets/rating.svg"/></div>
                <div className="col-span-1">{data.rating} ({data.total_selling})</div>
            </div>
            </div>
            <div className="col-span-1 ...">
                <b><h5 className="price">Rp {formatNumberToK(data.price)}</h5></b>
            </div>
        </div>
    </Card>
    </Link>
    )
}

export default CardItems