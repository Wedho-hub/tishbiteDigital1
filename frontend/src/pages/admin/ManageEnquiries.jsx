import React, { useEffect, useState } from "react";
import { getEnquiries, deleteEnquiry } from "../../services/enquiryService";
import "./admin.css";

const ManageEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState("");

  const fetchEnquiries = async () => {
    setEnquiries(await getEnquiries());
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const data = await getEnquiries();
      if (isMounted) setEnquiries(data);
    };
    fetchData();
    return () => { isMounted = false; };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEnquiry(id);
      fetchEnquiries();
    } catch {
      setError("Error deleting enquiry");
    }
  };

  return (
    <div className="admin-page-card">
      <h2>Manage Enquiries</h2>
      {error && <div className="error">{error}</div>}
      <ul className="admin-list">
        {enquiries.map(enquiry => (
          <li key={enquiry._id}>
            <span>
              <b>{enquiry.name}</b> ({enquiry.email}): {enquiry.message}
            </span>
            <div className="admin-list-actions">
              <button className="delete-btn" onClick={() => handleDelete(enquiry._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEnquiries;
