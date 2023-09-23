import { NextRequest } from "next/server"

import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET(
  request: NextRequest,
  { params }: { params: { "route-url": "string" } }
) {
  const routeURL = params["route-url"]
  const route = await prisma.route.findFirst({
    where: { url: routeURL },
    include: {
      components: true,
      categories: {
        include: {
          posts: {
            include: {
              category: true,
              route: true,
              tags: { include: { tag: true } },
            },
          },
        },
      },
    },
  })
  return new Response(JSON.stringify(route))
}
