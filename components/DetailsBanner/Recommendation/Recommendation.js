import Carousel from "@/components/Carosuel/Carousel";
import { fetchFromUrl } from "@/utils/constants";
import { useQuery } from "react-query";

const Recommendation = ({ mediaType, id }) => {
  const {
    data,
    error,
    isLoading: loading,
  } = useQuery(`/${mediaType}/${id}/recommendations`, () =>
    fetchFromUrl(`/${mediaType}/${id}/recommendations`)
  );

  return (
    <Carousel
      title="Recommendations"
      data={data?.results}
      loading={loading}
      endpoint={mediaType}
    />
  );
};

export default Recommendation;
