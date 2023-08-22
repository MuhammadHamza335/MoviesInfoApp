"use client";
import Cast from "@/components/DetailsBanner/Caste/Caste";
import DetailsBanner from "@/components/DetailsBanner/DetailsBanner";
import Recommendation from "@/components/DetailsBanner/Recommendation/Recommendation";
import Similar from "@/components/DetailsBanner/Similar/Similar";
import VideosSection from "@/components/VideoSection/VideoSection";
import { fetchFromUrl } from "@/utils/constants";
import { useQuery } from "react-query";

export default function Page({ params }) {
  const { data, error, isLoading } = useQuery(
    `/${params.category}/${params.id}/videos`,
    () => fetchFromUrl(`/${params.category}/${params.id}/videos`)
  );

  const { data: credits, loading: creditsLoading } = useQuery(
    `/${params.category}/${params.id}/credits`,
    () => fetchFromUrl(`/${params.category}/${params.id}/credits`)
  );
  // const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);

  // const { data: credits, loading: creditsLoading } = useFetch(
  //     `/${mediaType}/${id}/credits`
  // );
  return (
    <>
      <div>
        <DetailsBanner
          video={data?.results?.[0]}
          crew={credits?.crew}
          mediaType={params.category}
          id={params.id}
        />
        <Cast data={credits?.cast} loading={creditsLoading} />
        <VideosSection data={data} loading={isLoading} />
        <Similar mediaType={params.category} id={params.id} />
        <Recommendation mediaType={params.category} id={params.id} />
      </div>
    </>
  );
}
