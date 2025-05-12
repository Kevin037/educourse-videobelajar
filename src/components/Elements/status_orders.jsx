export const FailStatus = () => {
    return (
        <span className="bg-red-100 text-red-500 text-sm px-3 py-1 rounded-lg">
        Gagal
        </span>
    )
}

export const SuccessStatus = (props) => {
    const {label="Berhasil"} = props
    return (
        <span className="bg-green-100 text-green-500 text-sm px-3 py-1 rounded-lg">
        {label}
        </span>
    )
}

export const PendingStatus = (props) => {
    const {label="Belum Bayar"} = props
    return (
        <span className="bg-yellow-100 text-yellow-500 text-sm px-3 py-1 rounded-lg">
        {label}
        </span>
    )
}

export const StatusDisplay = (props) => {
    const {status} = props;
    return (
        <>
            {status === "pending" && (<PendingStatus />)}
            {status == "cancelled" && (<FailStatus />)}
            {status == "success" && (<SuccessStatus />)}
        </>
    )
}

export const ClassStatusDisplay = (props) => {
    const {status} = props;
    return (
        <>
            {status == "0" && (<PendingStatus label="Sedang Berjalan" />)}
            {status == "1" && (<SuccessStatus label="Selesai" />)}
        </>
    )
}