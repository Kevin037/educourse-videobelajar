import { useEffect, useState } from "react";
import useLesson from "../../hooks/useLesson";
import { json_to_array } from "../../data";
import { ArrowLeft, ArrowRight, Check} from "lucide-react";
import { H1 } from "../Elements/heading";
import { ButtonPrimary, ButtonSecondary } from "../Elements/button";
import ModalSubmitTest from "./ModalSubmitTest";
import { Link } from "react-router-dom";

const QuestionLesson = (props) => {
    const {orderData,type,classId,testNo,test,tests} = props
    const [answerOptions, setAnswerOptions] = useState([]);
    const {updateAnswer,submitStatus} = useLesson();
    const [selectedOption, setSelectedOption] = useState(test?.user_answer);
    const [totalAnswer, setTotalAnswer] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        if (test?.options) {
            setAnswerOptions(json_to_array(JSON.parse(test?.options)));
        }
        setSelectedOption(test?.user_answer);
    },[test])

    useEffect(() => {
        if (tests.length > 0) {
            setTotalAnswer(tests.filter(item => item.user_answer != null).length);
        }
    },[tests])

    const SendAnswer = (e,key) => {
        setSelectedOption(key)
        e.preventDefault();
        updateAnswer({id:testNo,answer:key});
    };
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 ...">
                <div className="col-span-1 md:col-span-4 ... sm:pb-0 md:pb-20 border-r p-4">
                <h1 className="font-bold mb-2">List Soal</h1>
                    <div className="grid grid-cols-10 ...">
                        {tests && tests.map((pretest) => (
                        <div className="col-span-2 ... p-2">
                            <Link to={`/class/${classId}/${type}/${pretest.id}`} 
                            className={`border-1 p-2 w-8 h-8 flex items-center justify-center border-gray-300 border-radius
                            ${pretest.user_answer != "" ? "bg-green-50 text-green-900 font-bold" : ""} ${pretest.id == testNo ? "bg-green-200 text-green-800" : ""}`}>{pretest.no}</Link>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1 md:col-span-8 ... sm:pb-0 md:pb-20 p-4 border-t-1 border-gray-300 md:border-t-0">
                    <H1>Pertanyaan {test?.no}</H1>
                    <p className="my-2">{test?.question}</p>
                    <div>
                          {answerOptions.map((option) => (
                            <label
                            key={option.key}
                            className={`flex items-center p-4 border rounded cursor-pointer transition duration-300 my-2 ${
                                selectedOption === option.key
                                ? "border-green-500 bg-green-50 text-green-600"
                                : "border-gray-300"
                            }`}
                            >
                            <input
                                type="radio"
                                name="custom-radio"
                                value={option.value}
                                checked={selectedOption === option.key}
                                onChange={(e) =>  SendAnswer(e,option.key)}
                                className="accent-green-500 mr-3"
                            />
                            <span className="text-sm">{option.value}</span>
                            </label>
                        ))}
                    </div>
                    {tests.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-8">
                            <div className="col-span-1">
                                {test?.no > 1 && (
                                <ButtonSecondary varian="w-full flex justify-center gap-2" url={`/class/${classId}/${type}/${tests[parseInt(parseInt(test.no)-2)].id}`}>                        
                                    <ArrowLeft/>
                                    <span className="text-sm font-medium">Sebelumnya</span>
                                </ButtonSecondary>   
                                )}
                            </div>
                            <div className="col-span-1">
                                {test?.no < tests.length ? (
                                <ButtonPrimary varian=" flex justify-center gap-2" url={`/class/${classId}/${type}/${tests[parseInt(parseInt(test.no))].id}`}>
                                    <span className="text-sm font-medium">Selanjutnya</span>
                                    <ArrowRight />
                                </ButtonPrimary>
                                ) : (
                                    <>
                                        <ButtonPrimary varian=" flex justify-center gap-2" onClick={() => setModalOpen(true)}>
                                            <span className="text-sm font-medium">Submit</span>
                                            <Check />
                                        </ButtonPrimary>
                                        <ModalSubmitTest 
                                            isOpen={isModalOpen} 
                                            onClose={() => setModalOpen(false)} 
                                            testNo={testNo} 
                                            totalQuestions={answerOptions.length} 
                                            totalAnswer={totalAnswer}
                                            orderId={orderData?.order_id}
                                            type={type}
                                            setModalOpen={setModalOpen}
                                            />
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default QuestionLesson