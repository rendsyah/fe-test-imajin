'use client';

import type React from 'react';
import Image from 'next/image';
import { useGlobal } from '@/contexts/global.context';
import { useLockBody } from '@/hooks/useLockBody';
import { ErrorImage, SuccessImage } from '@/libs/constants/assets.const';
import Button from '../button/ButtonPrimary';
import XMarkIcon from '../../icons/XMark';

const preset = {
  success: {
    title: 'Success!',
    icon: SuccessImage,
  },
  error: {
    title: 'Oops!',
    icon: ErrorImage,
  },
};

const ModalFeedback: React.FC = () => {
  const { modalFeedback, onCloseModalFeedback } = useGlobal();

  useLockBody(!!modalFeedback.open);

  if (!modalFeedback.open) return null;

  const config = preset[modalFeedback.type] || preset.success;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onCloseModalFeedback} />
      {/* MODAL */}
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-xs sm:max-w-sm px-6 py-8 rounded-2xl bg-white"
      >
        {/* BODY */}
        <div className="flex flex-col items-center space-y-8">
          <Image src={config.icon} alt="Icon" />
          <div className="space-y-2">
            <h2 className={`text-2xl text-center font-semibold`}>{config.title}</h2>
            {modalFeedback.message && (
              <p className="text-sm text-center">{modalFeedback.message}</p>
            )}
          </div>
          <Button onClick={onCloseModalFeedback}>Close</Button>
        </div>
        {/* CLOSE */}
        <button onClick={onCloseModalFeedback} className="absolute top-3 right-3">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ModalFeedback;
