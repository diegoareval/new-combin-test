import { FC, Fragment, ReactElement } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { List, SignOut, UserCircle } from "phosphor-react";
import LocalStorageAuth from "../helpers/localStorageAuth";
import useLogin from "../hooks/useLogin";

type TestProps = {
  children?: ReactElement;
};

const LayoutMain: FC<TestProps> = ({ children }) => {
  const { userAuth } = useLogin();

  const handlerDestroySession = () => {
    LocalStorageAuth.destroySession();
  };

  const getFirstLetter = () => {
    try {
      return userAuth?.userName[0].toUpperCase();
    } catch (error) {
      return "";
    }
  };

  return (
    <div className="min-h-full">
      <Disclosure
        as="nav"
        className="border-b border-gray-200 bg-white sticky top-0"
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />

                    <div className="mx-3 text-lg font-medium">
                      Test Frontend
                    </div>
                  </div>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none ring-2 ring-indigo-500 ring-offset-1">
                        <UserCircle size={30} className="text-indigo-500" />
                        <div className="h-8 px-5 flex items-center justify-center uppercase font-medium">
                          {userAuth?.userName}
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 py-3 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          <Link to="/login" onClick={handlerDestroySession}>
                            <div className="flex items-center py-1 mx-4 gap-2">
                              <SignOut weight="bold" />
                              Logout
                            </div>
                          </Link>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500  ">
                    {open ? (
                      <List
                        size={32}
                        weight="duotone"
                        className="text-indigo-600"
                      />
                    ) : (
                      <List size={32} weight="duotone" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none ring-2 ring-indigo-500 ring-offset-1">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center">
                      {getFirstLetter()}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {userAuth?.userName || ""}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link
                    to="/login"
                    className="p-4"
                    onClick={handlerDestroySession}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className="py-10 mb-16">
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </main>
        <footer className="fixed bottom-0 right-0 left-0 h-16 bg-indigo-500 flex items-center text-white justify-between px-4 sm:px-6 lg:px-8">
          <div>Copyright &copy;</div>
          <div>All rights reserved &copy;</div>
        </footer>
      </div>
    </div>
  );
};

export default LayoutMain;
