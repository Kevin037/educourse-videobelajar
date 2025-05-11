import { number_format } from "../../data";
import { ButtonPrimaryMD, ButtonWhiteMD } from "../Elements/button";
import { ClassStatusDisplay, StatusDisplay } from "../Elements/status_orders";

export const SegmentCard = (props) => {
    const {headContent,middleContent, footContent} = props
    return (
        <>
        <div className="mt-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-300">
             <div className="border-b p-4 bg-green-50 border-gray-300 rounded-lg">
                 <div className="grid grid-cols-1 md:grid-cols-12 ... text-sm text-gray-600">
                    {headContent}
                 </div>
             </div>
             <div className="border-b p-4 bg-green-30 border-gray-300">
                <div className="grid grid-cols-12 ... gap-2">
                    {middleContent}
                 </div>
             </div>
             <div className="p-4 bg-green-50 rounded-lg">
                <div className="grid grid-cols-12 ... flex items-center">
                    {footContent}
                </div>
             </div>
         </div>
        </>
    )
}

export const ClassCard = (props) => {
    const {order} = props
    return (
        <>
        <SegmentCard 
            headContent={
                <>
                     <div className="col-span-9 ...">
                         <p className="hidden md:block">{order.modul_progress} Modul Terselesaikan</p>
                     </div>
                     <div className="col-span-3 ... text-left md:text-right mt-3 md:mt-0">
                        <ClassStatusDisplay status={order.class_status} />
                     </div>
                </>
            }
            middleContent={
                <>
                    <div className="col-span-12 md:col-span-3 ... gap-3 object-cover h-auto">
                        <img className="object-cover h-full w-full rounded-lg" src={`../assets/${order.photo}`} alt="" />
                    </div>
                    <div className="col-span-12 md:col-span-9 ... mx-2 sm:mx-0">
                        <h4 className="text-ls mt-2 md:mt-0 font-bold">{order.title}</h4>
                        <p className="text-sm mt-2 hidden md:block">Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik</p>
                        <div className="my-2 grid grid-cols-3 grid-cols-12">
                            <div className="col-span-2 md:col-span-1">
                                <img src={`../assets/${order.avatar}`} alt="" />
                            </div>
                            <div className="text-sm col-span-10 md:col-span-10 ...">
                                <p><b>{order.user}</b></p>
                                <p>{order.user_position} di {order.user_company}</p>
                            </div>
                        </div>
                        <div className="my-2 grid grid-cols-3 grid-cols-5 text-sm text-gray-500 mt-4">
                            <div className="col-span-5 md:col-span-3 flex gap-2">
                                <img src="../assets/modul.svg" className="w-5" alt="" />{order.total_modul} Modul
                                <img src="../assets/time.svg" className="w-5" alt="" />{order.total_time} Menit
                            </div>
                            <div className="col-span-1"></div>
                        </div>
                    </div>
                </>
            }
            footContent={
                <>
                    <div className={`text-align col-span-6 md:col-span-3`}>
                        Progres Kelas: <span className="font-bold">{order.percentage_progress}%</span>
                    </div>
                    <div className={`flex items-center col-span-6 ${(order.class_status == "in_progress") ? "md:col-span-5" : "md:col-span-3"}`}>
                        {(order.class_status == "in_progress") && (
                            <img src="../assets/progress_bar_completed.svg" className="justify-center w-full" alt="" />
                        )}
                        {(order.class_status == "completed") && (
                            <img src="../assets/progress_bar.svg" className="justify-center w-full" alt="" />  
                        )}
                    </div>
                    {(order.class_status == "completed") && (
                        <>
                            <div className={`text-center md:text-right col-span-12 md:col-span-3 mt-4 md:mt-0`}>
                                <ButtonWhiteMD varian="mx-1">Unduh Sertifikat</ButtonWhiteMD>
                            </div>
                            <div className={`text-center md:text-right col-span-12 md:col-span-3 mt-2 md:mt-0`}>
                                    <ButtonPrimaryMD url={`/class/${order.class_id}`} varian="mx-1">Lihat Detail Kelas</ButtonPrimaryMD>
                            </div>
                        </>
                    )}
                    {(order.class_status == "in_progress") && (
                        <div className={`text-center md:text-right col-span-12 md:col-span-4 mt-4 md:mt-0`}>
                            <ButtonPrimaryMD url={`/class/${order.order_id}`}>Lanjutkan Pembelajaran</ButtonPrimaryMD>  
                        </div>
                    )}
                </>
            }
        />
        </>
    )
}

export const OrderCard = (props) => {
    const {order} = props
    return (
        <>
            <SegmentCard 
                headContent={
                    <>
                        <div className="col-span-9 ... flex gap-3 text-sm text-gray-600">
                            <p className="hidden md:block">No. Invoice: </p> <span className="text-blue-600"> {order.no}</span>
                            <p className="hidden md:block">Waktu Pembayaran: </p> <span>{order.paid_at}</span>
                        </div>
                        <div className="col-span-3 ... text-left md:text-right mt-3 md:mt-0">
                            <StatusDisplay status={order.status} />
                        </div>
                    </>
                }
                middleContent={
                    <>
                        <div className="col-span-3 md:col-span-1 ...">
                            <img className="rounded-lg object-cover h-auto" src={`../assets/${order.photo}`} alt="" />
                        </div>
                        <div className="col-span-9 md:col-span-9 ...border-r border-gray-300">
                            <p className="text-lg">{order.title}</p>
                        </div>
                        <div className="col-span-12 md:col-span-2 ... text-left md:text-right">
                            <p className="text-sm mt-3 md:mt-0">Harga</p>
                            <p className="font-medium">Rp {number_format(order.new_price)}</p>
                        </div>
                    </>
                }
                footContent={
                    <>
                        <div className="col-span-7 ...">
                            Total Pembayaran
                        </div>
                        <div className="col-span-5 ... text-right">
                            <p className="price">Rp {number_format(order.new_price)}</p>
                        </div> 
                    </>
                }
            />
        </>
    )
}