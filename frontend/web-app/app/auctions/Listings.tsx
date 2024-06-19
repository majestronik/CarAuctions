'use client'

import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';
import { useParamsStore } from '../hooks/useParamsStore';
import { shallow } from 'zustand/shallow';
import qs from 'query-string';
import EmptyFilter from '../components/EmptyFilter';
import { useAuctionStore } from '../hooks/useAuctionStore';

export default function Listings() {
  const [loading, setLoading] = useState(true);
  const params = useParamsStore(state => ({
    pageNumber: state.pageNumber,
    pageSize: state.pageSize,
    searchTerm: state.searchTerm,
    orderBy: state.orderBy,
    filterBy: state.filterBy,
    seller: state.seller,
    winner: state.winner
  }), shallow)

  const data = useAuctionStore(state => ({
    auctions: state.auctions,
    totalCount: state.totalCount,
    pageCount: state.pageCount
  }), shallow)

  const setData = useAuctionStore(state => state.setData);

  const setParams = useParamsStore(state => state.setParams);
  const url = qs.stringifyUrl({ url: '', query: params })

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber })
  }
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(url);
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, [url, setData]);


  if (loading) return <div> <h3>Loading...</h3></div>

  return (
    <>
      <Filters />
      {data.totalCount === 0 ?
        (<EmptyFilter showReset />) : (<> <div className='grid grid-cols-4 gap-6'>
          {data.auctions.map(auction => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
          <div className='flex justify-center mt-4'>
            <AppPagination pageChanged={setPageNumber} currentPage={params.pageNumber} pageCount={data.pageCount} />
          </div> </>)}

    </>
  );
}
