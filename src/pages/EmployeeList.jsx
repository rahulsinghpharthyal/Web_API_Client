import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteEmployeeAction, getEmployeeAction } from "../redux/actions/employeeAction";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employee);

  const navigate = useNavigate();

  console.log(employee);
  useEffect(() => {
    dispatch(getEmployeeAction());
  }, [dispatch]);

  useEffect(() => {
    if (employee && employee.length) {
      setEmployees(employee);
    }
  }, [employee]);

  const handleSearchChange = (e) => {
    console.log(e.target.value)
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (employeeId) => {
    try{
      const {payload} = await dispatch(deleteEmployeeAction(employeeId));
      if(payload?.success){
        toast.success(payload.message);
        dispatch(getEmployeeAction());
      }
      console.log(payload)

    }catch(error){
      toast.error(error.response.data.message || error.message)
    }
  }

  const handleEdit = (employee) => {
    navigate(`update-employee/${employee._id}`, {
      state: {employeeData: employee}
  })
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // employee.mobileNumber.includes(searchTerm) ||
      employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-2 m-10 bg-gray-300 shadow-md rounded-lg mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employee List</h2>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button
            className="ml-4 bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => navigate("/create-employee")}
          >
            Create Employee
          </button>
        </div>
      </div>
      <table className="min-w-96 bg-gray-300 border border-gray-200 ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-indigo-600">
              Unique Id
            </th>
            <th className="py-2 px-4 border-b transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-indigo-600">
              Profile Picture
            </th>
            <th className="py-2 px-4 border-b transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-indigo-600">
              Name
            </th>
            <th className="py-2 px-4 border-b transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-indigo-600">
              Email
            </th>
            <th className="py-2 px-4 border-b transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-indigo-600">
              Mobile No
            </th>
            <th className="py-2 px-4 border-b transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-indigo-600">
              Designation
            </th>
            <th className="py-2 px-4 border-b transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-indigo-600">
              Gender
            </th>
            <th className="py-2 px-4 border-b transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-indigo-600">
              Course
            </th>
            <th className="py-2 px-4 border-b transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-indigo-600">
              Create Date
            </th>
            <th className="py-2 px-4 border-b transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-indigo-600">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td className="py-2 px-4 border-b">{employee._id.slice(-4)}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={employee.imageURI}
                  className="rounded-full w-10 h-10 object-cover"
                ></img>
              </td>
              <td className="py-2 px-4 border-b">{employee.employeeName}</td>
              <td className="py-2 px-4 border-b">{employee.email}</td>
              <td className="py-2 px-4 border-b">{employee.mobileNumber}</td>
              <td className="py-2 px-4 border-b">{employee.designation}</td>
              <td className="py-2 px-4 border-b">{employee.gender}</td>
              <td className="py-2 px-4 border-b">{employee.course}</td>
              <td className="py-2 px-4 border-b">{employee.createdAt}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-600 hover:text-blue-900" onClick={()=>handleEdit(employee)}>
                  Edit
                </button>
                <button className="ml-2 text-red-600 hover:text-red-900" onClick={()=>handleDelete(employee._id)
                }>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
