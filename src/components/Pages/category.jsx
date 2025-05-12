import { useEffect, useRef, useState } from "react";
import Authlayout from "../Layouts/AuthLayout";
import { getDurationFilters, getOrderingFilters, getPriceFilters } from "../../data";
import { Card } from "../Elements/card";
import { H1 } from "../Elements/heading";
import { Pagination } from "../Fragments/Pagination";
import useClass from "../../hooks/useClass";
import CardItems from "../Fragments/CardItems";
import { FilterSection } from "../Fragments/FilterSection";
import { InputIcon, Select } from "../Elements/input";

const token = localStorage.getItem("token");
const CategoryPage = () => {

    // Filter
    const [category_id, setClassType] = useState(null);
    const [priceFilter, setPriceFilter] = useState(null);
    const [durationFilter, setDurationFilter] = useState(null);
    const [search, setKeyword] = useState("");
    const [ordering, setOrdering] = useState(null);
    const { classData, classCategoriesData } = useClass(null,0,category_id, priceFilter, durationFilter, search, ordering);
    // Filter

    const [durationFilters, setDurationFilters] = useState([]);
    const [priceFilters, setPriceFilters ] = useState([]);
    const [orderingFilters, setorderingFilters] = useState(null);
    const keywordRef = useRef(null);

    useEffect(() => {
        if(token === null) {
            window.location.href = "/login";
        }
        setDurationFilters(getDurationFilters());
        setPriceFilters(getPriceFilters());
        setorderingFilters(getOrderingFilters());
    }, []);

    const resetFilter = () => {
        window.location.reload();
    }
 return (
    <Authlayout title="Home" navType="home" withFooter={true}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <H1>Koleksi Video Pembelajaran Unggulan</H1>
            <div className="grid grid-cols-1 md:grid-cols-12 ...">
                <div className="col-span-4 ...">
                    <p className="text-sm text-gray-400">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
                    <Card varian="md:mr-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-800">Filter</h2>
                            <button className="text-sm text-red-500 cursor-pointer" onClick={resetFilter}>Reset</button>
                        </div>
                        <FilterSection
                            title={<span className="flex items-center gap-2">
                                    <img src="../assets/bidang_filter.svg" alt="" /> Bidang Studi
                                    </span>}
                            name="ClassType"
                            options={classCategoriesData}
                            onChange={e => setClassType(e.target.value)}
                        />
                        <FilterSection
                            title={<span className="flex items-center gap-2">
                                <img src="../assets/price_filter.svg" alt="" /> Harga
                                </span>}
                            name="price"
                            options={priceFilters}
                            onChange={e => setPriceFilter(e.target.value)}
                        />
                        <FilterSection
                            title={<span className="flex items-center gap-2">
                                <img src="../assets/duration_filter.svg" alt="" /> Durasi
                                </span>}
                            name="duration"
                            options={durationFilters}
                            onChange={e => setDurationFilter(e.target.value)}
                        />
                    </Card>
                </div>
                <div className="col-span-8 ... mx-2 sm:mx-0">
                    <div className="flex mb-4 justify-end">
                        <Select className="bg-white mr-2 border-gray-200 md:mt-0 mt-4" onChange={e => setOrdering(e.target.value)} responsive={true}>
                            <option value="" disabled selected>Urutkan</option>
                            {orderingFilters?.length > 0 && orderingFilters.map((ordering) => (
                                <option value={ordering.id} key={ordering.id}>{ordering.name}</option>
                            ))}
                        </Select>
                        <InputIcon 
                        name="search" 
                        type="text" 
                        placeholder="Cari Kelas" 
                        varian="bg-white mr-2 border-gray-200 md:mt-0 mt-4 " 
                        icon="search.svg" 
                        responsive={true}
                        onChange={(e) => setKeyword(e.target.value)}
                        value={search}
                        ref={keywordRef}>
                        </InputIcon>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 ...">
                        {classData.length > 0 && classData.map((item) => (
                            <CardItems 
                                key={item.id} 
                                data={item} 
                            />
                        ))}
                    </div>
                    {classData.length > 0 && (
                        <Pagination />
                    )}
                </div>
            </div>
        </div>
    </Authlayout>
 );
}

export default CategoryPage