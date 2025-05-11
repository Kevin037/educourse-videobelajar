import VideoPlayer from "../Fragments/Video";
import { H1 } from "../Elements/heading";
import { ButtonPrimaryMD, ButtonWhiteMD } from "../Elements/button";
import QuestionLesson from "./QuestionSegment";
import { ucfirst } from "../../data";
import TestResult from "./ResultTestSegment";

export const ContentLessson = (props) => {
    const {orderData,type,classId,testNo,test,tests,rules,resultData,selectedLesson} = props
    return (
        <>
        {testNo != null ? (
            testNo === "result" ? (
                <TestResult orderData={orderData} type={type} classId={classId} testNo={testNo} test={test} tests={tests} resultData={resultData} />
            ) : (rules === "rules" || rules === "result") ? (rules === "rules") ? (
                <TestLesson orderData={orderData} type={type} classId={classId} testNo={testNo} />
            ) : (
                <TestResult orderData={orderData} type={type} classId={classId} testNo={testNo} test={test} tests={tests} resultData={resultData} />
            ) : (
                <QuestionLesson orderData={orderData} type={type} classId={classId} testNo={testNo} test={test} tests={tests} />
            )
        ) : ['pre-test'].includes(type) ? (
                    <TestLesson orderData={orderData} type={type} classId={classId} />
                ) : (
            <VideoLessson orderData={orderData} selectedLesson={selectedLesson} />
        )}
        </>
    )
}

export const VideoLessson = (props) => {
    const {orderData,selectedLesson} = props
    return (
        <>
            <VideoPlayer />
            {selectedLesson?.type === "rangkuman" && (
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-4">
                <H1>Download Rangkuman Modul</H1>
                <p className="text-gray-500">Silakan download rangkuman modul dari materi yang telah kamu pelajari</p>
                <ButtonWhiteMD varian="mt-4">
                <div className="flex gap-2 justify-center">
                    <img src="/assets/download.svg" alt="" />
                    <span>Download Rangkuman</span>
                </div>
                </ButtonWhiteMD>
            </div>
            )}
            {selectedLesson?.type === "video" && (
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-4">
                <H1>Praktikkan Skill dengan Technical Book</H1>
                <p>Pelajari dan praktikkan skill teknis dalam berbagai industri dengan Technical Book Riselearn</p>
                <div className="my-2 grid grid-cols-3 grid-cols-12 ...">
                    <div className="col-span-1 ...">
                        <img src={`/assets/${orderData?.avatar}`} alt="" />
                    </div>
                    <div className="text-sm col-span-11 ...">
                        <p><b>{orderData?.user}</b></p>
                        <p>{orderData?.user_position} di {orderData?.user_company}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <img src="/assets/rating.svg"/>
                    <p>{orderData?.rating} ({orderData?.total_selling})</p>
                </div>
            </div>
            )}
        </>
    )
}

export const TestLesson = (props) => {
    const {orderData,type,classId,testNo} = props
    return (
        <>
            <img src="/assets/rules.svg" alt="" />
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-4">
                <H1>Aturan</H1>
                <p className="my-2">Kerjakan {type} dengan sebaik mungkin untuk mengukur pemahaman awalmu terkait materi yang akan kamu pelajari</p>
                <p className="my-2">Syarat Nilai Kelulusan: - <br />Durasi Ujian: 5 Menit</p>
                <p className="my-2">Jangan khawatir, total skor tidak akan memengaruhi kelulusan dan penilaian akhirmu dalam rangkaian kelas ini</p>
            <ButtonPrimaryMD url={`/class/${classId}/${type}/${testNo}`} varian="mt-4 text-center">Mulai {ucfirst(type)}</ButtonPrimaryMD>
            </div>
        </>
    )
}