'use client'

import { Bid } from '@/types';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { User } from 'next-auth';
import { ReactNode, useEffect, useState } from 'react'
import { useAuctionStore } from '../hooks/useAuctionStore';
import { useBidStore } from '../hooks/useBidStore';

type Props = {
  children: ReactNode
}

export default function SignalRProvider({ children }: Props) {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);
  const addBid = useBidStore(state => state.addBid);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(process.env.NEXT_PUBLIC_NOTIFY_URL!)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('Connected to notification hub');

          connection.on('BidPlaced', (bid: Bid) => {
            console.log('Bid placed event received')
            if (bid.bidStatus.includes('Accepted')) {
              setCurrentPrice(bid.auctionId, bid.amount);
            }
          })
        })
        .catch(error => {
          console.log(error);
        })
    }
    return () => {
      connection?.stop();
    }
  }, [connection, setCurrentPrice])
  return (
    children
  )
}