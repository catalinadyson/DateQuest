"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Upload, X } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ProfilePictureUploadProps {
  initialImage?: string
  onImageChange?: (image: string) => void
}

export default function ProfilePictureUpload({ initialImage, onImageChange }: ProfilePictureUploadProps) {
  const [image, setImage] = useState<string>(initialImage || "/placeholder.svg?height=200&width=200")
  const [showCameraRoll, setShowCameraRoll] = useState(false)

  // Sample images for camera roll
  const sampleImages = [
    "/images/profile-user.jpg",
    "/placeholder.svg?height=200&width=200&text=Photo+1",
    "/placeholder.svg?height=200&width=200&text=Photo+2",
    "/placeholder.svg?height=200&width=200&text=Photo+3",
    "/placeholder.svg?height=200&width=200&text=Photo+4",
    "/placeholder.svg?height=200&width=200&text=Photo+5",
  ]

  const handleImageChange = (newImage: string) => {
    setImage(newImage)
    onImageChange?.(newImage)
    setShowCameraRoll(false)
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
          onClick={() => setShowCameraRoll(true)}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2 border-blue-500 text-blue-600 hover:bg-blue-50"
        onClick={() => setShowCameraRoll(true)}
      >
        <Upload className="h-4 w-4 mr-2" />
        Change Photo
      </Button>

      {/* Camera Roll Modal */}
      {showCameraRoll && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-xl max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Choose a Photo</h3>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8"
                onClick={() => setShowCameraRoll(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {sampleImages.map((img, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer border-2 hover:border-blue-500 transition-colors"
                  onClick={() => handleImageChange(img)}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`Sample ${index + 1}`}
                    width={120}
                    height={120}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
