import { BLOG_PATH } from "@/constants/path"
import { getInfoByCurrentPath } from "@/lib/server/post.server"
import { MdxContent } from "../mdx-content"

export default async function Blog() {
  const { serialized } = await getInfoByCurrentPath(BLOG_PATH)
  return <main>{serialized && <MdxContent source={serialized} />}</main>
}
