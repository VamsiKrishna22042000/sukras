import { useCallback, useEffect, useState } from "react";
import "./index.css";

const CategoryEdit = () => {
  const [serviceEdit, setServiceEdit] = useState(false);
  const [productEdit, setProductEdit] = useState(false);

  const ModalServiceEdit = () => {
    const [categories, setCategories] = useState("");
    const [newValues, setNewValuse] = useState({
      name: "",
      image: "",
      categoryId: "",
      salonId: "64c1e5b880e7fc21fb096a71",
    });

    useEffect(() => {
      getTheCategories();
    }, []);

    const getTheCategories = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_ROOT_URL}/api/admin/getAllSalon`
      );
      const data = await response.json();

      if (response.ok === true) {
        setCategories(data.salons[0].categories);
        /*console.log(data.salons[0].categories)*/

        /*console.log(service)*/
      }
    };

    const editService = (e) => {
      if (e.target.id === "newCategoryname") {
        setNewValuse((prevData) => ({ ...prevData, name: e.target.value }));
      } else if (e.target.id === "newCategoryimage") {
        setNewValuse((prevData) => ({ ...prevData, name: e.target.files[0] }));
      } else {
        const filerId = categories.filter(
          (each) => each.category === e.target.value && each._id
        );
        setNewValuse((prevData) => ({
          ...prevData,
          categoryId: filerId[0].id,
        }));
      }
    };

    console.log(newValues);

    return (
      <>
        <div className="modal-boxcon"></div>
        {categories !== "" && (
          <form className="modal-box3">
            <>
              <div className="category-edit-content">
                <h2>Edit/Delete Service Category</h2>
                <h4 style={{ marginTop: 5, marginBottom: 5 }}>
                  Select Category You Want to Edit/Delete
                </h4>
                <select
                  onChange={editService}
                  style={{ textTransform: "capitalize" }}
                >
                  {categories.map((each) => (
                    <option
                      id={each._id}
                      style={{ textTransform: "capitalize" }}
                    >
                      {each.category}
                    </option>
                  ))}
                </select>
                <h4 style={{ marginTop: 5, marginBottom: 5 }}>Type New Name</h4>
                <input
                  id="newCategoryname"
                  onChange={editService}
                  type="text"
                />
                <h4 style={{ marginTop: 5, marginBottom: 5 }}>Add New Image</h4>
                <input
                  id="newCategoryimage"
                  onChange={editService}
                  style={{ marginBottom: 5 }}
                  type="file"
                />
              </div>
              <div className="category-edit-buttons-con">
                <button className="category-edit-button1" type="button">
                  Edit
                </button>
                <button className="category-edit-button1" type="button">
                  Delete
                </button>
                <button
                  onClick={() => {
                    setServiceEdit(!serviceEdit);
                  }}
                  className="category-edi-button2"
                >
                  ✕
                </button>
              </div>
            </>
          </form>
        )}
      </>
    );
  };

  const ModalProductEdit = () => {
    return (
      <>
        <div className="modal-boxcon"></div>
        <form className="modal-box3">
          <div className="category-edit-buttons-con">
            <button className="category-edit-button1" type="button">
              Edit
            </button>
            <button className="category-edit-button1" type="button">
              Delete
            </button>
            <button
              onClick={() => {
                setProductEdit(!productEdit);
              }}
              className="category-edi-button2"
            >
              ✕
            </button>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      <div className="catergory-edit">
        <div className="category-edit-product">
          <img
            src="/CategoryEdit.png"
            className="category-edit-img"
            alt="category-edit"
          />
          <p>Edit/Delete Service Category</p>
          <button
            onClick={() => {
              setServiceEdit(!serviceEdit);
            }}
            className="category-edit-button"
            type="button"
          >
            Select
          </button>
        </div>
        <div className="category-edit-product">
          <img
            src="/CategoryEdit.png"
            className="category-edit-img"
            alt="category-edit"
          />
          <p>Edit/Delete Product Category</p>
          <button
            onClick={() => {
              setProductEdit(!productEdit);
            }}
            className="category-edit-button"
            type="button"
          >
            Select
          </button>
        </div>
      </div>
      {serviceEdit && <ModalServiceEdit />}
      {productEdit && <ModalProductEdit />}
    </>
  );
};

export default CategoryEdit;
