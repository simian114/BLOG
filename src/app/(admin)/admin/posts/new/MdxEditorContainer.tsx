"use client"
import dynamic from "next/dynamic"
import { useState } from "react"
import { Tag } from "@prisma/client"

import Button from "@/components/button/Button"

import { AddPostDialog } from "./add-post-dialog.client"
import { CateogoryWithRoute } from "./page"

import "@mdxeditor/editor/style.css"

const MDXEditor = dynamic(
  () => import("@mdxeditor/editor").then(mod => mod.MDXEditor),
  { ssr: false, loading: () => <div> client loading</div> }
)

interface MdxEditorContainerProps {
  categories: CateogoryWithRoute[]
  tags: Tag[]
}

export default function MdxEditorContainer(props: MdxEditorContainerProps) {
  const [markdown, setMarkdown] = useState("# hello world!")
  console.log(markdown)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row-reverse gap-4">
        <AddPostDialog
          content={markdown}
          allCategories={props.categories}
          allTags={props.tags}
        />
        <Button design={{ type: "secondary" }} className="self-end">
          임시 저장
        </Button>
      </div>

      <div className="border border-solid rounded h-full">
        <MDXEditor
          markdown={markdown}
          onChange={setMarkdown}
          contentEditableClassName="mdx"
        />
      </div>
    </div>
  )
}
