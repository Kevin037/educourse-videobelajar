import { CheckCircle, RefreshCcw, XCircle } from "lucide-react";
import { ButtonSecondary, ButtonWhiteMD } from "../Elements/button";
import { ucfirst } from "../../data";
import { useEffect } from "react";

const TestResult = (props) => {
    const {type,classId,resultData,testNo} = props
    const remedial = (type == "quiz" && resultData?.score < 70) ? true : false
    const image = (remedial) ? "/assets/tryagain.svg" : "/assets/result.svg"
    useEffect(() => {
        console.log(resultData);
        
    },resultData)
    return (
        <>
            <img src={image} alt="" />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-4">
                <div className=" mx-auto p-6 space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold">Tanggal Pretest:</h2>
                        <p className="text-gray-600">{resultData?.submitted_at}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-300 overflow-hidden">
                        <div className={` ${remedial ? "bg-orange-500" : "bg-yellow-400"} text-white border-r border-gray-300 flex flex-col justify-center p-6`}>
                            <span className="text-sm font-medium">Nilai</span>
                            <span className="text-3xl font-bold">{resultData?.score}</span>
                        </div>
                        <div className="flex flex-col border-r border-gray-300 justify-center p-6">
                            <span className="text-sm font-medium text-gray-500">Soal</span>
                            <span className="text-2xl font-bold">{resultData?.total_questions}</span>
                        </div>
                        <div className="flex flex-col border-r border-t border-gray-300 md:border-t-0 justify-center p-6">
                            <span className="text-sm font-medium text-gray-500">Benar</span>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="text-green-600" size={20} />
                                <span className="text-2xl font-bold">{resultData?.correct_answers}</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center border-t border-gray-300 md:border-t-0 p-6">
                            <span className="text-sm font-medium text-gray-500">Salah</span>
                            <div className="flex items-center gap-1">
                                <XCircle className="text-red-600" size={20} />
                                <span className="text-2xl font-bold">{resultData?.wrong_answers}</span>
                            </div>
                        </div>
                    </div>

                    {remedial ? (
                    <div>
                        <h3 className="text-lg font-semibold">Sedikit Lagi!</h3>
                        <p className="text-gray-600">
                        Kamu sudah menyelesaikan quiz dengan baik namun nilaimu belum cukup untuk melanjutkan materi.
                        </p><br />
                        <p className="text-gray-600 mt-1">Pelajari kembali modul sebelumnya dan kerjakan kembali quiz ini!</p>
                        <ButtonWhiteMD varian="mt-4" url={`/class/${classId}/quiz/${testNo}/rules`}>
                            <div className="flex items-center gap-1">
                                <RefreshCcw className="mr-2" size={20} />
                                <span className="text-md">Ulangi Quiz</span>
                            </div>
                        </ButtonWhiteMD>
                    </div>
                    ) : (
                    <div>
                        <h3 className="text-lg font-semibold">Selesai!</h3>
                        <p className="text-gray-600">
                        {ucfirst(type)} sudah selesai dan kami sudah mengetahui progresmu.
                        </p>
                        <p className="text-gray-600 mt-1">Saatnya memulai kelas!</p>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TestResult