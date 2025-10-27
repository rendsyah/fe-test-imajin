'use client';

import type React from 'react';
import type { Device, Nullable } from '@/types/commons.types';
import { useCallback, useState } from 'react';
import { UAParser } from 'ua-parser-js';
import { createSafeContext } from '@/libs/utils/createSafeContext';
import Notification from '@/components/ui/notification/Notification';

export type KeyModal = 'create' | 'filter' | 'detail' | null;

export type Modal = {
  id?: string | number;
  type: KeyModal;
};

export type ModalFeedback = {
  open: boolean;
  type: 'success' | 'error';
  message: string;
  traceId?: string;
};

type GlobalContextProps = Nullable<{
  modal: Modal;
  modalFeedback: ModalFeedback;
  device: Device;
  onOpenModal: (data: Modal) => void;
  onCloseModal: () => void;
  onOpenModalFeedback: (data: Omit<ModalFeedback, 'open'>) => void;
  onCloseModalFeedback: () => void;
  onCopyClipboard: (data: string) => void;
}>;

const [GlobalContext, useGlobal] = createSafeContext<GlobalContextProps>('Global');

const GlobalProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [modal, setModal] = useState<Modal>({
    type: null,
    id: 0,
  });

  const [modalFeedback, setModalFeedback] = useState<ModalFeedback>({
    open: false,
    type: 'success',
    message: '',
    traceId: '',
  });

  const [device] = useState<Device>(() => {
    const parser = new UAParser();
    const result = parser.getResult();

    return {
      browserName: result.browser.name || 'Unknown Browser',
      browserVersion: result.browser.version || '',
      osName: result.os.name || 'Unknown OS',
      osVersion: result.os.version || '',
      deviceType: result.device.type || 'desktop',
      deviceVendor: result.device.vendor || '',
      deviceModel: result.device.model || '',
      userAgent: result.ua,
    };
  });

  const onOpenModal = useCallback((data: Modal) => {
    setModal(data);
  }, []);

  const onCloseModal = useCallback(() => {
    setModal({
      id: 0,
      type: null,
    });
  }, []);

  const onOpenModalFeedback = useCallback((data: Omit<ModalFeedback, 'open'>) => {
    setModalFeedback({ ...data, open: true });
  }, []);

  const onCloseModalFeedback = useCallback(() => {
    setModalFeedback((prev) => ({ ...prev, open: false }));
  }, []);

  const onCopyClipboard = useCallback((data: string) => {
    navigator.clipboard.writeText(data);
    Notification({
      message: 'Copied to clipboard',
      position: 'bottom-right',
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        modal,
        modalFeedback,
        device,
        onOpenModal,
        onCloseModal,
        onOpenModalFeedback,
        onCloseModalFeedback,
        onCopyClipboard,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { useGlobal, GlobalProvider };
