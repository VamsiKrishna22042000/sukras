import "./index.css";

import { useState, useEffect } from "react";

const Services = () => {
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    getallCategories();
  }, []);

  const getallCategories = async () => {
    const url = `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllSalon`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      setAvailableCategories(data.salons[0].categories);
      console.log(data.salons[0].categories);
    }
  };

  return (
    <div className="dashboard-component">
      <button className="add-service" type="button">
        + Add new Services
      </button>
    </div>
  );
};

export default Services;
