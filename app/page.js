"use client";
import { ApiKey, BaseUrl } from "@/utils/constants";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { getApiConfiguration } from "./store/homeSlice";
import HeroBanner from "@/components/HeroBanner/HeroBanner";
import Navbar from "@/components/Header/Navbar";
import Footer from "@/components/Footer/Footer";
import Trending from "@/components/Trending/Trending";

const fetchFromUrl = async () => {
  const response = await fetch(`${BaseUrl}/configuration`, {
    headers: {
      Authorization: "bearer " + ApiKey,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
export default function Home() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useQuery("config", fetchFromUrl);

  useEffect(() => {
    console.log("component mount");
  }, []);

  useEffect(() => {
    console.log("dispatching");
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
      <Trending />
      <Footer />
    </>
  );
}
