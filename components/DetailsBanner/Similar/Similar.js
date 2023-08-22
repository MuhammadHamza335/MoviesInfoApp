import Carousel from "@/components/Carosuel/Carousel";
import { fetchFromUrl } from "@/utils/constants";
import { useQuery } from "react-query";

const Similar = ({ mediaType, id }) => {
  const {
    data,
    error,
    isLoading: loading,
  } = useQuery(`/${mediaType}/${id}/similar`, () =>
    fetchFromUrl(`/${mediaType}/${id}/similar`)
  );
  // const { data, loading, error } = useQuery(`/${mediaType}/${id}/similar`);
  //   console.log(data);
  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      title={title}
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Similar;
