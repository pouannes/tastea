import { Fragment, MutableRefObject } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import CloseIcon from '@/public/close.svg';

export interface DrawerProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialFocus?: MutableRefObject<HTMLElement | null> | undefined;
  title: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  setOpen,
  title,
  initialFocus,
  children,
}) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={initialFocus}
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
            <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-800 bg-opacity-90" />
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
                  <div className="flex items-center justify-between px-4 py-6 sm:px-6 bg-bgPaper">
                    <Dialog.Title className="text-lg font-medium text-textPrimary ">
                      {title}
                    </Dialog.Title>
                    <button
                      className="transition duration-200 ease-in-out rounded-md text-textSecondary hover:text-accent hover:ring-accent hover:ring-2 hover:outline-none"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <CloseIcon className="w-6 h-6" />
                    </button>
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
