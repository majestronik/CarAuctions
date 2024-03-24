"use server";
import { Auction, PagedResult } from "@/types";
import { getTokenWorkAround } from "./authActions";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  const res = await fetch(`http://localhost:6001/search${query}`);
  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

export async function UpdateAuctionTest() {
  const auctionid = "6a5011a1-fe1f-47df-9a32-b5346b289391";
  const token = await getTokenWorkAround();
  const data = {
    mileage: Math.floor(Math.random() * 100000) + 1,
  };
  const res = await fetch(`http://localhost:6001/auctions/${auctionid}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token?.access_token,
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return { status: res.status, message: res.statusText };
}
