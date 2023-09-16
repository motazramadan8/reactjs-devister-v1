import React, { useEffect } from "react";
import AdminSidebr from "./AdminSidebar";
import "./admin-table.css";
import Footer from "../../components/footer/Footer";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from "../../redux/APIs/categoryApiCall";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  // Fetch Categories
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // Delete Category Handler
  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
      closeOnEsc: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCategory(categoryId))
        swal("Category Has Been Deleted Successfully", {
          icon: "success",
        });
      }
    });
  };
  return (
    <>
      <section className="table-container">
        <AdminSidebr />
        <div className="table-wrapper">
          <h1 className="table-title">Categories</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Count</th>
                <th>Category Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <b>{category.title}</b>
                  </td>
                  <td>
                    <div className="table-button-group">
                      <button
                        className="delete-btn"
                        onClick={() => deleteCategoryHandler(category?._id)}
                      >
                        Delete Category
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CategoriesTable;
