export const formatDate = (
  date: Date,
  locales?: Intl.LocalesArgument,
  option?: {}
) => {
  const defaultOption = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const localeDate = new Date(date).toLocaleDateString(
    locales || 'en-US',
    option || defaultOption
  );

  return localeDate;
};

export const getRelativeTime = (date: Date) => {
  const now = new Date().getTime();
  const postDate = new Date(date).getTime();
  const diff = now - postDate;

  if (diff < 60 * 1000) {
    return 'Just now';
  } else if (diff < 60 * 60 * 1000) {
    const minutes = Math.floor(diff / (60 * 1000));
    return `${minutes}m`;
  } else if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000));
    return `${hours}h`;
  } else {
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    return `${days}d`;
  }
};

// const RelativeTime = (date: Date) => {
//   const [relativeTime, setRelativeTime] = useState('');

//   useEffect(() => {
//     setRelativeTime(getRelativeTime(date))
//   }, [date]);

//   function getRelativeTime(date: Date) {
//     const now = new Date().getTime();
//     const postDate = new Date(date).getTime();
//     const diff = now - postDate;

//     if (diff < 60 * 1000) {
//       return 'Just now';
//     } else if (diff < 60 * 60 * 1000) {
//       const minutes = Math.floor(diff / (60 * 1000));
//       return `${minutes}m`;
//     } else if (diff < 24 * 60 * 60 * 1000) {
//       const hours = Math.floor(diff / (60 * 60 * 1000));
//       return `${hours}h`;
//     } else {
//       const days = Math.floor(diff / (24 * 60 * 60 * 1000));
//       return `${days}d`;
//     }
//   }

//   return relativeTime;
// };
