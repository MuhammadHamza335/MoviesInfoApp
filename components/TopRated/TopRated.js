"use client";
import { useState } from "react";
import Carousel from "../Carosuel/Carousel";
import MemoizedSwitchButtons from "../ButtonsList/SwitchButtons";
import { useQuery } from "react-query";
import { fetchFromUrl } from "@/utils/constants";

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("movie");

  const { data, error, isLoading } = useQuery(`/${endpoint}/top_rated`, () =>
    fetchFromUrl(`/${endpoint}/top_rated`)
  );
  // const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <div className="wrapper">
        <span className="carouselTitle">Top Rated</span>
        <MemoizedSwitchButtons
          data={["Movies", "TV Shows"]}
          onTabChange={onTabChange}
        />
      </div>
      <Carousel data={data?.results} loading={isLoading} endpoint={endpoint} />
    </div>
  );
};

export default TopRated;
