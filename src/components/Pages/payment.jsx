import { useEffect, useState } from "react";
import Authlayout from "../Layouts/AuthLayout";
import { ButtonPrimarySubmit, ButtonWhite } from "../Elements/button";
import { Card } from "../Elements/card";
import { H1 } from "../Elements/heading";
import { ItemSpesification } from "../Fragments/ItemSpesification";
import { getHowToPay, getPaymentMethods } from "../../data";
import { TransactionNominal } from "../Fragments/TransactionNominal";
import { PaymentMethodDetail } from "../Fragments/PaymentMethodDetail";
import { ChevronDown } from "lucide-react";
import { PaymentTimer } from "../Fragments/PaymentTimer";
import { useParams } from "react-router-dom";
import useOrder from "../../hooks/useOrder";
import useClass from "../../hooks/useClass";

const token = localStorage.getItem("token");
const PaymentPage = () => {
    const {id} = useParams();
    const [paymentMethod, setPaymentMethod] = useState("");
    const [openHowToPay, setOpenHowToPay] = useState("");
    const [howToPays, setHowToPays] = useState("");
    const { currentOrder } = useOrder(id);
    const class_id = currentOrder?.class_id;
    const { classFacilities } = useClass("",class_id);
    const { paidOrder, status } = useOrder();

    useEffect(() => {
        if(token === null) {
            window.location.href = "/login";
        }
        setHowToPays(getHowToPay());
    },[]);

    useEffect(() => {
        setPaymentMethod(getPaymentMethods(currentOrder?.payment_method));
    }, [currentOrder]);

    const HandlePaid = (e) => {
        e.preventDefault();
        if (paymentMethod === "") {
            alert("Pilih Metode Pembayaran");
            return false;
        }
        paidOrder({order_id:id});
    };

    useEffect(() => {
        if (status) {
            window.location.href = "/success_payment";
        }
    }, [status]);

 return (
    <Authlayout title="Home" navType="home" withFooter={false} style={{paddingTop: "0"}} customHead={<img src="../assets/process_payment.svg" className="w-100" />}>
        <PaymentTimer />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="p-2 mt-2 block md:hidden">
                <img src="../assets/process_payment_mobile.svg" className="w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 ...">
                <div className="col-span-2 order-2 md:order-1">
                    <Card varian="md:mr-4">
                        <H1>Metode Pembayaran</H1><br />
                        {paymentMethod && (
                            <PaymentMethodDetail paymentMethod={paymentMethod} />
                        )}
                        <TransactionNominal /><br />
                        <div className="grid grid-cols-1 md:grid-cols-2  ... gap-2 mt-2">
                            <div className="col-span-1 my-1"><ButtonWhite url={`/change_payment/${id}`}>Ganti Metode Pembayaran</ButtonWhite></div>
                            <div className="col-span-1 my-1"><ButtonPrimarySubmit onClick={HandlePaid} >Bayar Sekarang</ButtonPrimarySubmit></div>
                        </div>
                    </Card>
                    <Card varian="md:mr-4">
                        <H1>Tata Cara Pembayaran</H1><br />
                        {Object.entries(howToPays).map(([groupName, method]) => (
                            <div key={groupName} className="bg-white rounded-xl shadow-sm">
                            <button
                                className="w-full flex justify-between items-center px-4 py-3 font-medium mb-3"
                                onClick={() =>
                                setOpenHowToPay(openHowToPay === groupName ? "" : groupName)
                                }
                            >
                                {groupName}
                                <ChevronDown
                                className={`w-4 h-4 transition-transform ${
                                    openHowToPay === groupName ? "rotate-180" : ""
                                }`}
                                />
                            </button>
                            {openHowToPay === groupName && (
                                <div className="p-4 my-2">
                                    {method}
                                </div>
                            )}
                            </div>
                        ))}
                    </Card>
                </div>
                <div className="col-span-1 ... mx-2 sm:mx-0 order-1 lg:order-2">
                    {currentOrder && (
                     <ItemSpesification isDetail={true} data={currentOrder} facilities={classFacilities}/>   
                    )}
                </div>
            </div>
        </div>
    </Authlayout>
 );
}

export default PaymentPage