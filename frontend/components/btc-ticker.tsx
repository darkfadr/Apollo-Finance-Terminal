"use client"

import { useState, useEffect } from "react"
import {
  ArrowDownIcon,
  ArrowDownRightIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  BitcoinIcon,
} from "lucide-react"
import { useSubscription } from "@apollo/client"
import { CRYPTO_SUBSCRIPTION } from "@/lib/graphql/queries"
import { Skeleton } from "./ui/skeleton"

type Ticker = "btc-usd" | "eth-usd" | "sol-usd" | "doge-usd"

const name = {
  "btc-usd": "Bitcoin",
  "eth-usd": "Ethereum",
  "sol-usd": "Solana",
  "doge-usd": "Dogecoin",
}

export const CryptoTickerSkeleton = () => {
  return (
    <div className="flex w-[270px] items-center gap-4 rounded-lg bg-background p-4 shadow-md">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="w-30 h-4" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  )
}

export function BitcoinTicker({ ticker = "btc-usd" }: { ticker: Ticker }) {
  const [change, setChange] = useState({})
  const [price, setPrice] = useState(0)
  const [pricePercentChg24H, setPricePercentChg24H] = useState(0)
  const { data, loading, error } = useSubscription(CRYPTO_SUBSCRIPTION)

  useEffect(() => {
    console.log("state", data?.coinbaseBTCUpdate?.events[0]?.tickers[0])
    if (
      data?.coinbaseBTCUpdate?.events[0]?.tickers[0].product_id.toLowerCase() ===
      ticker
    ) {
      setPrice(data?.coinbaseBTCUpdate?.events[0]?.tickers[0]?.price || 0)
      setPricePercentChg24H(
        data?.coinbaseBTCUpdate?.events[0]?.tickers[0]
          ?.price_percent_chg_24_h || 0
      )
    }
  }, [change, price, pricePercentChg24H, data])

  if (loading) return <CryptoTickerSkeleton />

  return (
    <div className="flex w-[300px] items-center gap-4 rounded-lg bg-background p-4 shadow-md">
      <div className="flex items-center rounded-full bg-yellow-500 p-2 ring-2 ring-primary" />
      {error ? (
        <p className="text-destructive">{error.message}</p>
      ) : (
        <div className="text-left">
          <p className="text-xs text-muted-foreground">
            {name[ticker]} · {ticker.toUpperCase().split("-")[0]}
          </p>
          <p className="text-2xl font-bold">
            ${price > 0 ? price?.toLocaleString() : "..."}
          </p>
          <div
            className={`flex items-center justify-start ${pricePercentChg24H >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            {pricePercentChg24H >= 0 ? (
              <ArrowUpRightIcon className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownRightIcon className="mr-1 h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {Math.abs(pricePercentChg24H).toFixed(2)}%
            </span>
          </div>
        </div>
      )}
    </div>
  )
}