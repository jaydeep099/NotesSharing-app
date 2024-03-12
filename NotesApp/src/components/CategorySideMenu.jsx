import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadAllCategories } from "../Services/category";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CategorySideMenu = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadAllCategories()
      .then((data) => {
        setCategories([...data]);
      })
      .catch((error) => {
        console.log(error);
        toast.error("error in loading categories");
      });
  }, []);
  return (
    <div>
      <ListGroup>
        <ListGroupItem tag={Link} to="/"action={true} className="border-0">
          Categories
        </ListGroupItem>
        {categories &&
          categories.map((cat, index) => {
            return (
              <ListGroupItem
                action={true}
                className="border-0 shadow-0 mt-1"
                key={index}
                tag={Link} to={'/categories/'+cat.categoryId}
              >
                {cat.categoryTitle}
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </div>
  );
};

export default CategorySideMenu;
