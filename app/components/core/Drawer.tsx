import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';

export interface DrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const Drawer: React.FC<DrawerProps> = ({ open, setOpen, children }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden"
        open={open}
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300 sm:duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300 sm:duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <div className="flex flex-col h-full overflow-y-auto shadow-xl bg-bgDefault">
                  <div className="px-4 py-6 sm:px-6 bg-bgPaper">
                    <Dialog.Title className="text-lg font-medium text-textPrimary ">
                      Add a new tea
                    </Dialog.Title>
                  </div>
                  <div className="relative flex-1 px-4 mt-6 sm:px-6">
                    {children}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
