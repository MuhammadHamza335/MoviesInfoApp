"use client";
import DetailsBanner from "@/components/DetailsBanner/DetailsBanner";
import { ApiKey, BaseUrl } from "@/utils/constants";
import { useQuery } from "react-query";

export default function Page({ params }) {
  const fetchVideo = async () => {
    const response = await fetch(
      `${BaseUrl}/${params.category}/${params.id}/videos`,
      {
        headers: {
          Authorization: "bearer " + ApiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const fetchCredits = async () => {
    const response = await fetch(
      `${BaseUrl}/${params.category}/${params.id}/credits`,
      {
        headers: {
          Authorization: "bearer " + ApiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, error, isLoading } = useQuery(
    `/${params.category}/${params.id}/videos`,
    fetchVideo
  );

  const { data: credits, loading: creditsLoading } = useQuery(
    `/${params.category}/${params.id}/credits`,
    fetchCredits
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
        {/* <Cast data={credits?.cast} loading={creditsLoading} />
            <VideosSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} /> */}
      </div>
    </>
  );
}
