import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployeeAction, updateEmployeeAction } from "../redux/actions/employeeAction";
import { axiosPrivate } from "../customAxios/customAxios";
import { ImageLoader } from "../components/common/Loader";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const {isError} = useSelector((state)=>state.employee);
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: "",
    email: "",
    mobileNumber: "",
    designation: "HR",
    gender: "",
    course: "",
    imageURI: null,
  });

  console.log('this is the location', location);

  useEffect(()=>{
    if(location?.state?.employeeData){
      const employee = location?.state?.employeeData;
      console.log(employee)
      setFormData({
        employeeName: employee.employeeName || "",
        email: employee.email || "",
        mobileNumber: employee.mobileNumber || "",
        designation: employee.designation || "HR",
        gender: employee.gender || "",
        course: employee.course || "",
        imageURI: employee.imageURI || null,
      })
    }
  }, [location]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => {
        return { ...prevState, [name]: checked ? value : "" };
      });
    } else if (type === "file") {
      console.log(e.target.files);
      setImageFile([e.target.files[0]]);
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const uploadToCloudinary = async (e) => {
    e.preventDefault();
    setUploadImage(true);
    const data = new FormData();
    //   for (let [key, value] of data.entries()) {
    //     console.log(`${key}:`, value);
    // }
    data.append("file", imageFile[0]);
    try {
      const response = await axiosPrivate.post(
        "/employee/upload-picture",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if(response.data.success){
        const { secure_url } = response.data.Data;
        setFormData((prevState) => ({ ...prevState, imageURI: secure_url }));
        setUploadImage(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Error uploading file: ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(location?.state?.employeeData){
      // const updateEmployeeData = {...formData}
      try{
        const {payload} = await dispatch(updateEmployeeAction({id: location.state.employeeData._id, formData}));
        console.log(payload);
        if(payload.success){
          toast.success(payload.message);
          navigate('/dashboard/employee-list')
        }else{
          toast.error(payload.message);
        }
      }catch(error){
        console.log(error)
      }
      
    }else{

      // Add your form submission logic here
      try {
        const { payload } = await dispatch(createEmployeeAction(formData));
        if(payload.success){
        toast.success(payload.message);
        setFormData({
          employeeName: "",
          email: "",
          mobileNumber: "",
          designation: "HR",
          gender: "",
          course: "",
          imageURI: null,
        })
        navigate('/dashboard/employee-list')

      }else{
        toast.error(isError);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-300 rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Name
          </label>
          <input
            type="text"
            id="employeeName"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Mobile No
          </label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="designation"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Designation
          </label>
          <select
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <fieldset className="space-y-1">
          <legend className="text-sm font-medium text-gray-700 text-left">
            Gender
          </legend>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center">
              <input
                id="gender-m"
                name="gender"
                type="radio"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="gender-m"
                className="ml-3 block text-sm font-medium text-gray-700 text-left"
              >
                Male
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="gender-f"
                name="gender"
                type="radio"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="gender-f"
                className="ml-3 block text-sm font-medium text-gray-700 text-left"
              >
                Female
              </label>
            </div>
          </div>
        </fieldset>
        <fieldset className="space-y-1">
          <legend className="text-sm font-medium text-gray-700 text-left">
            Course
          </legend>
          <div className="flex items-center space-x-4 mt-2">
            <div className="flex items-center">
              <input
                id="course-mca"
                name="course"
                type="checkbox"
                value="MCA"
                checked={formData.course.includes("MCA")}
                onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="course-mca"
                className="ml-3 block text-sm font-medium text-gray-700 text-left"
              >
                MCA
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="course-bca"
                name="course"
                type="checkbox"
                value="BCA"
                checked={formData.course.includes("BCA")}
                onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="course-bca"
                className="ml-3 block text-sm font-medium text-gray-700 text-left"
              >
                BCA
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="course-bsc"
                name="course"
                type="checkbox"
                value="BSC"
                checked={formData.course.includes("BSC")}
                onChange={handleChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="course-bsc"
                className="ml-3 block text-sm font-medium text-gray-700 text-left"
              >
                BSC
              </label>
            </div>
          </div>
        </fieldset>
        <div className="space-y-1">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Image Upload
          </label>
          <input
            type="file"
            id="imageURI"
            name="imageURI"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
        </div>
        {uploadImage ? (
          <ImageLoader />
        ) : (
          <button onClick={uploadToCloudinary}>Add Picture</button>
        )}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployee;
