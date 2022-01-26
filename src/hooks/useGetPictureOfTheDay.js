import useAxios from "@hooks/useAxios";

function useGetPictureOfTheDay(date) {
  const { response, loading } = useAxios({
    method: 'get',
    params: {
      api_key: 'xMFt22A9Jl7xcwVUYFY7wNqne4K6kJaIEpaiU0T9',
      date: date,
      thumbs: 'true'
    }
  }, [date]);

  return { response, loading };
};

export default useGetPictureOfTheDay;