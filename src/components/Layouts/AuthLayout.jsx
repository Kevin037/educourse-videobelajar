import { Button, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from "../Fragments/Footer";
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const user_photo = localStorage.getItem("user_photo");
const Authlayout = (props) => {
    const {children, navType, withFooter, varianHead, style, customHead="", mainLayout=false, customLogo="", userPhoto=true} = props
    const {logOut, status} = useAuth();
    const handleLogout = () => {
      logOut();
    }

    useEffect(() => {
      if (status) {
        window.location.href = "/login";
      }
    }, [status]);
    
    return (
        <>
        <Disclosure as="nav" className="bg-white-800">
        <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${varianHead}`}>
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              {navType != "auth" &&
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>}
            </div>
            <div className="flex flex-1 items-center sm:items-stretch">
              <div className="flex shrink-0 items-center">
                {customLogo != "" ? (
                  <div>
                    {customLogo}
                  </div>
                ) : (
                <div>
                <Link to="/">
                <img
                  alt="Your Company"
                  src="../assets/logo.svg"
                  className="h-8 w-auto"
                />
                </Link>
                </div>
                )}
              </div>
            </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {(navType != "auth" && customHead == "")  ?
            (
              <a
                  key="kategori"
                  href="/category"
                  aria-current={undefined}
                  className={classNames('hover:opacity-75',
                  'rounded-md px-3 py-2 text-sm font-medium hide-sm',
                  )}
              >
              Kategori
              </a>
            ) : (
              <div className='hidden md:block'>
                {customHead}
              </div>
            )}
                {/* Profile dropdown */}
                {userPhoto && (
                <Menu as="div" className="relative ml-3 hidden sm:block">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {user_photo != null ? (
                      <img
                        alt=""
                        src={user_photo}
                        className="size-8 rounded-full"
                      />
                      ) : (
                      <img
                        alt=""
                        src="https://github.com/shadcn.png"
                        className="size-8 rounded-full"
                      />
                      )}
                    </MenuButton>
                  </div>
                  <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <MenuItem>
                    <Button
                      onClick={() => {window.location.href = "/profile"}}
                      className="block px-4 py-2 w-full text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                    >
                      Profile
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => {window.location.href = "/classes"}}
                      className="block px-4 py-2 w-full text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                    >
                      Kelas Saya
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={() => {window.location.href = "/orders"}}
                      className="block px-4 py-2 w-full text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                    >
                      Pesanan Saya
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      onClick={handleLogout}
                      className="block px-4 py-2 w-full text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer"
                    >
                      Sign out
                    </Button>
                  </MenuItem>
                </MenuItems>
                </Menu>
              )}
              </div>
          </div>
        </div>
  
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
          <DisclosureButton
                key="kategori"
                as="a"
                href="/category"
                aria-current={undefined}
                className={classNames('hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                Kategori
              </DisclosureButton>
              <DisclosureButton
                key="logout"
                as="a"
                href="/login"
                aria-current={undefined}
                className={classNames('hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                Sign Out
              </DisclosureButton>
              {user_photo != null ? (
                      <img
                        alt=""
                        src={user_photo}
                        className="size-8 rounded-full mx-4"
                      />
                      ) : (
                      <img
                        alt=""
                        src="https://github.com/shadcn.png"
                        className="size-8 rounded-full mx-4"
                      />
                      )}
          </div>
        </DisclosurePanel>
      </Disclosure>
      {mainLayout == true ? (
        <div className="" style={style}>
        {children}
        </div>
      ) : (
        <div className="content" style={style}>
        {children}
        </div>
      )}
      {withFooter == true && <Footer />}
      </>
    )
}

export default Authlayout