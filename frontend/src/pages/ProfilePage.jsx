import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react'

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    }
  }

  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
        <div className='bg-base-300 p-6 rounded-xl space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>

          {/* Avatar upload */}
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className='size-32 rounded-full object-cover border-4'
              />
              <label
                htmlFor='avatar-upload'
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id='avatar-upload'
                  className='hidden'
                  accept='image/*'
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className='text-sm text-zinc-400'>
              {isUpdatingProfile ? "Uploading..." : "Click the camera to update your photo"}
            </p>
          </div>

          <div className='space-y-6'>
            <div className='space-y-1.5'>
              <div className='text-zinc-400 flex items-center gap-2'>
                <User className='size-4' /> Full Name
              </div>
              <p className='flex items-center h-8 text-lg text-zinc-400 border rounded-md p-0.5 pl-6 overflow-hidden bg-base-200'>{authUser.fullName}</p>
            </div>

            <div className='space-y-1.5'>
              <div className='text-zinc-400 flex items-center gap-2'>
                <Mail className='size-4' /> Email Address
              </div>
              <p className='flex items-center h-8 text-lg text-zinc-400 border rounded-md p-0.5 pl-6 overflow-hidden bg-base-200'>{authUser?.email}</p>
            </div>
          </div>

          <div className='mt-6 bg-base-300 mx-6'>
            <div className='space-y-1'>
              <p className='text-2xl font-semibold text-zinc-400 overflow-hidden'>Account Information</p>
              <div className='text-md text-zinc-400 flex justify-between border-0 shadow-sm shadow-zinc-700 px-1 rounded-md'>
                <span className='overflow-hidden'>Member Since</span>
                <span className='overflow-hidden'>{authUser.createdAt?.split("T")[0]}</span>
              </div>
            </div>
          </div>

          <div className='mt-1.5 bg-base-300 mx-6 mb-6'>
            <div className='text-md flex justify-between border-0 shadow-sm shadow-zinc-700 px-1 rounded-md'>
              <span className='text-zinc-400 overflow-hidden'>Account Status</span>
              <span className='text-green-500 overflow-hidden'>Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
