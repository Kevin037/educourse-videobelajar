import { H1 } from "../Elements/heading"

export const TransactionNominal = () => {
    return (
        <>
            <H1>Ringkasan Pesanan</H1><br />
            <div className="grid grid-cols-12">
                <div className="col-span-8">
                    <p className="text-slate-600">Video Learning: Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager. </p>
                </div>
                <div className="col-span-4 justify-self-end"><p>Rp 767.500</p></div>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-8">
                    <p className="text-slate-600">Biaya Admin</p>
                </div>
                <div className="col-span-4 justify-self-end"><p>Rp 7.000</p></div>
            </div>
            <hr className="mt-4 text-slate-400" />
            <div className="grid grid-cols-12 mt-4">
                <div className="col-span-8">
                    <p className="font-bold">Total Pembayaran</p>
                </div>
                <div className="col-span-4 justify-self-end"><p className="price">Rp 774.500</p></div>
            </div>
        </>
    )
}