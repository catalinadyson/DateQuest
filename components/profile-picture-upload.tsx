"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Upload } from "lucide-react"
import Image from "next/image"

interface ProfilePictureUploadProps {
  initialImage?: string
  onImageChange?: (image: string) => void
}

export default function ProfilePictureUpload({ initialImage, onImageChange }: ProfilePictureUploadProps) {
  const [image, setImage] = useState<string>(initialImage || "/placeholder.svg?height=200&width=200")

  const handleImageChange = () => {
    // In a real app, this would open a file picker
    // For the prototype, we'll just simulate changing the image
    const mockNewImage = "/placeholder.svg?height=200&width=200&text=New+Photo"
    setImage(mockNewImage)
    onImageChange?.(mockNewImage)
  }

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-2">
        <Image src={image || "/placeholder.svg"} alt="Profile" fill style={{ objectFit: "cover" }} />
      </div>
      <div className="absolute bottom-2 right-1/2 translate-x-12 translate-y-0">
        <Button
          type="button"
          size="icon"
          className="h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleImageChange}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2 border-blue-500 text-blue-600 hover:bg-blue-50"
        onClick={handleImageChange}
      >
        <Upload className="h-4 w-4 mr-2" />
        Change Photo
      </Button>
    </div>
  )
}
