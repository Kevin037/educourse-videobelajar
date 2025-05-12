const items = [
    {
        id: 1,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik",
        photo: "../assets/item1.svg",
        avatar: "../assets/avatar1.svg",
        user: "Jenna Ortega",
        user_position: "Senior Accountant",
        user_company: "Gojek",
        type: "marketing"
    },
    {
        id: 2,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik",
        photo: "../assets/item2.svg",
        avatar: "../assets/avatar2.svg",
        user: "Jenna Ortega",
        user_position: "Senior Accountant",
        user_company: "Gojek",
        type: "design"
    },
    {
        id: 3,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik",
        photo: "../assets/item3.svg",
        avatar: "../assets/avatar3.svg",
        user: "Jenna Ortega",
        user_position: "Senior Accountant",
        user_company: "Gojek",
        type: "marketing"
    },
    {
        id: 4,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik",
        photo: "../assets/item4.svg",
        avatar: "../assets/avatar4.svg",
        user: "Jenna Ortega",
        user_position: "Senior Accountant",
        user_company: "Gojek",
        type: "design"
    },
    {
        id: 5,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik",
        photo: "../assets/item5.svg",
        avatar: "../assets/avatar5.svg",
        user: "Jenna Ortega",
        user_position: "Senior Accountant",
        user_company: "Gojek",
        type: "marketing"
    },
    {
        id: 6,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik",
        photo: "../assets/item6.svg",
        avatar: "../assets/avatar6.svg",
        user: "Jenna Ortega",
        user_position: "Senior Accountant",
        user_company: "Gojek",
        type: "self_development"
    },
    {
        id: 7,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik",
        photo: "../assets/item7.svg",
        avatar: "../assets/avata7.svg",
        user: "Jenna Ortega",
        user_position: "Senior Accountant",
        user_company: "Gojek",
        type: "business"
    },
    {
        id: 8,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik",
        photo: "../assets/item8.svg",
        avatar: "../assets/avatar8.svg",
        user: "Jenna Ortega",
        user_position: "Senior Accountant",
        user_company: "Gojek",
        type: "self_development"
    },
    {
        id: 9,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik",
        photo: "../assets/item9.svg",
        avatar: "../assets/avatar9.svg",
        user: "Jenna Ortega",
        user_position: "Senior Accountant",
        user_company: "Gojek",
        type: "business"
    },
];

const tabs = [
    {
        key:"",
        name:"Semua Kelas"
    },
    {
        key:"marketing",
        name:"Pemasaran"
    }, 
    {
        key:"design",
        name:"Desain"
    }, 
    {
        key:"self_development",
        name:"Pengembangan Diri"
    }, 
    {
        key:"business",
        name:"Bisnis"
    }
];

const order_statuses = [
    {
        key:"",
        name:"Semua Pesanan"
    },
    {
        key:"pending",
        name:"Menunggu"
    }, 
    {
        key:"success",
        name:"Berhasil"
    }, 
    {
        key:"cancelled",
        name:"Gagal"
    }
];

const courseSections = [
    {
      title: "Introduction to Course 1: Foundations of User Experience Design",
      lessons: [
        { title: "The basics of user experience design", duration: "12 Menit" },
        { title: "Jobs in the field of user experience", duration: "12 Menit" },
        { title: "The product development life cycle", duration: "12 Menit" },
      ],
    },
    {
      title: "Universal design, inclusive design, and equity-focused design",
      lessons: [],
    },
    {
      title: "Introduction to design sprints",
      lessons: [],
    },
    {
      title: "Introduction to UX research",
      lessons: [],
    },
  ];

  const facilities = [
    {
        key:"final_test",
        img:"check.svg",
        name:"Ujian Akhir"
    },
    {
        key:"total_video",
        img:"video.svg",
        name:"Video"
    },
    {
        key:"total_document",
        img:"document.svg",
        name:"Dokumen"
    },
    {
        key:"certificate",
        img:"certificate.svg",
        name:"Sertifikat"
    },
    {
        key:"pretest",
        img:"pretest.svg",
        name:"Pretest"
    }
];

const paymentMethods = {
    "Transfer Bank": [
        { name: "Bank BCA", key: "bca", number:"11739 081234567890", icon: "../assets/bca.svg" },
        { name: "Bank BNI", key: "bni", number:"11739 081234567890", icon: "../assets/bni.svg" },
        { name: "Bank BRI", key: "bri", number:"11739 081234567890", icon: "../assets/bri.svg" },
        { name: "Bank Mandiri", key: "mandiri", number:"11739 081234567890", icon: "../assets/mandiri.svg" },
    ],
    "E-Wallet": [
        { name: "Dana", key: "dana", number:"", icon: "../assets/dana.svg" },
        { name: "OVO", key: "ovo", number:"", icon: "../assets/ovo.svg" },
        { name: "LinkAja", key: "linkaja", number:"", icon: "../assets/linkaja.svg" },
        { name: "Shopee Pay", key: "shopee", number:"", icon: "../assets/shopee.svg" },
    ],
    "Kartu Kredit/Debit": [
        { name: "", key: "credit", number:"", icon: "/assets/credit.svg" },
    ]
};

const sidebarMenus = [
    {
        name:"Profil Saya",
        url:"/profile",
        icon:"../assets/profile.svg",
        activeIcon:"../assets/profile_active.svg"
    },
    {
        name:"Kelas Saya",
        url:"/classes",
        icon:"../assets/class.svg",
        activeIcon:"../assets/class_active.svg"
    }, 
    {
        name:"Pesanan Saya",
        url:"/orders",
        icon:"../assets/orders.svg",
        activeIcon:"../assets/orders_active.svg"
    },
];

const orders = [
    {
        id:1,
        no:"HEL/VI/10062023",
        paid_at:"2025-04-10 20:00:00",
        status:"success",
        class_id:1,
        price:300000,
        title:"Big 4 Auditor Financial Analyst",
        img:"../assets/item1.svg",
        payment_method:"bca"
    },
    {
        id:2,
        no:"HEL/VI/10062023",
        paid_at:"2025-04-10 20:00:00",
        status:"cancelled",
        class_id:1,
        price:400000,
        title:"Big 4 Auditor Financial Analyst",
        img:"../assets/item2.svg",
        payment_method:"bca"
    }
];

const howToPay = {
    "Transfer Bank": "Bayar dengan transfer bank",
    "E-Wallet": "Bayar dengan e-wallet",
    "Kartu Kredit/Debit": "Bayar dengan kartu kredit/debit",
};

const classGroups = [
    {
        key:"",
        name:"Semua Kelas"
    },    {
        key:"0",
        name:"Sedang Berjalan"
    },
    {
        key:"1",
        name:"Selesai"
    }
];

const myClasses = [
    {
        id: 1,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik",
        photo: "../assets/item1.svg",
        avatar: "../assets/avatar1.svg",
        user: "Jenna Ortega",
        user_position: "Senior Accountant",
        user_company: "Gojek",
        type: "marketing",
        status: "in_progress",
        modul_progress: "12 / 12",
        total_modul: 12,
        total_time: 20,
        percentage_progress:100
    },
    {
        id: 2,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik",
        photo: "../assets/item2.svg",
        avatar: "../assets/avatar2.svg",
        user: "Jenna Ortega",
        user_position: "Senior Accountant",
        user_company: "Gojek",
        type: "design",
        status: "completed",
        modul_progress: "12 / 12",
        total_modul: 12,
        total_time: 20,
        percentage_progress:100
    },
    {
        id: 3,
        title: "Big 4 Auditor Financial Analyst",
        desc: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan  kurikulum terbaik",
        photo: "../assets/item3.svg",
        avatar: "../assets/avatar3.svg",
        user: "Jenna Ortega",
        user_position: "Senior Accountant",
        user_company: "Gojek",
        type: "marketing",
        status: "in_progress",
        modul_progress: "12 / 12",
        total_modul: 12,
        total_time: 20,
        percentage_progress:100
    }
];

const price_filters = [
    {
        id:0,
        name:"Dibawah Rp100.000"
    },
    {
        id:1,
        name:"Rp100.000 - Rp300.000"
    },
    {
        id:2,
        name:"Diatas Rp300.000"
    }
];

const duration_filters = [
    {
        id:0,
        name:"Kurang dari 4 Jam"
    },
    {
        id:1,
        name:"4 - 8 Jam"
    },
    {
        id:2,
        name:"Lebih dari 8 Jam"
    }
];

const ordering_filters = [
    {
        id:0,
        column:"price",
        type:"asc",
        name:"Harga Rendah"
    },
    {
        id:1,
        column:"price",
        type:"desc",
        name:"Harga Tinggi"
    },
    {
        id:2,
        column:"name",
        type:"asc",
        name:"A to Z"
    },
    {
        id:3,
        column:"name",
        type:"desc",
        name:"X to A"
    },
    {
        id:4,
        column:"rating",
        type:"asc",
        name:"Rating Tertinggi"
    },
    {
        id:5,
        column:"rating",
        type:"desc",
        name:"Rating Terendah"
    }
];

export const getDurationFilters = () => {
    return duration_filters;
}

export const getPriceFilters = () => {
    return price_filters;
}

export const getOrderingFilters = () => {
    return ordering_filters;
}

export const getItem = (params) => {
    if(params !== "all"){
        return items.filter(item => item.type === params);
    } else {
        return items;
    }
}

export const getTabs = () => {
    return tabs;
}

export const getToken = ($number=false) => {
    const chars = ($number) ? "0123456789" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 20; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export const getCourseSections = () => {
    return courseSections;
}

export const getFacilities = () => {
    return facilities;
}

export const getPaymentMethods = (key="") => {
    if(key == "") { return paymentMethods; }

    let found = null;
    for (const group in paymentMethods) {
        const method = paymentMethods[group].find(item => item.key === key);
        if (method) {
            found = method;
            break;
        }
    }
    return found;
}

export const getPaymentMethodGroup = (key) => {
    let found = null;
    for (const group in paymentMethods) {
        const method = paymentMethods[group].find(item => item.key === key);
        if (method) {
            found = group;
            break;
        }
    }
    return found;
}

export const getTransaction = () => {
    return JSON.parse(localStorage.getItem("transaction"));
}

export const getHowToPay = () => {
    return howToPay;
}

export const getOrderStatuses = () => {
    return order_statuses;
}

export const getSidebarMenus = () => {
    return sidebarMenus;
}

export const getOrders = (params="all") => {    
    if(params !== "all"){
        return orders.filter(item => item.status === params);
        
    } else {
        return orders;
    }
}

export const getOrder = (id) => {
    return orders.filter(item => item.id === id);
}

export const number_format = (number) => {
    return new Intl.NumberFormat('id-ID').format(number);
}

export const getClassGroups = () => {
    return classGroups;
}

export const getClassses = (params="all") => {
    if(params !== "all"){
        return myClasses.filter(item => item.status === params);
        
    } else {
        return myClasses;
    }
}

export const formatNumberToK = (num) => {
    const parsedNum = Number(num);
    if (parsedNum >= 1000) {
      return (parsedNum / 1000).toFixed(0) + 'K';
    }
    return parsedNum.toString();
  };

  export const ucfirst = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export const json_to_array = (json) => {
    const answerArray = Object.entries(json).map(([key, value]) => ({
        key,
        value
      }));
    return answerArray;
}