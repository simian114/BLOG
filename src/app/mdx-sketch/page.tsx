import { getPostBySlugs } from "@/helpers/slug"
import { MdxContent } from "../mdx-content"

export default async function MdxStyle() {
  const post = await getPostBySlugs("/mdx-sketch")

  return (
    <main>{post.serialized && <MdxContent source={post.serialized} />}</main>
  )
}
