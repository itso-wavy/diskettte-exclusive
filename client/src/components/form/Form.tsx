import { PropsWithChildren, ReactNode, forwardRef } from 'react';
import { Form } from 'react-router-dom';

import { Button } from '.';

import { cn } from '@/lib/utils';

export const Layout = ({
  handleSubmit,
  className,
  children,
}: PropsWithChildren<{
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}>) => {
  return (
    <Form
      method='POST'
      onSubmit={handleSubmit}
      className={cn('flex flex-col justify-between', className)}
    >
      {children}
    </Form>
  );
};

interface InputProps {
  type?: string;
  label?: string;
  labelHidden?: boolean;
  placeholder?: string;
  error?: ReactNode;
  success?: string;
  className?: string;
}

type AllInputProps = InputProps &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  AllInputProps
>(
  (
    {
      type = 'text',
      label,
      labelHidden,
      placeholder,
      error,
      success,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className='mb-2 flex flex-col'>
        <label
          htmlFor={label}
          className={cn(
            'mb-0.5 ml-1 space-y-2 text-[13px]',
            labelHidden && 'sr-only'
          )}
        >
          {label}
        </label>
        {type === 'textarea' && (
          <textarea
            id={label}
            placeholder={placeholder}
            spellCheck='false'
            className={cn(
              'rounded-md border px-3 py-2 text-[14px] placeholder:text-sm focus:outline-none dark:bg-zinc-800',
              className
            )}
            ref={ref as React.RefObject<HTMLTextAreaElement>}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        )}
        {type !== 'textarea' && (
          <input
            id={label}
            type={type}
            placeholder={placeholder}
            spellCheck='false'
            autoComplete='off'
            className={cn(
              'rounded-md border px-3 py-2 text-[14px] placeholder:text-sm focus:outline-none dark:bg-zinc-800',
              className
            )}
            ref={ref as React.RefObject<HTMLInputElement>}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {error && <Feedback type='error'>{error}</Feedback>}
        <Feedback type='success'>{success}</Feedback>
      </div>
    );
  }
);

export const Feedback = ({
  type,
  className,
  children,
}: PropsWithChildren<{ type: 'success' | 'error'; className?: string }>) => {
  return (
    <p
      className={cn(
        type === 'error' ? 'text-red-500' : 'text-blue-500',
        'ml-1 mt-1 text-xs',
        className
      )}
    >
      {children}
    </p>
  );
};

export const SubmitButton: React.FC<{
  text: string;
  disabled?: boolean;
  className?: string;
}> = ({ text, disabled, className }) => {
  return (
    <Button type='submit' disabled={disabled} className={cn('mt-7', className)}>
      {text}
    </Button>
  );
};
