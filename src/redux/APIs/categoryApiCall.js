import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import toastOptions from "../../utils/toastOptions";

// Fetch All Categories
export function fetchCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/categories`);
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}

// Add Category
export function addCategory(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/categories`, newCategory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.addCategory(data));
      toast.success("Category Created Successfully", toastOptions);
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}

// Delete Category
export function deleteCategory(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.deleteCategory(data.categoryId));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}
