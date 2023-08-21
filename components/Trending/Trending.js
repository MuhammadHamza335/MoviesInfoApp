"use client";
import { useQuery } from "react-query";
import Carousel from "../Carosuel/Carousel";
import { ApiKey, BaseUrl } from "@/utils/constants";
import "./style.scss";
import { useCallback, useState } from "react";
import MemoizedSwitchButtons from "../ButtonsList/SwitchButtons";
const buttons = ["Day", "Week"];
const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const fetchTrending = async () => {
    const response = await fetch(`${BaseUrl}/trending/movie/${endpoint}`, {
      headers: {
        Authorization: "bearer " + ApiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const { data, error, isLoading } = useQuery(
    `/trending/movie/${endpoint}`,
    fetchTrending
  );

  const onTabChange = useCallback((tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  }, []);

  return (
    <>
      <div className="carouselSection">
        <div className="wrapper">
          <span className="carouselTitle">Trending</span>
          <MemoizedSwitchButtons data={buttons} onTabChange={onTabChange} />
        </div>
        <Carousel data={data?.results} loading={isLoading} />
      </div>
      )
    </>
  );
};

export default Trending;
