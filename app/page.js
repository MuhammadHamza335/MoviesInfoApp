"use client";
import { fetchFromUrl } from "@/utils/constants";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import Trending from "@/components/Trending/Trending";
import Popular from "@/components/Popular/Popular";
import TopRated from "@/components/TopRated/TopRated";

export default function Home() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery("config", () =>
    fetchFromUrl("/configuration")
  );

  useEffect(() => {
    if (data) {
      const url = {
        backdrop: data.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    }
  }, [data]);

  return (
    <>
      <Navbar />
      <HeroBanner />
      <Popular />
      <Trending />
      <TopRated />
      <Footer />
    </>
  );
}
