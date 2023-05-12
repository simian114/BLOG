"use client"
import useSWR from "swr"
import { ReactElement } from "react"
import { EyeOpenIcon } from "@radix-ui/react-icons"

const fetcher = (slugs: string) =>
  fetch(`${process.env.NEXT_PUBLIC_KV_REST_API_URL}/incr`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_KV_REST_API_TOKEN}`,
    },
    body: `${process.env.NODE_ENV}/${slugs}`,
    method: "POST",
  })
    .then(res => res.json())
    .then(data => data.result)

interface UsePostViewCountProps {
  slug: string[]
}

function usePostViewCounter(props: UsePostViewCountProps) {
  return useSWR(`${props.slug.join("/")}`, () => fetcher(props.slug.join("/")))
}

interface ViewCounterProps {
  slug: string[]
}

export default function ViewCounter(props: ViewCounterProps): ReactElement {
  const { data, isLoading } = usePostViewCounter({ slug: props.slug })

  return (
    <div className={`detail-main__view-count `}>
      <EyeOpenIcon />

      <span className={`${isLoading ? "skeleton skeleton-text" : ""}`}>
        {!isLoading && (data || 0)}
      </span>
    </div>
  )
}
