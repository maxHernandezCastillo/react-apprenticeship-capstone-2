import useAxios from "@hooks/useAxios";

import parseDate from '@utils/parseDate';

function useGetPicturesOfMonth(date) {
  let lowerLimit = new Date(1995, 5, 16);
  let upperLimit = new Date();
  let selected = new Date(date);
  let firstDay = new Date(selected.getFullYear(), selected.getMonth(), 1);
  let lastDay = new Date(selected.getFullYear(), selected.getMonth() + 1, 0);

  if (firstDay > upperLimit) {
    firstDay = new Date(upperLimit.getFullYear(), upperLimit.getMonth(), 1);
  } else if (firstDay < lowerLimit) {
    firstDay = lowerLimit;
  }

  if (lastDay > upperLimit) {
    lastDay = upperLimit;
  } else if (lastDay < lowerLimit) {
    lastDay = lowerLimit;
  }

  return useAxios({
    method: 'get',
    params: {
      api_key: 'xMFt22A9Jl7xcwVUYFY7wNqne4K6kJaIEpaiU0T9',
      thumbs: 'true',
      start_date: parseDate(firstDay),
      end_date: parseDate(lastDay)
    }
  }, [date]);
};

export default useGetPicturesOfMonth;