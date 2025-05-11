import { useEffect, useRef, useState } from "react";
import Authlayout from "../Layouts/AuthLayout";
import { Card } from "../Elements/card";
import { H2 } from "../Elements/heading";
import { SidebarMenu } from "../Fragments/SidebarMenu";
import { ButtonPrimaryMDSubmit } from "../Elements/button";
import { FloatingInput, Select } from "../Elements/input";
import useUser from "../../hooks/useUser";
import Resizer from 'react-image-file-resizer';

const token = localStorage.getItem("token");
const auth = localStorage.getItem("user");
const ProfilePage = () => {
    const [file, setFile] = useState(null);
    const [base64photo, setBase64photo] = useState('');
    const { currentUser } = useUser(auth);
    const [name, setName] = useState("");
    const [no_hp, setNoHp] = useState("");
    const { update, status } = useUser();
    const selectPhotoRef = useRef();

    useEffect(() => {
        if(token === null) {
            window.location.href = "/login";
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setNoHp(currentUser.no_hp);
        }
    }, [currentUser]);

    const HandlePaid = (e) => {
        e.preventDefault();
        update(auth,{ name, no_hp });
    };

    useEffect(() => {
        if (status) {
            window.location.reload();   
        }
    },[status])
   
    const selectPhoto = () => {
        selectPhotoRef.current.click();
      }
  
      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      };
  
      useEffect(() => {
        if (file != null) {
            ResizePhoto(file)   
        }
      },[file])
  
      const ResizePhoto = (file) => {
        new Promise(() => {
            Resizer.imageFileResizer(
              file,
              300,
              300,
              'JPEG',
              100,
              0,
              (uri) => {
                setBase64photo(uri);
              },
              'base64',
            );
        });
    };
  
    useEffect(() => {
      if (base64photo != "") {
          UpdatePhotoDB();
      }
  },[base64photo]); 
  
    const UpdatePhotoDB = async () => {
        update(auth,{ photo:base64photo });
    }
 return (
    <Authlayout title="Home" navType="home" withFooter={true}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 ...">
                <div className="col-span-3 ...">
                    <H2>Ubah Profile</H2>
                    <p className="text-sm text-gray-400">Ubah data diri anda</p>
                    <SidebarMenu activeMenu="/profile" />
                </div>
                <div className="col-span-9 ... mx-2 sm:mx-0">
                    <Card>
                        <div className="grid grid-cols-12 ... gap-3">
                            <div className="col-span-3 md:col-span-2 ...">
                            {currentUser?.photo != null ? (
                                <img
                                className="object-cover h-auto rounded-lg"
                                src={currentUser?.photo} 
                                alt="" />
                            ) : (
                                <img
                                className="object-cover h-auto rounded-lg"
                                src="https://github.com/shadcn.png" 
                                alt="" />
                            )}
                            </div>
                            <input type="file" 
                          ref={selectPhotoRef} 
                          className="hidden"
                          onChange={handleFileChange}  
                          name="" id="" />
                            <div className="col-span-9 md:col-span-10 ...">
                                <div className="text-sm">
                                    <H2>{currentUser?.name}</H2>
                                    <p>{currentUser?.email}</p>
                                </div>
                                <button onClick={() => selectPhoto()} className="mt-3 text-red-600 text-sm cursor-pointer">Ganti Foto Profil</button>
                            </div>
                        </div>
                        <hr className="mt-6 text-slate-200" />
                        <div className="grid grid-cols-4 md:grid-cols-9 mt-6 gap-3">
                            <FloatingInput
                                label="Nama Lengkap"
                                value={name}
                                name="nama"
                                onChange={e => setName(e.target.value)}
                                className="col-span-4 md:col-span-3"
                            />

                            <FloatingInput
                                label="E-Mail"
                                value={currentUser?.email}
                                name="email"
                                className="col-span-4 md:col-span-3"
                            />

                            <Select className="col-span-1 md:col-span-1">
                                <option value="">+62</option>
                            </Select>
                            <FloatingInput
                                label="No. Hp"
                                value={no_hp}
                                name="hp"
                                onChange={e => setNoHp(e.target.value)}
                                className="col-span-3 md:col-span-2"
                                type="number"
                            />
                        </div>
                        <div className="mt-4 flex justify-end">
                            <ButtonPrimaryMDSubmit onClick={HandlePaid}>Simpan</ButtonPrimaryMDSubmit>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    </Authlayout>
 );
}

export default ProfilePage