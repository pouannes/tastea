import { Fragment } from 'react';

import { Transition, Dialog } from '@headlessui/react';

import CloseIcon from '@/public/close.svg';
import { IconButton } from '@/components/core';
import TeammelierContent from './TeammelierContent';

interface TeammelierProps {
  open: boolean;
  handleClose: () => void;
}

const Teammelier = ({ open, handleClose }: TeammelierProps): JSX.Element => {
  return (
    <Transition.Root as={Fragment} show={open}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden"
        open={open}
        onClose={handleClose}
      >
        <div className="absolute inset-0 w-screen h-screen overflow-hidden">
          {/* backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-20 w-screen h-screen overflow-hidden bg-opacity-95 bg-bgDefault filter backdrop-blur-lg" />
          </Transition.Child>

          {/* content */}
          <div className="relative inset-0 z-30 flex items-center justify-center w-full h-full text-textPrimary">
            <div className="absolute top-4 right-4">
              <IconButton
                onClick={handleClose}
                srName="Close panel"
                className="w-10 h-10"
              >
                <CloseIcon />
              </IconButton>
            </div>
            <TeammelierContent />
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Teammelier;
