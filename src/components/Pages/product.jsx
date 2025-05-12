import { useEffect, useState } from "react";
import Authlayout from "../Layouts/AuthLayout";
import CardItems from "../Fragments/CardItems";
import { BannerContent } from "../Fragments/Content";
import { Card } from "../Elements/card";
import { H1 } from "../Elements/heading";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ItemSpesification } from "../Fragments/ItemSpesification";
import { useParams } from "react-router-dom";
import useClass from "../../hooks/useClass";

const token = localStorage.getItem("token");
const ProductPage = () => {
    const {id} = useParams();
    const { selectedClass, classFacilities } = useClass(id);
    const { limitedClass } = useClass(id,3);

useEffect(() => {
    if(token === null) {
        window.location.href = "/login";
    }
}, []);

const [openIndex, setOpenIndex] = useState(0);

const toggle = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};

const strLimit = (str, limit) => {
    if (!str) return "";
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

 return (
    <Authlayout title="Home" navType="home" withFooter={true}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <section className="banner-hero banner-space">
                <div className="banner-content">
                    <BannerContent 
                        title={selectedClass?.page_title}
                        desc={selectedClass?.description}
                        varian="text-left"
                    >
                    <img className="mt-3" src="../assets/head_star.svg" alt="" />
                    </BannerContent>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 ...">
                <div className="col-span-2 ... order-2 md:order-1">
                    {selectedClass?.long_description && (
                        <Card varian="md:mr-4">
                            <H1>Deskripsi</H1><br />
                            <p>{selectedClass.long_description}</p>
                        </Card>  
                    )}
                    {selectedClass?.tutors.length > 0 && (
                        <Card varian="md:mr-4 mt-4 py-6">
                            <H1>Belajar bersama Tutor Profesional</H1><br />
                            <div className="grid grid-cols-1 md:grid-cols-2 ...">
                                {selectedClass?.tutors.map((item) => (
                                    <div className="col-span-1 ..." key={item.id}>
                                        <Card varian="md:mr-4">
                                            <div className="grid grid-cols-12 ...">
                                                <div className="col-span-2 ... "><img src={`../assets/${item.photo}`} alt="" /></div>
                                                <div className="col-span-10 ...">
                                                    <p className="text-sm mx-2 font-medium">{item.name}</p>
                                                    <p className="text-xs mx-2">{item.position} di <span className="font-medium">{item.company}</span></p>
                                                </div>
                                            </div>
                                            <p className="mt-2">{item.description}</p>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    )}
                    <Card varian="md:mr-4">
                        <H1>Kamu akan Mempelajari</H1><br />
                        {selectedClass?.modules.map((section, index) => (
                            <div key={index} className="mb-4">
                            {/* Section Header */}
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex justify-between items-center text-green-600 font-semibold text-base focus:outline-none"
                            >
                                <span className="hidden md:block">{section.title}</span>
                                <span className="block md:hidden">{strLimit(section.title, 35)}</span>
                                {openIndex === index ? (
                                <ChevronUp size={20} />
                                ) : (
                                <ChevronDown size={20} />
                                )}
                            </button>

                            {/* Lessons */}
                            {openIndex === index && selectedClass?.modules.length > 0 && (
                                <div className="mt-3 space-y-2 pl-3">
                                {selectedClass?.modules.map((lesson, i) => (
                                    <div
                                    key={i}
                                    className="flex items-center justify-between bg-white p-3 rounded border"
                                    >
                                    <div className="grid grid-cols-12 ...">
                                        <div className="col-span-9">
                                            {lesson.title}
                                        </div>
                                        <div className="col-span-3 flex justify-end hidden md:block">
                                            <div className="flex items-center gap-1">
                                                <img src="../assets/play.svg" alt="" />
                                                <span className="text-sm text-gray-800">Video</span>
                                                <img src="../assets/clock.svg" alt="" />
                                                <span className="text-sm text-gray-500">{lesson.duration} menit</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    </div>
                                ))}
                                </div>
                            )}
                            </div>
                        ))}
                    </Card>
                </div>
                <div className="col-span-1 ... mx-2 sm:mx-0 order-1 md:order-2">
                    {selectedClass && (
                        <ItemSpesification isDetail={false} data={selectedClass} id={id} facilities={classFacilities} />
                    )}
                </div>
            </div>
            <h3 className="text-2xl font-weigh-200 mt-4">Video Pembelajaran Terkait Lainnya</h3>
            <p className="mt-2">Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!</p>
            <div className="grid grid-cols-1 md:grid-cols-3 ...">
                {limitedClass.length > 0 && limitedClass.slice(0, 3).map((item) => (
                    <CardItems 
                        key={item.id} 
                        data={item}
                    />
                ))}
            </div>
        </div>
    </Authlayout>
 );
}

export default ProductPage