import { useState, useEffect, useRef } from "react";
import useUser from "@hooks/useUser";
import { useUpdateProfileMutation } from "@redux-store/apis/authApi";
import { FaUserCircle } from "@node_modules/react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { useFileUploadMutation } from "@redux-store/apis/uploadFileApi";
import Image from "@node_modules/next/image";

export default function EditProfile() {
  const { userData, refetch } = useUser();
  const fileInputRef = useRef(null);
  const [updateProfile, { isLoading: isProfileUpdating }] =
    useUpdateProfileMutation();
  const [uploadFile] = useFileUploadMutation();

  const [profileData, setProfileData] = useState({
    name: userData?.user?.name || "",
    mobileNumber: userData?.user?.mobileNumber || "",
    dob: userData?.user?.dob || "",
    gender: userData?.user?.gender || "",
    profilePic: userData?.user?.profilePic || "",
  });

  useEffect(() => {
    setProfileData({
      name: userData?.user?.name || "",
      mobileNumber: userData?.user?.mobileNumber ?? "",
      gender: userData?.user?.gender || "",
      dob: userData?.user?.dob || "",
      profilePic: userData?.user?.profilePic || "",
    });
  }, [userData]);

  const handleChangeProfileData = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenderChange = (e) => {
    setProfileData({
      ...profileData,
      gender: e.target.value,
    });
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await uploadFile(formData);
        console.log("File uploaded successfully", response.data);
        if (response?.data?.url) {
          setProfileData((prevData) => ({
            ...prevData,
            profilePic: response.data.url,
          }));
          refetch();
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("File upload failed");
      }
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile({
        ...profileData,
        id: userData?.user?.id,
        mobileNumber: Number(profileData.mobileNumber),
      }).unwrap();
      if (response?.user) {
        console.log("Profile updated successfully", response);
        document.getElementById("edit-profile").close();
        refetch();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Profile update failed");
    }
  };

  console.log("profileData", profileData);

  return (
    <dialog id="edit-profile" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </div>
        </form>
        <form onSubmit={updateProfileHandler} className="space-y-3 mt-4">
          <div className="relative w-32 mx-auto">
            <FiEdit2
              size={20}
              className="absolute right-2 top-0 cursor-pointer"
              onClick={openFilePicker}
            />
            {profileData.profilePic ? (
              <Image
                src={profileData?.profilePic}
                alt={userData?.user?.name}
                width={100}
                height={100}
                className="rounded-full object-cover w-32 h-32"
              />
            ) : (
              <FaUserCircle size={100} className="w-32 h-32" />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </div>
          <label className="input input-bordered flex items-center gap-2">
            Name
            <input
              type="text"
              className="grow"
              placeholder="Name"
              name="name"
              value={profileData.name}
              onChange={handleChangeProfileData}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Mobile Number
            <input
              type="number"
              className="grow"
              name="mobileNumber"
              value={profileData.mobileNumber}
              placeholder="Mobile Number"
              onChange={handleChangeProfileData}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Date of Birth
            <input
              type="text"
              className="grow"
              name="dob"
              placeholder="DD/MM/YY"
              value={profileData.dob}
              onChange={handleChangeProfileData}
            />
          </label>
          <div className="flex items-center gap-2 ml-1">
            <label className="pb-[3px]">Gender: </label>
            <div className="form-control">
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">Male</span>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  className="radio checked:bg-blue-500"
                  checked={profileData.gender === "Male"}
                  onChange={handleGenderChange}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer space-x-2">
                <span className="label-text">Female</span>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="radio checked:bg-blue-500"
                  checked={profileData.gender === "Female"}
                  onChange={handleGenderChange}
                />
              </label>
            </div>
          </div>
          <div>
            {isProfileUpdating ? (
              <button className="btn btn-info w-full">
                <span className="loading loading-dots loading-lg"></span>
              </button>
            ) : (
              <button type="submit" className="btn btn-info w-full">
                Save
              </button>
            )}
          </div>
        </form>
      </div>
    </dialog>
  );
}
