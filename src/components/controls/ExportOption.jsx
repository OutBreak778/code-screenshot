/* eslint-disable react/prop-types */
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import {
  DownloadIcon,
  ImageIcon,
  Link2Icon,
  Share2Icon,
} from "@radix-ui/react-icons";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { toBlob, toPng, toSvg } from "html-to-image";
import toast from "react-hot-toast";
import useStore from "@/store";

export default function ExportOption({ targetRef }) {

  const title = useStore(state => state.title)


  const copyImage = async () => {
    const loading = toast.loading("Copying...")

    try {
      const imgBlob = await toBlob(targetRef.current, {
        pixelRatio: 2,
      })
      const img = new ClipboardItem({ "image/png": imgBlob })
      navigator.clipboard.write([img])

      toast.remove(loading)
      toast.success("Image copied to clipboard!")
    } catch (error) {
      toast.remove(loading)
      toast.error("Something went wrong!")
    }
  }

  const copyLink = () => {
    const state = useStore.getState()
    const queryParams = new URLSearchParams({
      ...state,
      code: btoa(state.code)
    }).toString()
    navigator.clipboard.writeText(`${location.href}?${queryParams}`)
  }

  const saveImage = async (name, format) => {
    let imgUrl, filename
    switch (format) {
      case "PNG":
          imgUrl = await toPng(targetRef.current, {pixelRatio: 2})
          // eslint-disable-next-line no-unused-labels
          filename: `${name}.png`
          // This above line is to automatically save the file into .png
        break;
      case "SVG":
          imgUrl = await toSvg(targetRef.current, {pixelRatio: 2})
          // eslint-disable-next-line no-unused-labels
          filename: `${name}.svg`
          // This above line is to automatically save the file into .svg
        break;
      default:
        return;
    }
    
    const a = document.createElement("a")
    a.href = imgUrl;
    a.download = filename
    a.click()
  
  }

  return (
    <div className="mt-3">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Share2Icon className="mr-3" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark">
        <DropdownMenuItem
          className="gap-3"
          onClick={copyImage}
        >
          <ImageIcon />
          Copy Image
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-3" onClick={() => {
          copyLink()
          toast.success("Linked is Copied")
        }}>
          <Link2Icon />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-3" onClick={() => toast.promise(saveImage(title, "PNG"), {
          loading: "Saving the PNG...",
          success: "Image saved as PNG",
          error: "Something went wrong!"
        })}>
          <DownloadIcon />
          Save as PNG
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-3" onClick={() => toast.promise(saveImage(title, "SVG"), {
          loading: "Saving the SVG...",
          success: "Image saved as SVG",
          error: "Something went wrong!"
        })}>
          <DownloadIcon />
          Save as SVG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}


