import { useEffect, useState } from "react";
import Authlayout from "../Layouts/AuthLayout";
import { getTabs } from "../../data";
import CardItems from "../Fragments/CardItems";
import { BannerContent } from "../Fragments/Content";
import { Input, InputButton } from "../Elements/input";
import { ButtonYellow } from "../Elements/button";
import useClass from "../../hooks/useClass";

const token = localStorage.getItem("token");
const HomePage = () => {

const [activeTab, setActiveTab] = useState("");
const [tabs, setTabs] = useState([]);
const { classData } = useClass(activeTab === "" ? null : activeTab);

useEffect(() => {
    if(token === null) {
        window.location.href = "/login";
    }
    setTabs(getTabs());
    localStorage.removeItem("transactions");
}, []);

 return (
    <Authlayout title="Home" navType="home" withFooter={true}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <section className="banner-hero banner-space text-center">
                <div className="banner-content">
                    <BannerContent 
                        title="Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!"
                        desc="Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda."
                    />
                    <button className="bg-green-500 mt-4 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer">Temukan Video Course untuk Dipelajari!</button>
                </div>
            </section>

            <h3 className="text-2xl font-weigh-200 mt-4">Koleksi Video Pembelajaran Unggulan</h3>
            <p className="mt-2">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
            <div className="overflow-x-auto mx-4">
                <div className="flex space-x-6 whitespace-nowrap border-gray-200 mt-4 mx-4">
                    {tabs.length > 0 && tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`pb-2 font-medium text-sm md:text-base transition-all item-option ${
                        activeTab === tab.key
                            ? "text-red-500 cursor-pointer active"
                            : "text-gray-700 hover:text-red-500 cursor-pointer"
                        }`}
                    >
                        {tab.name}
                    </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 ...">
                {classData.length > 0 && classData.map((item) => (
                    <CardItems 
                        key={item.id} 
                        data={item} 
                    />
                ))}
            </div>
            <section className="banner-middle banner-space mt-4">
                <div className="banner-content">
                    <h6>NEWSLETTER</h6>
                    <BannerContent 
                        title="Mau Belajar Lebih Banyak?"
                        desc="Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik harisenin.com"
                    />
                    <InputButton
                    name="email"
                    type="email"
                    placeholder="Masukkan Emailmu"
                    varian="display-web"
                    buttonLabel="Subscribe"
                    />
                    <div className="display-mobile">
                        <Input
                            varian="bg-white text-gray-900 shadow-sm mt-4 mb-3"
                            type="email"
                            placeholder="Masukkan Emailmu"
                        />
                        <div className="d-grid gap-2">
                            <ButtonYellow 
                                varian="mt-2">Subscribe
                            </ButtonYellow>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </Authlayout>
 );
}

export default HomePage