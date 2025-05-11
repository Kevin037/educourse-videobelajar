import { useEffect, useState } from "react";
import Authlayout from "../Layouts/AuthLayout";
import { getPaymentMethods, getToken } from "../../data";
import { ButtonPrimarySubmit } from "../Elements/button";
import { Card } from "../Elements/card";
import { H1 } from "../Elements/heading";
import { ItemSpesification } from "../Fragments/ItemSpesification";
import { CheckCircle, ChevronDown } from "lucide-react";
import { TransactionNominal } from "../Fragments/TransactionNominal";
import useClass from "../../hooks/useClass";
import { useParams } from "react-router-dom";
import useOrder from "../../hooks/useOrder";

const token = localStorage.getItem("token");
const auth = localStorage.getItem("user");
const CheckoutPage = () => {
    const {id} = useParams();
    const [paytmentMethods,setPaytmentMethods] = useState([]);
    const [openGroup, setOpenGroup] = useState("Transfer Bank");
    const [paymentMethod, setpaymentMethod] = useState("");
    const { selectedClass, classFacilities } = useClass("",id);
    const [class_id] = useState(id);

    const { currentOrder, createOrder } = useOrder();

useEffect(() => {
    if(token === null) {
        window.location.href = "/login";
    }
    setPaytmentMethods(getPaymentMethods());
}, []);

const HandleCheckout = (e) => {
    e.preventDefault();
    if (paymentMethod === "") {
        alert("Pilih Metode Pembayaran");
        return false;
    }
    

    const no = "HEL/VI/"+getToken(true);
    const order_id = getToken();
    const paid_at = "";
    const status = "pending";
    const avatar = selectedClass.avatar;
    const new_price = selectedClass.new_price;
    const price = selectedClass.price;
    const page_title = selectedClass.page_title;
    const photo = selectedClass.photo;
    const rating = selectedClass.rating;
    const title = selectedClass.title;
    const total_modul = selectedClass.total_modul;
    const total_time = selectedClass.total_time;
    const user = selectedClass.user;
    const user_company = selectedClass.user_company;
    const user_position = selectedClass.user_position;
    const user_id = auth;
    const class_status = "in_progress"

    createOrder({ order_id, no, class_id, paymentMethod, paid_at, status
     , avatar, new_price, price, page_title, photo, rating, title, total_modul, total_time, user, user_company, user_position, user_id, class_status
     });
};

useEffect(() => {
    if (currentOrder) {
        window.location.href = "/payment/"+currentOrder.order_id;
    }
}, [currentOrder]);

 return (
    <Authlayout title="Home" navType="home" withFooter={false} style={{paddingTop: "0"}} customHead={<img src="../assets/process_choose_payment.svg" className="w-100" />}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="p-2 mt-4 block md:hidden">
                <img src="../assets/process_choose_payment_mobile.svg" className="w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 ...">
                <div className="col-span-2 order-2 md:order-1">
                    <Card varian="md:mr-4">
                        <H1>Metode Pembayaran</H1><br />
                        {Object.entries(paytmentMethods).map(([groupName, methods]) => (
                            <div key={groupName} className="bg-white rounded-xl shadow-sm">
                            <button
                                className="w-full flex justify-between items-center px-4 py-3 font-medium mb-3"
                                onClick={() =>
                                setOpenGroup(openGroup === groupName ? "" : groupName)
                                }
                            >
                                {groupName}
                                <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                    openGroup === groupName ? "rotate-180" : ""
                                }`}
                                />
                            </button>

                            {openGroup === groupName && (
                                <div className="">
                                {methods.map((method) => (
                                    <button
                                    key={method.key}
                                    className={`flex items-center justify-between w-full px-4 py-3 hover:bg-gray-50 ${
                                        paymentMethod === method.key
                                        ? "bg-orange-50"
                                        : "bg-white"
                                    }`}
                                    onClick={() => setpaymentMethod(method.key)}
                                    >
                                    <div className="flex items-center gap-3">
                                        <img
                                        src={method.icon}
                                        alt={method.name}
                                        className="h-6"
                                        />
                                        <span>{method.name}</span>
                                    </div>
                                    {paymentMethod === method.key && (
                                        <CheckCircle className="text-orange-500 w-5 h-5" />
                                    )}
                                    </button>
                                ))}
                                </div>
                            )}
                            </div>
                        ))}
                    </Card>
                    <Card varian="md:mr-4 mt-4 py-6">
                        <TransactionNominal />
                        <ButtonPrimarySubmit onClick={HandleCheckout} varian="w-full mt-4">Beli Sekarang</ButtonPrimarySubmit>
                    </Card>
                </div>
                <div className="col-span-1 ... mx-2 sm:mx-0 order-1 lg:order-2">
                {selectedClass && (
                    <ItemSpesification isDetail={true} data={selectedClass} facilities={classFacilities} />
                )}
                </div>
            </div>
        </div>
    </Authlayout>
 );
}

export default CheckoutPage