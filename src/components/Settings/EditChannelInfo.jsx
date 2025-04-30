import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAccount } from "../../store/Slices/authSlice";

function EditChannelInfo({ userData }) {
  const defaultValues = {
    username: userData?.username || "",
    description: userData?.description || "",
  };
  const dispatch = useDispatch();
  const [data, setData] = useState(defaultValues);

  const handleSaveChange = (event) => {
    event.preventDefault();

    let formData = {};
    if (defaultValues.username !== data.username)
      formData.username = data?.username;
    if (defaultValues.description !== data.description)
      formData.description = data?.description;

    dispatch(updateAccount(formData)).then((res) => {
      if (res.type !== "auth/updateUser/rejected") {
        setData(res.payload);
      }
    });
  };

  const handleCancel = () => setData(defaultValues);

  return (
    <div className="flex flex-wrap justify-center gap-y-4 mt-4">
      <div className="w-full sm:w-1/2 lg:w-1/3">
        <h5 className="font-semibold">Channel Info</h5>
        <p className="dark:text-gray-300 text-zinc-400 ">
          Update your Channel details here.
        </p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-2/3">
        <form onSubmit={handleSaveChange} className="rounded-lg border">
          <div className="flex flex-wrap gap-y-4 p-4">
            {/* Username */}
            <div className="w-full">
              <label className="mb-1 inline-block" htmlFor="username">
                Username
              </label>
              <div className="flex rounded-lg border">
                <p className="flex shrink-0 items-center border-r border-white px-3 align-middle">
                  Tube-Engine/.com
                </p>
                <input
                  type="text"
                  className="w-full bg-transparent px-2 py-1.5"
                  id="username"
                  name="username"
                  placeholder="@username"
                  onChange={(e) =>
                    setData((pre) => ({ ...pre, username: e.target.value }))
                  }
                  value={data?.username}
                />
              </div>
            </div>

            {/* Description */}
            <div className="w-full">
              <label className="mb-1 inline-block" htmlFor="desc">
                Description
              </label>
              <textarea
                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                rows="4"
                id="desc"
                name="description"
                value={data?.description}
                onChange={(e) =>
                  setData((pre) => ({ ...pre, description: e.target.value }))
                }
                placeholder="Channel Description"
              ></textarea>
              <p className="mt-0.5 text-sm dark:text-gray-300 text-zinc-500">
                275 characters left
              </p>
            </div>
          </div>

          <hr className="border border-gray-300" />

          <div className="flex items-center justify-end gap-4 p-4">
            <button
              type="button"
              disabled={data === defaultValues}
              onClick={handleCancel}
              className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={data === defaultValues}
              className="inline-block dark:bg-[#ae7aff] bg-green-600 text-white dark:text-black  px-3 py-1.5 rounded disabled:cursor-not-allowed"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditChannelInfo;
