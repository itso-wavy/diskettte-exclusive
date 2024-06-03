// import { PropsWithChildren, useState } from 'react';
// import { useSelector } from 'react-redux';

// import { Form } from '.';
// import {
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog';

// import { cn } from '@/lib/utils';
// import { RootState } from '@/lib/store';

// const DialogFormLayout = ({
//   title,
//   // buttonText,
//   handleSubmit,
//   // disabled,
//   children,
// }: PropsWithChildren<{
//   title: string;
//   handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
// }>) => {
//   const { theme, isDarkmode } = useSelector((state: RootState) => state.theme);

//   return (
//     <DialogContent
//       className={cn(
//         `theme-${theme}`,
//         'w-[350px] min-w-[300px] max-w-[90vw] text-primary',
//         isDarkmode && 'dark'
//       )}
//     >
//       <DialogHeader>
//         <DialogTitle className='my-3 text-center text-xl font-bold first-letter:uppercase'>
//           {title}
//         </DialogTitle>
//       </DialogHeader>
//       <Form.Layout handleSubmit={handleSubmit}>
//         {/* text-sm mb-5 overflow-y-auto */}
//         {children}
//       </Form.Layout>
//     </DialogContent>
//   );
// };

// export default DialogFormLayout;
