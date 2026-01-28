import { toast, type ToastT } from "sonner";
import React from "react";
import {
  IoMdCheckmarkCircleOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { MdCancel, MdWarning } from "react-icons/md";
import { FiClipboard } from "react-icons/fi";
import { FaHourglassHalf } from "react-icons/fa6";


type ToastOptions = {
  description?: string;
  duration?: number;
  id?: string | number;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: (toast: ToastT) => void;
  onAutoClose?: (toast: ToastT) => void;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  style?: React.CSSProperties;
  className?: string;
  [key: string]: unknown;
};


type PromiseToastOptions<T> = {
  loading?: ToastOptions & { message?: string };
  success?: ToastOptions & { message?: string | ((data: T) => string) };
  error?: ToastOptions & { message?: string | ((error: Error | unknown) => string) };
};

type LoadingToastOptions = ToastOptions;
type SuccessToastOptions = ToastOptions;
type ErrorToastOptions = ToastOptions;


const mergeStyles = (
  baseStyle: React.CSSProperties,
  userStyle?: React.CSSProperties
) => {
  return { ...baseStyle, ...userStyle };
};

const mergeClassName = (baseClass: string, userClass?: string) => {
  return userClass ? `${baseClass} ${userClass}` : baseClass;
};


const PreviewIcon = () =>
  React.createElement(FiClipboard, { className: "w-5 h-5" });
const SuccessIcon = () =>
  React.createElement(IoMdCheckmarkCircleOutline, { className: "w-5 h-5" });
const ErrorIcon = () => React.createElement(MdCancel, { className: "w-5 h-5" });
const WarningIcon = () =>
  React.createElement(MdWarning, { className: "w-5 h-5" });
const InfoIcon = () =>
  React.createElement(IoMdInformationCircleOutline, { className: "w-5 h-5" });
const LoadingIcon = () =>
  React.createElement(FaHourglassHalf, { className: "w-5 h-5" });

export const themedToast = {
  preview: (message: string, options?: ToastOptions) => {
    const { description, style, className, icon, ...restOptions } =
      options || {};

    return toast(message, {
      description,
      icon: icon ?? PreviewIcon(),
      className: mergeClassName(
        "bg-primary/10 border-l-4 border-l-primary border-r-0 border-t-0 border-b-0 rounded-l-none text-primary",
        className
      ),
      style: mergeStyles(
        {
          background: "hsl(var(--primary) / 0.1)",
          borderLeft: "4px solid hsl(var(--primary))",
          borderRadius: "0.375rem 0.375rem 0.375rem 0",
          color: "hsl(var(--primary))",
        },
        style
      ),
      ...restOptions,
    });
  },

  success: (
    message: string,
    options?: SuccessToastOptions & { description?: string }
  ) => {
    const { description, style, className, icon, ...restOptions } =
      options || {};

    return toast.success(message, {
      description,
      icon: icon ?? SuccessIcon(),
      className: mergeClassName(
        "bg-green-50 border-l-4 border-l-green-500 border-r-0 border-t-0 border-b-0 rounded-l-none text-green-700",
        className
      ),
      style: mergeStyles(
        {
          background: "rgb(240 253 244)",
          borderLeft: "4px solid rgb(34 197 94)",
          borderRadius: "0.375rem 0.375rem 0.375rem 0",
          color: "rgb(21 128 61)",
        },
        style
      ),
      ...restOptions,
    });
  },

  error: (
    message: string,
    options?: ErrorToastOptions & { description?: string }
  ) => {
    const { description, style, className, icon, ...restOptions } =
      options || {};

    return toast.error(message, {
      description,
      icon: icon ?? ErrorIcon(),
      className: mergeClassName(
        "bg-red-50 border-l-4 border-l-red-500 border-r-0 border-t-0 border-b-0 rounded-l-none text-red-700",
        className
      ),
      style: mergeStyles(
        {
          background: "rgb(254 242 242)",
          borderLeft: "4px solid rgb(239 68 68)",
          borderRadius: "0.375rem 0.375rem 0.375rem 0",
          color: "rgb(185 28 28)",
        },
        style
      ),
      ...restOptions,
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    const { description, style, className, icon, ...restOptions } =
      options || {};

    return toast(message, {
      description,
      icon: icon ?? WarningIcon(),
      className: mergeClassName(
        "bg-yellow-50 border-l-4 border-l-yellow-500 border-r-0 border-t-0 border-b-0 rounded-l-none text-yellow-700",
        className
      ),
      style: mergeStyles(
        {
          background: "rgb(254 252 232)",
          borderLeft: "4px solid rgb(234 179 8)",
          borderRadius: "0.375rem 0.375rem 0.375rem 0",
          color: "rgb(161 98 7)",
        },
        style
      ),
      ...restOptions,
    });
  },

  info: (message: string, options?: ToastOptions) => {
    const { description, style, className, icon, ...restOptions } =
      options || {};

    return toast(message, {
      description,
      icon: icon ?? InfoIcon(),
      className: mergeClassName(
        "bg-blue-50 border-l-4 border-l-blue-500 border-r-0 border-t-0 border-b-0 rounded-l-none text-blue-700",
        className
      ),
      style: mergeStyles(
        {
          background: "rgb(239 246 255)",
          borderLeft: "4px solid rgb(59 130 246)",
          borderRadius: "0.375rem 0.375rem 0.375rem 0",
          color: "rgb(29 78 216)",
        },
        style
      ),
      ...restOptions,
    });
  },

  loading: (
    message: string,
    options?: LoadingToastOptions & { description?: string }
  ) => {
    const { description, style, className, icon, ...restOptions } =
      options || {};

    return toast.loading(message, {
      description,
      icon: icon ?? LoadingIcon(),
      className: mergeClassName(
        "bg-blue-50 border-l-4 border-l-blue-500 border-r-0 border-t-0 border-b-0 rounded-l-none text-blue-700",
        className
      ),
      style: mergeStyles(
        {
          background: "rgb(239 246 255)",
          borderLeft: "4px solid rgb(59 130 246)",
          borderRadius: "0.375rem 0.375rem 0.375rem 0",
          color: "rgb(29 78 216)",
        },
        style
      ),
      ...restOptions,
    });
  },


   promise: <T,>(
  promise: Promise<T>,
  messages: {
    loading: string;
    success: string | ((data: T) => string);
    error: string | ((error: Error | unknown) => string);
  },
    options?: PromiseToastOptions<T>
  ) => {
    return toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    });
  },

  dismiss: toast.dismiss,
  message: toast.message,
  custom: toast.custom,
};

export const popup = themedToast;


export const showPreviewToast = (message: string, options?: ToastOptions) => {
  return themedToast.preview(message, options);
};