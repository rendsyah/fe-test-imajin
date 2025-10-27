import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginApi } from '@/actions/auth';
import { useGlobal } from '@/contexts/global.context';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import type { Login } from '@/types/auth.types';

const loginSchema = yup.object({
  user: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const useLogin = () => {
  const { device, onOpenModalFeedback } = useGlobal();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<Login>({
    resolver: yupResolver(loginSchema),
  });

  const onShow = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmit: SubmitHandler<Login> = async (data) => {
    const request = {
      user: data.user,
      password: data.password,
      device: {
        firebase_id: '',
        device_browser: device.browserName,
        device_browser_version: device.browserVersion,
        device_imei: '',
        device_model: device.deviceModel,
        device_type: device.deviceType,
        device_vendor: device.deviceVendor,
        device_os: device.osName,
        device_os_version: device.osVersion,
        device_platform: 'Web' as const,
        user_agent: device.userAgent,
        app_version: '1.0.0',
      },
    };

    const response = await LoginApi(request);

    if (response.status >= HttpStatus.BAD_REQUEST) {
      onOpenModalFeedback({
        type: 'error',
        message: response.message,
      });
      return;
    }
  };

  return {
    form,
    showPassword,
    onShow,
    onSubmit,
  };
};

export default useLogin;
