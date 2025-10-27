import * as yup from 'yup';
import { useCallback, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterApi } from '@/actions/auth';
import { useGlobal } from '@/contexts/global.context';
import { HttpStatus } from '@/libs/constants/httpStatus.const';
import Notification from '@/components/ui/notification/Notification';
import type { Register } from '@/types/auth.types';

const registerSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  name: yup.string().required('Name is required'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(/^(62|08)\d+$/, 'Phone must start with 62 or 08'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const useRegister = () => {
  const { onOpenModalFeedback } = useGlobal();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<Register>({
    resolver: yupResolver(registerSchema),
  });

  const onShow = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmit: SubmitHandler<Register> = async (data) => {
    const request = {
      email: data.email,
      name: data.name,
      phone: data.phone,
      password: data.password,
    };

    const response = await RegisterApi(request);

    if (response.status >= HttpStatus.BAD_REQUEST) {
      onOpenModalFeedback({
        type: 'error',
        message: response.message,
      });
      return;
    }

    Notification({
      message: 'Success',
      description: 'Successfully registered to marketplace',
    });
  };

  return {
    form,
    showPassword,
    onShow,
    onSubmit,
  };
};

export default useRegister;
