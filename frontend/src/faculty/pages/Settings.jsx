import { useState } from "react";

export default function FacultySettings() {
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/150");
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Dr. Arjun Verma",
    gender: "Male",
    age: 42,
    dob: "12 June 1982",
  });

  const [contactInfo, setContactInfo] = useState({
    email: "arjun.verma@college.edu",
    phone: "+91 98765 43210",
    address: "House No. 12, Lakeview Road, Bengaluru, India",
  });

  const [academicInfo, setAcademicInfo] = useState({
    department: "Computer Science Engineering",
    qualification: "PhD in Machine Learning",
    experience: "15 Years",
    specialization: "Artificial Intelligence, Deep Learning",
  });

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePic(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 p-6">

      {/* PAGE TITLE */}
      <h2 className="text-3xl font-bold text-blue-700">Faculty Profile</h2>

      {/* TOP PROFILE CARD */}
      <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6">
        {/* Profile Picture */}
        <div className="relative w-28 h-28 rounded-full bg-gray-300 overflow-hidden">
          <img
            src={profilePic}
            alt="Faculty"
            className="w-full h-full object-cover"
          />
          {/* Upload button overlay */}
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
            ✎
          </label>
        </div>

        {/* Basic Info */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{personalInfo.fullName}</h3>
          <p className="text-gray-600 mt-1">{academicInfo.department} – Associate Professor</p>
          <p className="text-gray-500 mt-1">
            Faculty ID: <span className="font-semibold">FAC10234</span>
          </p>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={personalInfo.fullName}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, fullName: e.target.value })
            }
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Gender"
            value={personalInfo.gender}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, gender: e.target.value })
            }
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="number"
            placeholder="Age"
            value={personalInfo.age}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, age: e.target.value })
            }
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Date of Birth"
            value={personalInfo.dob}
            onChange={(e) =>
              setPersonalInfo({ ...personalInfo, dob: e.target.value })
            }
            className="p-3 border rounded-lg w-full"
          />
        </div>

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
          Save Personal Details
        </button>
      </div>

      {/* CONTACT INFORMATION */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>

        <input
          type="email"
          placeholder="Email Address"
          value={contactInfo.email}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, email: e.target.value })
          }
          className="p-3 border rounded-lg w-full"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={contactInfo.phone}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, phone: e.target.value })
          }
          className="p-3 border rounded-lg w-full"
        />

        <textarea
          placeholder="Address"
          value={contactInfo.address}
          onChange={(e) =>
            setContactInfo({ ...contactInfo, address: e.target.value })
          }
          className="p-3 border rounded-lg w-full"
          rows="3"
        ></textarea>

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
          Update Contact Info
        </button>
      </div>

      {/* ACADEMIC INFORMATION */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Academic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Department"
            value={academicInfo.department}
            onChange={(e) =>
              setAcademicInfo({ ...academicInfo, department: e.target.value })
            }
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Qualification"
            value={academicInfo.qualification}
            onChange={(e) =>
              setAcademicInfo({ ...academicInfo, qualification: e.target.value })
            }
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Experience"
            value={academicInfo.experience}
            onChange={(e) =>
              setAcademicInfo({ ...academicInfo, experience: e.target.value })
            }
            className="p-3 border rounded-lg w-full"
          />
          <input
            type="text"
            placeholder="Specialization"
            value={academicInfo.specialization}
            onChange={(e) =>
              setAcademicInfo({ ...academicInfo, specialization: e.target.value })
            }
            className="p-3 border rounded-lg w-full"
          />
        </div>

        <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
          Save Academic Info
        </button>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="bg-white p-6 rounded-2xl shadow-lg space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Update Password</h3>

        <input
          type="password"
          placeholder="Current Password"
          className="p-3 border rounded-lg w-full"
        />
        <input
          type="password"
          placeholder="New Password"
          className="p-3 border rounded-lg w-full"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="p-3 border rounded-lg w-full"
        />

        <button className="w-full bg-red-600 text-white p-3 rounded-lg">
          Change Password
        </button>
      </div>
    </div>
  );
}